'use server';

import { setAccessToken, setRefreshToken } from '@/lib/cookies';
import { fetchPostSignin } from '../_http/signin-http';
import {
  type SignInValidationType,
  signInValidationSchema,
} from '../_validation/signin-validation';

export async function SigninAction(request: SignInValidationType) {
  const validRequest = signInValidationSchema.parse(request);

  const { data } = await fetchPostSignin(validRequest);

  const accessToken = data.token.access_token;
  const refreshToken = data.token.refresh_token;

  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);

  return data;
}
