import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IFamilyDetail } from "@/interfaces/IFamily";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IFamilyDetail>>
) {
    if (req.method !== "GET") {
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

        const { data: family, error } = await supabase
            .from("families")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return res.status(404).json({
                    success: false,
                    message: "Keluarga tidak ditemukan",
                });
            }
            throw error;
        }

        if (!family) {
            return res.status(404).json({
                success: false,
                message: "Keluarga tidak ditemukan",
            });
        }

        // Ambil anggota keluarga
        const { data: members, error: membersError } = await supabase
            .from("users")
            .select("id, name, email, phone, role, created_at, updated_at")
            .eq("family_id", id)
            .order("created_at", { ascending: true });

        if (membersError) {
            console.error("Error fetching members:", membersError);
            // Tidak throw error, hanya log karena anggota bukan data critical
        }

        const formattedFamily: IFamilyDetail = {
            id: family.id as string,
            name: family.name as string,
            slug: family.slug as string,
            created_at: family.created_at as string,
            updated_at: family.updated_at as string | undefined,
            members: (members || []).map((member) => ({
                id: member.id as string,
                name: member.name as string,
                email: member.email as string,
                phone: member.phone as string | undefined,
                role: member.role as 'admin' | 'member',
                created_at: member.created_at as string | undefined,
                updated_at: member.updated_at as string | undefined,
            })),
        };

        return res.status(200).json({
            success: true,
            message: "Data keluarga berhasil diambil",
            data: formattedFamily,
        });
    } catch (error: unknown) {
        console.error("Get family detail error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

