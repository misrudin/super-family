import { z } from "zod";

export const familySchema = z.object({
  name: z.string().min(1, "Nama keluarga harus diisi").max(100, "Nama keluarga maksimal 100 karakter"),
});
