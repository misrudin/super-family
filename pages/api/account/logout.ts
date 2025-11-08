import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<null>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);
        const { error: updateError } = await supabase
            .from("users")
            .update({
                is_login: false,
            })
            .eq("id", authenticatedUser.id);

        if (updateError) {
            console.error("Logout error:", updateError);
            return res.status(500).json({
                success: false,
                message: "Gagal mengupdate status login",
                error: updateError.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Logout berhasil",
            data: null,
        });
    } catch (error: unknown) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
