import axios from 'axios';
import { useAuthStore } from '../hooks/auth';

// Backoffice Backend API Base URL
// In development, use proxy; in production, use full URL
const BACKOFFICE_API_URL = 'https://api.hackathon.imphnen.dev/api/v1';

// Create axios instance for backoffice backend
export const backofficeApi = axios.create({
  baseURL: BACKOFFICE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
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

// Error handling interceptor
backofficeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - clear session and redirect to login
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

    // If backend sends a message, use it
    const backendMsg = error?.response?.data?.message;
    if (backendMsg && typeof backendMsg === 'string') {
      return Promise.reject(new Error(backendMsg));
    }

    // Fallback error message
    return Promise.reject(new Error(error.message || 'An error occurred'));
  }
);

// Response type
export interface BackofficeApiResponse<T> {
  data: T;
  message: string;
}
