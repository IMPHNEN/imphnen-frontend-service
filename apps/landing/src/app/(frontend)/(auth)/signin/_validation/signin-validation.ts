import { z } from 'zod';

export const signInValidationSchema = z.object({
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
export type SignInValidationType = z.infer<typeof signInValidationSchema>;
