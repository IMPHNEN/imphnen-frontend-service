import type { paths } from '@/openapi-types';
import createClient from 'openapi-fetch';

export const fetcher = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.imphnen.dev',
});
