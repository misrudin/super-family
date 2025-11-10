import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ICategory } from "@/interfaces/ICategory";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { updateCategorySchema } from "@/validations/categories";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ICategory>>
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
                message: "ID kategori harus diisi",
            });
        }

        const validationResult = updateCategorySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const updateData = validationResult.data;

        // Cek apakah kategori ada
        const { data: existingCategory, error: checkError } = await supabase
            .from("categories")
            .select("id")
            .eq("id", id)
            .single();

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        const { data: updatedCategory, error: updateError } = await supabase
            .from("categories")
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
        createLogSilent({
            details: {
                action: "update_category",
                category_name: updatedCategory.name,
                category_id: updatedCategory.id,
            },
            user_id: user.id,
            family_id: user.familyId,
        });

        return res.status(200).json({
            success: true,
            message: "Kategori berhasil diupdate",
            data: {
                id: updatedCategory.id as string,
                name: updatedCategory.name as string,
                type: updatedCategory.type as "income" | "expense",
                slug: updatedCategory.slug as string,
                created_at: updatedCategory.created_at as string,
                updated_at: updatedCategory.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Update category error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

