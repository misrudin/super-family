import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().positive("Amount harus lebih dari 0"),
  category_id: z.string().uuid("Category ID harus berupa UUID valid"),
  user_id: z.string().uuid("User ID harus berupa UUID valid"),
  family_id: z.string().uuid("Family ID harus berupa UUID valid"),
  transaction_date: z.string().datetime("Transaction date harus berupa format datetime valid"),
  transaction_no: z.string().min(1, "Transaction number harus diisi").max(100, "Transaction number maksimal 100 karakter"),
});

export const updateTransactionSchema = z.object({
  amount: z.number().positive("Amount harus lebih dari 0").optional(),
  category_id: z.string().uuid("Category ID harus berupa UUID valid").optional(),
  user_id: z.string().uuid("User ID harus berupa UUID valid").optional(),
  family_id: z.string().uuid("Family ID harus berupa UUID valid").optional(),
  transaction_date: z.string().datetime("Transaction date harus berupa format datetime valid").optional(),
  transaction_no: z.string().min(1, "Transaction number harus diisi").max(100, "Transaction number maksimal 100 karakter").optional(),
});

