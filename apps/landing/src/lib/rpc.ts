import type { paths } from '@/openapi-types';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.imphnen.dev',
});
export const rpc = createClient(fetchClient);
