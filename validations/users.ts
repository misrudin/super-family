import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirm_password: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Password dan konfirmasi password tidak cocok",
});

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
})