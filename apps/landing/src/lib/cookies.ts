import { cookies } from 'next/headers';

const REFRESH_TOKEN_NAME = '__imphnen_refresh_token__';
const ACCESS_TOKEN_NAME = '__imphnen_access_token__';

export async function setRefreshToken(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken);
}

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_NAME, accessToken);
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_NAME)?.value;
}
