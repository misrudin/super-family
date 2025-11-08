import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IUser } from "@/interfaces/IUser";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IUser>>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", authenticatedUser.id)
            .single();

        if (userError || !user) {
            console.error("Logout error:", userError);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data profil",
                error: userError.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data profil berhasil diambil",
            data: user,
        });
    } catch (error: unknown) {
        console.error("Error fetching profile:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
