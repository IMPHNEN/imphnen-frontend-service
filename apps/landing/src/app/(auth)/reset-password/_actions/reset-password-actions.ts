'use server';

import { fetcher } from '@/lib/fetcher';
import {
  resetPasswordValidationSchema,
  ResetPasswordValidationSchema,
} from '../_validation/reset-password-validation';

export async function resetPasswordAction(
  request: ResetPasswordValidationSchema
) {
  const validRequest = resetPasswordValidationSchema.parse(request);

  if (validRequest.confirm_password !== validRequest.confirm_password) {
    throw new Error('Password missmatch');
  }

  const { data, error } = await fetcher.POST('/v1/auth/new-password', {
    body: {
      password: validRequest.password,
      token: validRequest.token,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
