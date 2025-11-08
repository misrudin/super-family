import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<null>>
) {
    if (req.method !== "DELETE") {
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

        // Cek apakah keluarga ada
        const { data: existingFamily, error: checkError } = await supabase
            .from("families")
            .select("id, name")
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

        const { error: deleteError } = await supabase
            .from("families")
            .delete()
            .eq("id", id);

        if (deleteError) {
            throw deleteError;
        }

        const user = getAuthenticatedUser(req);
        if (user) {
            createLogSilent({
                details: {
                    action: "delete_family",
                    family_name: existingFamily.name,
                    family_id: existingFamily.id,
                },
                user_id: user.id,
                family_id: existingFamily.id,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Keluarga berhasil dihapus",
        });
    } catch (error: unknown) {
        console.error("Delete family error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

