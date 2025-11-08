import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ILoginResponse } from "@/interfaces/IUser";
import { generateTokens } from "@/utils/jwt";
import { supabase } from "@/utils/supabase";
import { loginSchema } from "@/validations/users";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ILoginResponse>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const validationResult = loginSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { email, password } = validationResult.data;

        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (userError || !user) {
            return res.status(400).json({
                success: false,
                message: "Email atau password salah",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Email atau password salah",
            });
        }

        const safeUser = {
            id: user.id as string,
            name: user.name as string,
            email: user.email as string,
            phone: user.phone as string | undefined,
            role: user.role as 'admin' | 'member',
            created_at: user.created_at as string,
            updated_at: user.updated_at as string | undefined,
        };

        // Generate JWT tokens
        const tokens = generateTokens({
            id: safeUser.id,
            email: safeUser.email,
            role: safeUser.role,
        });

        await supabase.from("users").update({
            is_login: true,
        }).eq("id", safeUser.id);

        return res.status(200).json({
            success: true,
            message: "Login berhasil",
            data: {
                user: safeUser,
                ...tokens,
            },
        });
    } catch (error: unknown) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
