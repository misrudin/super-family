import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IFamily } from "@/interfaces/IFamily";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { familySchema } from "@/validations/families";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IFamily>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const validationResult = familySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { name, slug } = validationResult.data;

        // Cek apakah slug sudah ada
        const { data: existingFamily, error: checkError } = await supabase
            .from("families")
            .select("id")
            .eq("slug", slug)
            .single();

        if (existingFamily) {
            return res.status(409).json({
                success: false,
                message: "Slug sudah digunakan",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        const { data: newFamily, error: insertError } = await supabase
            .from("families")
            .insert([
                {
                    name,
                    slug,
                },
            ])
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        const user = getAuthenticatedUser(req);
        if (user) {
            createLogSilent({
                details: {
                    action: "create_family",
                    family_name: newFamily.name,
                    family_id: newFamily.id,
                },
                user_id: user.id,
                family_id: newFamily.id,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Keluarga berhasil dibuat",
            data: {
                id: newFamily.id as string,
                name: newFamily.name as string,
                slug: newFamily.slug as string,
                created_at: newFamily.created_at as string,
                updated_at: newFamily.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Create family error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

