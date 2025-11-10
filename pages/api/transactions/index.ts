import { IBaseResponse, IMetadata } from "@/interfaces/IBaseResponse";
import { ITransaction } from "@/interfaces/ITransaction";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<ITransaction[]>>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const { page = "1", limit = "10", family_id, user_id, category_id } = req.query;

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);

        if (isNaN(pageNum) || pageNum < 1) {
            return res.status(400).json({
                success: false,
                message: "Page harus berupa angka positif",
            });
        }

        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
            return res.status(400).json({
                success: false,
                message: "Limit harus berupa angka antara 1-100",
            });
        }

        const offset = (pageNum - 1) * limitNum;

        // Query untuk count total
        let countQuery = supabase
            .from("transactions")
            .select("*", { count: "exact", head: true });

        // Query untuk data
        let dataQuery = supabase
            .from("transactions")
            .select("*, categories:category_id(id,name,slug,type), users:user_id(id,name)")
            .order("transaction_date", { ascending: false })
            .order("created_at", { ascending: false })
            .range(offset, offset + limitNum - 1);

        // Filter by family_id
        if (family_id && typeof family_id === "string") {
            countQuery = countQuery.eq("family_id", family_id);
            dataQuery = dataQuery.eq("family_id", family_id);
        }

        // Filter by user_id
        if (user_id && typeof user_id === "string") {
            countQuery = countQuery.eq("user_id", user_id);
            dataQuery = dataQuery.eq("user_id", user_id);
        }

        // Filter by category_id
        if (category_id && typeof category_id === "string") {
            countQuery = countQuery.eq("category_id", category_id);
            dataQuery = dataQuery.eq("category_id", category_id);
        }

        // Jika user authenticated, filter by family_id mereka
        const authenticatedUser = getAuthenticatedUser(req);
        if (authenticatedUser && !family_id) {
            countQuery = countQuery.eq("family_id", authenticatedUser.familyId);
            dataQuery = dataQuery.eq("family_id", authenticatedUser.familyId);
        }

        const [countResult, dataResult] = await Promise.all([
            countQuery,
            dataQuery,
        ]);

        if (countResult.error) {
            throw countResult.error;
        }

        if (dataResult.error) {
            throw dataResult.error;
        }

        const total = countResult.count || 0;
        const totalPages = Math.ceil(total / limitNum);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedTransactions: ITransaction[] = (dataResult.data || []).map((transaction: any) => ({
            id: transaction.id as string,
            amount: transaction.amount as number,
            category: {
                id: transaction.categories?.id || transaction.category_id,
                name: transaction.categories?.name || "",
                slug: transaction.categories?.slug || "",
                type: transaction.categories?.type || "expense",
            },
            user: {
                id: transaction.users?.id || transaction.user_id,
                name: transaction.users?.name || "",
            },
            transaction_date: transaction.transaction_date,
            transaction_no: transaction.transaction_no,
            note: transaction.note,
            created_at: transaction.created_at,
            updated_at: transaction.updated_at,
        }));

        const metadata: IMetadata = {
            page: pageNum,
            limit: limitNum,
            total,
            total_pages: totalPages,
        };

        return res.status(200).json({
            success: true,
            message: "Data transaksi berhasil diambil",
            data: formattedTransactions,
            metadata,
        });
    } catch (error: unknown) {
        console.error("Get transactions error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

