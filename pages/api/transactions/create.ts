import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ITransaction } from "@/interfaces/ITransaction";
import { getAuthenticatedUser } from "@/utils/auth";
import { createLogSilent } from "@/utils/logs";
import { supabase } from "@/utils/supabase";
import { createTransactionSchema } from "@/validations/transactions";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ITransaction>>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const validationResult = createTransactionSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                error: validationResult.error.issues.map((err: ZodIssue) => err.message).join(", "),
            });
        }

        const { amount, category_id, user_id, family_id, transaction_date, transaction_no } = validationResult.data;

        // Cek apakah category ada
        const { data: category, error: categoryError } = await supabase
            .from("categories")
            .select("id, name, slug, type, created_at, updated_at")
            .eq("id", category_id)
            .single();

        if (!category || categoryError) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan",
            });
        }

        // Cek apakah user ada
        const { data: transactionUser, error: userError } = await supabase
            .from("users")
            .select("id, name, email, phone, role, created_at, updated_at")
            .eq("id", user_id)
            .single();

        if (!transactionUser || userError) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        // Cek apakah family ada
        const { data: family, error: familyError } = await supabase
            .from("families")
            .select("id, name, slug, created_at, updated_at")
            .eq("id", family_id)
            .single();

        if (!family || familyError) {
            return res.status(404).json({
                success: false,
                message: "Keluarga tidak ditemukan",
            });
        }

        const { data: newTransaction, error: insertError } = await supabase
            .from("transactions")
            .insert([
                {
                    amount,
                    category_id,
                    user_id,
                    family_id,
                    transaction_date,
                    transaction_no,
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
                    action: "create_transaction",
                    transaction_id: newTransaction.id,
                    transaction_no: newTransaction.transaction_no,
                    amount: newTransaction.amount,
                },
                user_id: user.id,
                family_id: family_id,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Transaksi berhasil dibuat",
            data: {
                id: newTransaction.id as string,
                amount: newTransaction.amount as number,
                category: {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    type: category.type as "income" | "expense",
                    created_at: category.created_at,
                    updated_at: category.updated_at,
                },
                user: {
                    id: transactionUser.id,
                    name: transactionUser.name,
                    email: transactionUser.email,
                    phone: transactionUser.phone,
                    role: transactionUser.role as 'admin' | 'member',
                    created_at: transactionUser.created_at,
                    updated_at: transactionUser.updated_at,
                },
                family: {
                    id: family.id,
                    name: family.name,
                    slug: family.slug,
                    created_at: family.created_at,
                    updated_at: family.updated_at,
                },
                transaction_date: newTransaction.transaction_date as string,
                transaction_no: newTransaction.transaction_no as string,
                created_at: newTransaction.created_at as string,
                updated_at: newTransaction.updated_at as string | undefined,
            },
        });
    } catch (error: unknown) {
        console.error("Create transaction error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

