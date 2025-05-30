import { z } from 'zod';

export const resendOTPValidationSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  token: z.string().min(1, { message: 'OTP harus terdiri dari 1 digit' }),
});
export type ResendOTPValidationType = z.infer<typeof resendOTPValidationSchema>;
