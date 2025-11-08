import { z } from "zod";

export const createFamilySchema = z.object({
  name: z.string().min(1, "Nama keluarga harus diisi").max(100, "Nama keluarga maksimal 100 karakter"),
  slug: z.string().min(1, "Slug harus diisi").max(100, "Slug maksimal 100 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
});

export const updateFamilySchema = z.object({
  name: z.string().min(1, "Nama keluarga harus diisi").max(100, "Nama keluarga maksimal 100 karakter").optional(),
  slug: z.string().min(1, "Slug harus diisi").max(100, "Slug maksimal 100 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung").optional(),
});

