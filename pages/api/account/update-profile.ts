import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IUser } from "@/interfaces/IUser";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

const updateProfileSchema = z.object({
    name: z.string().min(1, "Nama harus diisi").max(100, "Nama maksimal 100 karakter").optional(),
    phone: z.string().max(20, "Nomor telepon maksimal 20 karakter").optional().nullable(),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IUser>>
) {
    if (req.method !== "PUT" && req.method !== "PATCH") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);

        const validationResult = updateProfileSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const updateData = validationResult.data;

        // Update user
        const { data: updatedUser, error: updateError } = await supabase
            .from("users")
            .update({
                ...updateData,
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
            throw updateError || new Error("Gagal mengupdate profil");
        }

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
            message: "Profil berhasil diupdate",
            data: safeUser,
        });
    } catch (error: unknown) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

