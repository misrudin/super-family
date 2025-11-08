import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IUser } from "@/interfaces/IUser";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";
import { z } from "zod";

const joinFamilySchema = z.object({
    family_id: z.string().uuid("Family ID harus berupa UUID valid"),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IUser>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);

        const validationResult = joinFamilySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { family_id } = validationResult.data;

        // Cek apakah family ada
        const { data: family, error: familyError } = await supabase
            .from("families")
            .select("id, name, slug, created_at, updated_at")
            .eq("id", family_id)
            .single();

        if (!family || familyError) {
            if (familyError?.code === "PGRST116") {
                return res.status(404).json({
                    success: false,
                    message: "Keluarga tidak ditemukan",
                });
            }
            throw familyError;
        }

        // Update user family_id
        const { data: updatedUser, error: updateError } = await supabase
            .from("users")
            .update({
                family_id: family_id,
                updated_at: new Date().toISOString(),
            })
            .eq("id", authenticatedUser.id)
            .select(`
                *,
                family:family_id (
                    id,
                    name,
                    slug,
                    created_at,
                    updated_at
                )
            `)
            .single();

        if (updateError || !updatedUser) {
            throw updateError || new Error("Gagal mengupdate user");
        }

        // Log action
        createLogSilent({
            details: {
                action: "join_family",
                family_name: family.name,
                family_id: family.id,
            },
            user_id: authenticatedUser.id,
            family_id: family_id,
        });

        const safeUser: IUser = {
            id: updatedUser.id as string,
            name: updatedUser.name as string,
            email: updatedUser.email as string,
            phone: updatedUser.phone as string | undefined,
            role: updatedUser.role as 'admin' | 'member',
            family: updatedUser.family ? {
                id: updatedUser.family.id as string,
                name: updatedUser.family.name as string,
                slug: updatedUser.family.slug as string,
                created_at: updatedUser.family.created_at as string,
                updated_at: updatedUser.family.updated_at as string | undefined,
            } : undefined,
            created_at: updatedUser.created_at as string | undefined,
            updated_at: updatedUser.updated_at as string | undefined,
        };

        return res.status(200).json({
            success: true,
            message: "Berhasil bergabung dengan keluarga",
            data: safeUser,
        });
    } catch (error: unknown) {
        console.error("Join family error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

