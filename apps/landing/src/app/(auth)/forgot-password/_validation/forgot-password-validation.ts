import { z } from 'zod';

export const forgotPasswordValidationSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  token: z.string(),
});
export type ForgotPasswordValidationType = z.infer<
  typeof forgotPasswordValidationSchema
>;
