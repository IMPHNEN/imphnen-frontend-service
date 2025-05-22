'use server';

import { z } from 'zod';
import { fetchPostSignin } from '../_http/fetch-post-signup';
import { signupValidationSchema } from '../_validation/signup-validation';

export async function SignupAction(
  request: z.infer<typeof signupValidationSchema>
) {
  const validRequest = signupValidationSchema.parse(request);

  const data = await fetchPostSignin({ ...validRequest });

  return data;
}
