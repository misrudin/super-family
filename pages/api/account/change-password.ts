import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

const changePasswordSchema = z.object({
    current_password: z.string().min(1, "Password lama harus diisi"),
    new_password: z.string().min(6, "Password baru minimal 6 karakter"),
    confirm_password: z.string().min(1, "Konfirmasi password harus diisi"),
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Password baru dan konfirmasi password tidak sama",
    path: ["confirm_password"],
});

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

        const validationResult = changePasswordSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { current_password, new_password } = validationResult.data;

        // Get current user with password
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("id, password")
            .eq("id", authenticatedUser.id)
            .single();

        if (userError || !user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(current_password, user.password as string);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Password lama tidak benar",
            });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);

        // Update password
        const { error: updateError } = await supabase
            .from("users")
            .update({
                password: hashedPassword,
                updated_at: new Date().toISOString(),
            })
            .eq("id", authenticatedUser.id);

        if (updateError) {
            throw updateError;
        }

        return res.status(200).json({
            success: true,
            message: "Password berhasil diubah",
        });
    } catch (error: unknown) {
        console.error("Change password error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

