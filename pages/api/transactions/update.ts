import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ITransaction } from "@/interfaces/ITransaction";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { updateTransactionSchema } from "@/validations/transactions";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ITransaction>>
) {
    if (req.method !== "PUT" && req.method !== "PATCH") {
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

        const validationResult = updateTransactionSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const updateData = validationResult.data;

        // Cek apakah transaksi ada
        const { data: existingTransaction, error: checkError } = await supabase
            .from("transactions")
            .select("id")
            .eq("id", id)
            .single();

        if (!existingTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
        }

        // Validasi foreign keys jika diupdate
        if (updateData.category_id) {
            const { data: category, error: categoryError } = await supabase
                .from("categories")
                .select("id")
                .eq("id", updateData.category_id)
                .single();

            if (!category || categoryError) {
                return res.status(404).json({
                    success: false,
                    message: "Kategori tidak ditemukan",
                });
            }
        }

        if (updateData.user_id) {
            const { data: user, error: userError } = await supabase
                .from("users")
                .select("id")
                .eq("id", updateData.user_id)
                .single();

            if (!user || userError) {
                return res.status(404).json({
                    success: false,
                    message: "User tidak ditemukan",
                });
            }
        }

        if (updateData.family_id) {
            const { data: family, error: familyError } = await supabase
                .from("families")
                .select("id")
                .eq("id", updateData.family_id)
                .single();

            if (!family || familyError) {
                return res.status(404).json({
                    success: false,
                    message: "Keluarga tidak ditemukan",
                });
            }
        }

        const { data: updatedTransaction, error: updateError } = await supabase
            .from("transactions")
            .update({
                ...updateData,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
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
            .single();

        if (updateError) {
            throw updateError;
        }

        const user = getAuthenticatedUser(req);
        if (user) {
            createLogSilent({
                details: {
                    action: "update_transaction",
                    transaction_id: updatedTransaction.id,
                    transaction_no: updatedTransaction.transaction_no,
                    amount: updatedTransaction.amount,
                },
                user_id: user.id,
                family_id: updatedTransaction.family_id,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaksi berhasil diupdate",
            data: {
                id: updatedTransaction.id as string,
                amount: updatedTransaction.amount as number,
                category: {
                    id: updatedTransaction.categories?.id || updatedTransaction.category_id,
                    name: updatedTransaction.categories?.name || "",
                    slug: updatedTransaction.categories?.slug || "",
                    type: updatedTransaction.categories?.type || "expense",
                    created_at: updatedTransaction.categories?.created_at || "",
                    updated_at: updatedTransaction.categories?.updated_at,
                },
                user: {
                    id: updatedTransaction.users?.id || updatedTransaction.user_id,
                    name: updatedTransaction.users?.name || "",
                    email: updatedTransaction.users?.email || "",
                    phone: updatedTransaction.users?.phone,
                    role: updatedTransaction.users?.role || "member",
                    created_at: updatedTransaction.users?.created_at,
                    updated_at: updatedTransaction.users?.updated_at,
                },
                family: {
                    id: updatedTransaction.families?.id || updatedTransaction.family_id,
                    name: updatedTransaction.families?.name || "",
                    slug: updatedTransaction.families?.slug || "",
                    created_at: updatedTransaction.families?.created_at || "",
                    updated_at: updatedTransaction.families?.updated_at,
                },
                transaction_date: updatedTransaction.transaction_date as string,
                transaction_no: updatedTransaction.transaction_no as string,
                created_at: updatedTransaction.created_at as string,
                updated_at: updatedTransaction.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Update transaction error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

