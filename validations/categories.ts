import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi").max(100, "Nama kategori maksimal 100 karakter"),
  type: z.enum(["income", "expense"], {
    message: "Type harus income atau expense"
  }),
  slug: z.string().min(1, "Slug harus diisi").max(100, "Slug maksimal 100 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi").max(100, "Nama kategori maksimal 100 karakter").optional(),
  type: z.enum(["income", "expense"], {
    message: "Type harus income atau expense"
  }).optional(),
  slug: z.string().min(1, "Slug harus diisi").max(100, "Slug maksimal 100 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung").optional(),
});

