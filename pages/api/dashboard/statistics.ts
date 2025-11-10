import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { getAuthenticatedUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

interface IDashboardStatistics {
    total_balance: number;
    income_this_month: number;
    expense_this_month: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBaseResponse<IDashboardStatistics>>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const authenticatedUser = getAuthenticatedUser(req);
        const familyId = authenticatedUser.familyId;

        if (!familyId) {
            return res.status(200).json({
                success: true,
                message: "Data statistik berhasil diambil",
                data: {
                    total_balance: 0,
                    income_this_month: 0,
                    expense_this_month: 0,
                },
            });
        }

        // Get current month start and end
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        // Get all transactions for this family
        const { data: allTransactions, error: allError } = await supabase
            .from("transactions")
            .select("amount, categories:category_id(type)")
            .eq("family_id", familyId);

        if (allError) {
            throw allError;
        }

        // Get transactions for this month
        const { data: monthTransactions, error: monthError } = await supabase
            .from("transactions")
            .select("amount, categories:category_id(type)")
            .eq("family_id", familyId)
            .gte("transaction_date", startOfMonth.toISOString())
            .lte("transaction_date", endOfMonth.toISOString());

        if (monthError) {
            throw monthError;
        }

        // Calculate total balance (all time)
        let totalIncome = 0;
        let totalExpense = 0;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (allTransactions || []).forEach((transaction: any) => {
            const amount = transaction.amount || 0;
            const categoryType = transaction.categories?.type;

            if (categoryType === "income") {
                totalIncome += amount;
            } else if (categoryType === "expense") {
                totalExpense += amount;
            }
        });

        const totalBalance = totalIncome - totalExpense;

        // Calculate this month
        let incomeThisMonth = 0;
        let expenseThisMonth = 0;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (monthTransactions || []).forEach((transaction: any) => {
            const amount = transaction.amount || 0;
            const categoryType = transaction.categories?.type;

            if (categoryType === "income") {
                incomeThisMonth += amount;
            } else if (categoryType === "expense") {
                expenseThisMonth += amount;
            }
        });

        return res.status(200).json({
            success: true,
            message: "Data statistik berhasil diambil",
            data: {
                total_balance: totalBalance,
                income_this_month: incomeThisMonth,
                expense_this_month: expenseThisMonth,
            },
        });
    } catch (error: unknown) {
        console.error("Get dashboard statistics error:", error);

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

