import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ITransaction } from "@/interfaces/ITransaction";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ITransaction>>
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
                message: "ID transaksi harus diisi",
            });
        }

        const { data: transaction, error } = await supabase
            .from("transactions")
            .select(`
                *,
                categories:category_id (
                    id,
                    name,
                    slug,
                    type,
                    created_at,
                    updated_at
                ),
                users:user_id (
                    id,
                    name,
                    email,
                    phone,
                    role,
                    created_at,
                    updated_at
                ),
                families:family_id (
                    id,
                    name,
                    slug,
                    created_at,
                    updated_at
                )
            `)
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return res.status(404).json({
                    success: false,
                    message: "Transaksi tidak ditemukan",
                });
            }
            throw error;
        }

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data transaksi berhasil diambil",
            data: {
                id: transaction.id as string,
                amount: transaction.amount as number,
                category: {
                    id: transaction.categories?.id || transaction.category_id,
                    name: transaction.categories?.name || "",
                    slug: transaction.categories?.slug || "",
                    type: transaction.categories?.type || "expense",
                    created_at: transaction.categories?.created_at || "",
                    updated_at: transaction.categories?.updated_at,
                },
                user: {
                    id: transaction.users?.id || transaction.user_id,
                    name: transaction.users?.name || "",
                    email: transaction.users?.email || "",
                    phone: transaction.users?.phone,
                    role: transaction.users?.role || "member",
                    created_at: transaction.users?.created_at,
                    updated_at: transaction.users?.updated_at,
                },
                family: {
                    id: transaction.families?.id || transaction.family_id,
                    name: transaction.families?.name || "",
                    slug: transaction.families?.slug || "",
                    created_at: transaction.families?.created_at || "",
                    updated_at: transaction.families?.updated_at,
                },
                transaction_date: transaction.transaction_date as string,
                transaction_no: transaction.transaction_no as string,
                created_at: transaction.created_at as string,
                updated_at: transaction.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Get transaction detail error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

