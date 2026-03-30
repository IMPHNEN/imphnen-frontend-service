import axios from 'axios';
import { useAuthStore } from '../hooks/auth';

const BACKOFFICE_API_URL = 'https://api.hackathon.imphnen.dev/api/v1';

export const backofficeApi = axios.create({
  baseURL: BACKOFFICE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

backofficeApi.interceptors.request.use(
  (config) => {
    const { session } = useAuthStore.getState();
    if (session?.token?.access_token) {
      config.headers.Authorization = `Bearer ${session.token.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message || 'Request failed'));
  }
);

backofficeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthPage =
        globalThis.window !== undefined &&
        globalThis.location.pathname.startsWith('/auth');

      if (!isAuthPage) {
        useAuthStore.getState().clearSession();
        if (globalThis.window !== undefined) {
          globalThis.location.href = '/auth/login';
        }
      }
    }

    const backendMsg = error?.response?.data?.message;
    if (backendMsg && typeof backendMsg === 'string') {
      return Promise.reject(new Error(backendMsg));
    }

    return Promise.reject(new Error(error.message || 'An error occurred'));
  }
);

export interface BackofficeApiResponse<T> {
  data: T;
  message: string;
}
