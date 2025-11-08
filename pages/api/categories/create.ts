import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ICategory } from "@/interfaces/ICategory";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { createCategorySchema } from "@/validations/categories";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ICategory>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const validationResult = createCategorySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { name, type, slug } = validationResult.data;

        // Cek apakah slug sudah ada
        const { data: existingCategory, error: checkError } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", slug)
            .single();

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Slug sudah digunakan",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        const { data: newCategory, error: insertError } = await supabase
            .from("categories")
            .insert([
                {
                    name,
                    type,
                    slug,
                },
            ])
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }
        
        const user = getAuthenticatedUser(req);
        createLogSilent({
            details: {
                action: "create_category",
                category_name: newCategory.name,
                category_id: newCategory.id,
            },
            user_id: user.id,
            family_id: user.familyId,
        });

        return res.status(201).json({
            success: true,
            message: "Kategori berhasil dibuat",
            data: {
                id: newCategory.id as string,
                name: newCategory.name as string,
                type: newCategory.type as "income" | "expense",
                slug: newCategory.slug as string,
                created_at: newCategory.created_at as string,
                updated_at: newCategory.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Create category error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

