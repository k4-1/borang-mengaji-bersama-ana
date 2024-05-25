import * as z from "zod";

export const RegisterSchema = z.object({
  nama: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .min(1, {
      message: "Sila masukkan nama anda",
    }),
  nomborIc: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .regex(/^[-]?\d*\.?\d+$/, "Sila masukkan ic anda")
    .min(1, {
      message: "Sila masukkan ic anda",
    })
    .max(12, {
      message: "Sila masukkan format ic yang betul",
    }),

  umur: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .regex(/^[-]?\d*\.?\d+$/, "Sila masukkan umur anda")
    .min(1, {
      message: "Sila masukkan umur anda",
    })
    .max(3, {
      message: "Sila masukkan umur yang betul",
    }),

  nomborTel: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .regex(
      /^[-]?\d*\.?\d+$/,
      "Sila masukkan nombor telefon dalam format yang betul"
    )
    .min(1, {
      message: "Sila masukkan ic anda",
    }),

  negeri: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .min(1, {
      message: "Sila masukkan tempat tinggal anda",
    }),
  tahap: z
    .string({
      required_error: "Wajib diisi",
      invalid_type_error: "Pengisian tidak sah",
    })
    .min(1, {
      message: "Sila masukkan tahap anda",
    }),
});
