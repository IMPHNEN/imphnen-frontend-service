import axios from 'axios';
import { useAuthStore } from '../hooks/auth';

// Hackathon Backend API Base URL
const HACKATHON_API_URL = 'https://api.hackathon.imphnen.dev/api/v1';

// Create axios instance for hackathon backend
export const hackathonApi = axios.create({
  baseURL: HACKATHON_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
hackathonApi.interceptors.request.use(
  (config) => {
    const { session } = useAuthStore.getState();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message || 'Request failed'));
  }
);

// Error handling interceptor
hackathonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - clear session and redirect to login
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    // If backend sends a message, use it
    const backendMsg = error?.response?.data?.message;
    if (backendMsg && typeof backendMsg === 'string') {
      return Promise.reject(new Error(backendMsg));
    }

    return Promise.reject(new Error(error.message || 'Request failed'));
  }
);

// API Response wrapper type
export interface HackathonApiResponse<T> {
  data: T;
  message?: string;
}
