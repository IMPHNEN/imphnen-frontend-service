'use server';

import { z } from 'zod';
import { fetchPostSignin } from '../_http/fetch-post-signup';
import { fetchPostverifyTurnstile } from '../_http/fetch-post-verify-turnstile';
import { signupValidationSchema } from '../_validation/signup-validation';

export async function SignupAction(
  request: z.infer<typeof signupValidationSchema>
) {
  const validRequest = signupValidationSchema.parse(request);

  const isCapchaValidationValid = await fetchPostverifyTurnstile(
    validRequest.token
  );

  if (!isCapchaValidationValid) throw new Error('Failed to verify captcha');

  const data = await fetchPostSignin(validRequest);

  return data;
}
