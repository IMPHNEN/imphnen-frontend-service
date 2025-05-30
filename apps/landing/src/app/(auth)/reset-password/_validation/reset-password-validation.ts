import { z } from 'zod';

export const resetPasswordValidationSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password tidak boleh kosong',
        invalid_type_error: 'Password harus berupa string',
      })
      .min(8, 'Password harus minimal 8 karakter')
      .max(50, 'Password tidak boleh lebih dari 50 karakter')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/,
        'Password harus mengandung setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter spesial'
      ),
    confirm_password: z
      .string({
        required_error: 'Konfirmasi password tidak boleh kosong',
      })
      .min(8, 'Konfirmasi password harus minimal 8 karakter')
      .max(50, 'Konfirmasi password tidak boleh lebih dari 50 karakter'),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password dan Konfirmasi Password harus sama',
    path: ['confirm_password'],
  });

export type ResetPasswordValidationSchema = z.infer<
  typeof resetPasswordValidationSchema
>;
