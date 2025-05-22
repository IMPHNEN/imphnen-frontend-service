import { z } from 'zod';

export const verifyEmailSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  otp: z
    .string()
    .min(6, { message: 'OTP harus terdiri dari 6 digit' })
    .max(6, { message: 'OTP harus terdiri dari 6 digit' }),
});
export type VerifyEmailValidationType = z.infer<typeof verifyEmailSchema>;
