'use server';

import { fetcher } from '@/lib/fetcher';
import {
  forgotPasswordValidationSchema,
  ForgotPasswordValidationType,
} from '../_validation/forgot-password-validation';

export async function ForgotPasswordAction(
  request: ForgotPasswordValidationType
) {
  const validRequest = forgotPasswordValidationSchema.parse(request);

  const { data, error } = await fetcher.POST('/v1/auth/forgot', {
    body: {
      email: validRequest.email,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
