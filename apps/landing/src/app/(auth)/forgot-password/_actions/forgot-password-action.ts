'use server';

import { fetcher } from '@/lib/fetcher';
import { getRemoteIp } from '@/lib/headers';
import { fetchPostverifyTurnstile } from '../../_http/fetch-post-verify-turnstile';
import {
  forgotPasswordValidationSchema,
  ForgotPasswordValidationType,
} from '../_validation/forgot-password-validation';

export async function ForgotPasswordAction(
  request: ForgotPasswordValidationType
) {
  const validRequest = forgotPasswordValidationSchema.parse(request);
  const remoteIp = await getRemoteIp();

  const isCapchaValid = await fetchPostverifyTurnstile(
    validRequest.token,
    remoteIp
  );

  if (!isCapchaValid) throw new Error('Failed to verify captcha');

  const { data, error } = await fetcher.POST('/v1/auth/forgot', {
    body: {
      email: validRequest.email,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
