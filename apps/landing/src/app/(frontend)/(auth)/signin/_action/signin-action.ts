'use server';

import { setAccessToken, setRefreshToken } from '@/lib/cookies';
import { fetcher } from '@/lib/openapi';

export async function SigninAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data: json, error } = await fetcher.POST('/v1/auth/login', {
    body: {
      email,
      password,
    },
  });

  if (error) throw new Error(error.message);

  const accessToken = json.data.token.access_token;
  const refreshToken = json.data.token.refresh_token;

  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);

  return json;
}
