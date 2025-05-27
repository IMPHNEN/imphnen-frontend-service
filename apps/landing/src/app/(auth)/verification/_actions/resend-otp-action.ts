'use server';

import { fetcher } from '@/lib/fetcher';
import { getRemoteIp } from '@/lib/headers';
import { fetchPostverifyTurnstile } from '../../_http/fetch-post-verify-turnstile';
import {
  resendOTPValidationSchema,
  type ResendOTPValidationType,
} from '../_validation/resend-otp-validation';

export async function resendOTPAction(request: ResendOTPValidationType) {
  const validRequest = resendOTPValidationSchema.parse(request);
  const remoteIp = await getRemoteIp();

  const isCapchaValid = await fetchPostverifyTurnstile(
    validRequest.token,
    remoteIp
  );

  if (!isCapchaValid) throw new Error('Failed to verify captcha');

  const { data } = await fetcher.POST('/v1/auth/send-otp', {
    body: {
      email: validRequest.email,
    },
  });

  console.log(data);

  return data?.message;
}
