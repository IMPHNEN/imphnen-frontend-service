'use server';

import { getRemoteIp } from '@/lib/headers';
import { z } from 'zod';
import { fetchPostverifyTurnstile } from '../../_http/fetch-post-verify-turnstile';
import { fetchPostSignin } from '../_http/fetch-post-signup';
import { signupValidationSchema } from '../_validation/signup-validation';

export async function SignupAction(
  request: z.infer<typeof signupValidationSchema>
) {
  const validRequest = signupValidationSchema.parse(request);
  const remoteIp = await getRemoteIp();

  const isCapchaValid = await fetchPostverifyTurnstile(
    validRequest.token,
    remoteIp
  );

  if (!isCapchaValid) throw new Error('Failed to verify captcha');

  const data = await fetchPostSignin(validRequest);

  return data;
}
