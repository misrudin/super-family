import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("Amount harus lebih dari 0"),
  category_id: z.string().uuid("Kategori harus diisi"),
  note: z.string().optional(),
});
