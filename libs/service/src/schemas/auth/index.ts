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
    phone_number: z
      .string({
        required_error: 'Nomor telepon tidak boleh kosong',
      })
      .min(1, 'Nomor telepon tidak boleh kosong')
      .max(15, 'Nomor telepon tidak boleh lebih dari 15 digit'),
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

export const verifyEmailSchema = z
  .object({
    otp: z
      .string({
        required_error: 'OTP tidak boleh kosong',
      })
      .min(6, 'Masukkan kode 6 digit yang dikirimkan ke email')
  })