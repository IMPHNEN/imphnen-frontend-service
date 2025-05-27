import { z } from 'zod';

export const stepOneSignupValidationSchema = z
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
      .max(50, 'Password tidak boleh lebih dari 50 karakter')
      .regex(
        /(?=.*[A-Z])/,
        'Password harus mengandung setidaknya satu huruf kapital'
      )
      .regex(
        /(?=.*[a-z])/,
        'Password harus mengandung setidaknya satu huruf kecil'
      )
      .regex(/(?=.*\d)/, 'Password harus mengandung setidaknya satu angka')
      .regex(
        /(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])/,
        'Password harus mengandung setidaknya satu karakter spesial'
      ),
    phone_number: z
      .string({
        required_error: 'Nomor telepon tidak boleh kosong',
        invalid_type_error: 'Nomor telepon harus berupa string',
      })
      .min(10, 'Nomor telepon tidak boleh kurang dari 10 karakter')
      .max(15, 'Nomor telepon tidak boleh lebih dari 15 karakter')
      .regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka'),
    confirm_password: z
      .string({
        required_error: 'Konfirmasi password tidak boleh kosong',
      })
      .min(1, 'Konfirmasi password tidak boleh kosong')
      .max(50, 'Konfirmasi password tidak boleh lebih dari 50 karakter'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password dan Konfirmasi Password harus sama',
    path: ['confirm_password'],
  });

export const stepTwoSignupValidationSchema = z.object({
  token: z.string(),
});

export const signupValidationSchema = stepOneSignupValidationSchema.and(
  stepTwoSignupValidationSchema
);
export type SignupValidationSchema = z.infer<typeof signupValidationSchema>;
