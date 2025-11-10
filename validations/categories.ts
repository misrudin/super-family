import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi").max(100, "Nama kategori maksimal 100 karakter"),
  type: z.enum(["income", "expense"], {
    message: "Type harus income atau expense"
  }),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi").max(100, "Nama kategori maksimal 100 karakter").optional(),
  type: z.enum(["income", "expense"], {
    message: "Type harus income atau expense"
  }).optional(),
});

