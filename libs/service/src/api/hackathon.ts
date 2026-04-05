// All API calls now go through the main `api` instance (api.imphnen.dev).
// This file re-exports `api` as `hackathonApi` for backward compatibility.
export { api as hackathonApi } from './index';

export interface HackathonApiResponse<T> {
  data: T;
  message?: string;
}
