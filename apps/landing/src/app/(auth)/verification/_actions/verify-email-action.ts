'use server';

import { fetchPostVerifyEmail } from '../_http/fetch-post-verify-email';
import {
  type VerifyEmailValidationType,
  verifyEmailValidationSchema,
} from '../_validation/verify-email-validation';

export async function verifyEmailAction(request: VerifyEmailValidationType) {
  const validRequest = verifyEmailValidationSchema.parse(request);

  const data = await fetchPostVerifyEmail(validRequest);

  return data;
}
