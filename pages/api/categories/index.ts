import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ICategory } from "@/interfaces/ICategory";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ICategory[]>>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const { type } = req.query;

        let query = supabase
            .from("categories")
            .select("*")
            .order("created_at", { ascending: false });

        // Filter by type jika ada
        if (type && (type === "income" || type === "expense")) {
            query = query.eq("type", type);
        }

        const { data: categories, error } = await query;

        if (error) {
            throw error;
        }

        const formattedCategories: ICategory[] = (categories || []).map((category) => ({
            id: category.id as string,
            name: category.name as string,
            type: category.type as "income" | "expense",
            slug: category.slug as string,
            created_at: category.created_at as string,
            updated_at: category.updated_at as string | undefined,
        }));

        return res.status(200).json({
            success: true,
            message: "Data kategori berhasil diambil",
            data: formattedCategories,
        });
    } catch (error: unknown) {
        console.error("Get categories error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

