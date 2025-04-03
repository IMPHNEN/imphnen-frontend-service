import { z } from 'zod';

export const authLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email cannot be empty')
    .email('Email must be valid'),
  password: z.string().min(1, 'Password cannot be empty'),
});
