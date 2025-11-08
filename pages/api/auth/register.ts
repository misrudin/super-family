import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ILoginResponse } from "@/interfaces/IUser";
import { generateTokens } from "@/utils/jwt";
import { supabase } from "@/utils/supabase";
import { registerSchema } from "@/validations/users";
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
        const validationResult = registerSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { name, email, phone, password } = validationResult.data;
        const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email sudah terdaftar",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    phone: phone || null,
                    password: hashedPassword,
                    role: "member",
                },
            ])
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }
        // Siapkan payload user aman (tanpa password)
        const safeUser = {
            id: newUser.id as string,
            name: newUser.name as string,
            email: newUser.email as string,
            phone: newUser.phone as string | undefined,
            role: newUser.role as 'admin' | 'member',
            created_at: newUser.created_at as string,
            updated_at: newUser.updated_at as string | undefined,
        };

        // Generate JWT tokens
        const tokens = generateTokens({
            id: safeUser.id,
            email: safeUser.email,
            role: safeUser.role,
        });

        return res.status(201).json({
            success: true,
            message: "Pendaftaran berhasil",
            data: {
                user: safeUser,
                ...tokens,
            },
        });
    } catch (error: unknown) {
        console.error("Register error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
