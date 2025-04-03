import { z } from 'zod';

export const authLoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email tidak boleh kosong',
      invalid_type_error: 'Email harus berupa string',
    })
    .min(1, 'Email tidak boleh kosong')
    .email('Email harus valid'),
  password: z
    .string({
      required_error: 'Password tidak boleh kosong',
      invalid_type_error: 'Password harus berupa string',
    })
    .min(1, 'Password tidak boleh kosong'),
});

export const authRegisterSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email tidak boleh kosong',
        invalid_type_error: 'Email harus berupa string',
      })
      .min(1, 'Email tidak boleh kosong')
      .email('Email harus valid'),
    fullname: z
      .string({
        required_error: 'Nama tidak boleh kosong',
        invalid_type_error: 'Nama harus berupa string',
      })
      .min(1, 'Nama tidak boleh kosong')
      .max(50, 'Nama tidak boleh lebih dari 50 karakter'),
    password: z
      .string({
        required_error: 'Password tidak boleh kosong',
        invalid_type_error: 'Password harus berupa string',
      })
      .min(1, 'Password tidak boleh kosong')
      .min(8, 'Password harus lebih dari 8 karakter')
      .max(50, 'Password tidak boleh lebih dari 50 karakter'),
    phone_number: z
      .string({
        required_error: 'Nomor telepon tidak boleh kosong',
        invalid_type_error: 'Nomor telepon harus berupa string',
      })
      .min(1, 'Nomor telepon tidak boleh kosong')
      .max(15, 'Nomor telepon tidak boleh lebih dari 15 karakter'),
    referral_code: z
      .string()
      .min(1, 'Kode referral tidak boleh kosong')
      .max(4, 'Kode referral tidak boleh lebih dari 4 karakter')
      .optional(),
    referred_by: z
      .string()
      .min(1, 'Kode referral tidak boleh kosong')
      .max(50, 'Kode referral tidak boleh lebih dari 50 karakter')
      .optional(),
    student_type: z.string(),
    confirm_password: z
      .string({
        required_error: 'Konfirmasi password tidak boleh kosong',
      })
      .min(1, 'Konfirmasi password tidak boleh kosong')
      .max(50, 'Konfirmasi password tidak boleh lebih dari 50 karakter'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm_password'],
        message: `No duplicates allowed.`,
      });
    }
  });
