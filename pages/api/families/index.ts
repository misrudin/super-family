import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IFamily } from "@/interfaces/IFamily";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IFamily[]>>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const { data: families, error } = await supabase
            .from("families")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        const formattedFamilies: IFamily[] = (families || []).map((family) => ({
            id: family.id as string,
            name: family.name as string,
            slug: family.slug as string,
            created_at: family.created_at as string,
            updated_at: family.updated_at as string | undefined,
        }));

        return res.status(200).json({
            success: true,
            message: "Data keluarga berhasil diambil",
            data: formattedFamilies,
        });
    } catch (error: unknown) {
        console.error("Get families error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

