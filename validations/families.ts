import { z } from "zod";

export const familySchema = z.object({
  name: z.string().min(1, "Nama keluarga harus diisi").max(100, "Nama keluarga maksimal 100 karakter"),
  slug: z.string().min(1, "Kode harus diisi").max(100, "Kode maksimal 100 karakter").regex(/^[a-z0-9-]+$/, "Kode hanya boleh huruf kecil, angka, dan tanda hubung"),
});
