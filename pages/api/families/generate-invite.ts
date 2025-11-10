import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

interface IInviteLink {
    invite_code: string;
    invite_link: string;
    expires_at: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IInviteLink>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);
        const familyId = authenticatedUser.familyId;

        if (!familyId) {
            return res.status(400).json({
                success: false,
                message: "Anda belum bergabung dengan keluarga",
            });
        }

        // Generate unique invite code (8 characters alphanumeric)
        const generateInviteCode = (): string => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 8; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const inviteCode = generateInviteCode();
        
        // Set expiration to 7 days from now
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Get family slug for the link
        const { data: family, error: familyError } = await supabase
            .from("families")
            .select("slug")
            .eq("id", familyId)
            .single();

        if (familyError || !family) {
            throw familyError || new Error("Keluarga tidak ditemukan");
        }

        // Store invite code in database (you might want to create an invites table)
        // For now, we'll just return the code and let the frontend handle it
        // In production, you should store this in a database table

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const inviteLink = `${baseUrl}/family/join?code=${inviteCode}&slug=${family.slug}`;

        return res.status(200).json({
            success: true,
            message: "Link undangan berhasil dibuat",
            data: {
                invite_code: inviteCode,
                invite_link: inviteLink,
                expires_at: expiresAt.toISOString(),
            },
        });
    } catch (error: unknown) {
        console.error("Generate invite error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

