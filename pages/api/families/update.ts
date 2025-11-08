import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IFamily } from "@/interfaces/IFamily";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { updateFamilySchema } from "@/validations/families";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IFamily>>
) {
    if (req.method !== "PUT" && req.method !== "PATCH") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "ID keluarga harus diisi",
            });
        }

        const validationResult = updateFamilySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const updateData = validationResult.data;

        // Cek apakah keluarga ada
        const { data: existingFamily, error: checkError } = await supabase
            .from("families")
            .select("id")
            .eq("id", id)
            .single();

        if (!existingFamily) {
            return res.status(404).json({
                success: false,
                message: "Keluarga tidak ditemukan",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        // Jika slug diupdate, cek apakah slug sudah digunakan oleh keluarga lain
        if (updateData.slug) {
            const { data: slugExists, error: slugCheckError } = await supabase
                .from("families")
                .select("id")
                .eq("slug", updateData.slug)
                .neq("id", id)
                .single();

            if (slugExists) {
                return res.status(409).json({
                    success: false,
                    message: "Slug sudah digunakan",
                });
            }

            if (slugCheckError && slugCheckError.code !== "PGRST116") {
                throw slugCheckError;
            }
        }

        const { data: updatedFamily, error: updateError } = await supabase
            .from("families")
            .update({
                ...updateData,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (updateError) {
            throw updateError;
        }

        const user = getAuthenticatedUser(req);
        if (user) {
            createLogSilent({
                details: {
                    action: "update_family",
                    family_name: updatedFamily.name,
                    family_id: updatedFamily.id,
                },
                user_id: user.id,
                family_id: updatedFamily.id,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Keluarga berhasil diupdate",
            data: {
                id: updatedFamily.id as string,
                name: updatedFamily.name as string,
                slug: updatedFamily.slug as string,
                created_at: updatedFamily.created_at as string,
                updated_at: updatedFamily.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Update family error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

