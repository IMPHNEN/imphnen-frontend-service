import type { paths } from '@/openapi-types';
import createClient from 'openapi-fetch';

export const fetcher = createClient<paths>({
  baseUrl: 'https://api.imphnen.dev',
});
