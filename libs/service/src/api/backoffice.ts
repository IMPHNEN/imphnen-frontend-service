// All API calls now go through the main `api` instance (api.imphnen.dev).
// This file re-exports `api` as `backofficeApi` for backward compatibility.
export { api as backofficeApi } from './index';

export interface BackofficeApiResponse<T> {
  data: T;
  message: string;
}
