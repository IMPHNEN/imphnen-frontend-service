import axios, { AxiosRequestConfig } from 'axios';

export * from './auth';
export * from './gacha';
export * from './users';
export * from './mentors';
export * from './upload';
export * from './hackathon';
export * from './admin';
export * from './roles';
export * from './permissions';
export * from './events';
export * from './testimonials';
export * from './sessions';

export interface ApiResponse<T> {
  data: T;
  version: string;
}

const TOKEN_KEY = 'token';

const getSessionTokenFromCookies = () => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${TOKEN_KEY}=`)
  );

  if (!tokenCookie) return null;

  try {
    const tokenValue = tokenCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(tokenValue));
  } catch {
    return null;
  }
};

const setSessionTokenToCookies = (tokenData: {
  token: { access_token: string; refresh_token: string };
}) => {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    JSON.stringify(tokenData)
  )}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

const removeSessionTokenFromCookies = () => {
  if (typeof document === 'undefined') return;

  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getBaseURL = () => {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  try {
    const meta = import.meta as unknown as Record<string, Record<string, string>>;
    if (meta.env?.VITE_API_URL) return meta.env.VITE_API_URL;
  } catch {
    // not in Vite context
  }
  return '';
};

const config: AxiosRequestConfig = {
  baseURL: getBaseURL(),
};

export const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const sessionData = getSessionTokenFromCookies();
    const token = sessionData?.token?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message || 'Request failed'));
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return handleTokenRefresh(originalRequest);
    }

    const backendMsg = error?.response?.data?.message;
    if (backendMsg && typeof backendMsg === 'string') {
      return Promise.reject(new Error(backendMsg));
    }

    return Promise.reject(new Error(error.message || 'Request failed'));
  }
);

async function handleTokenRefresh(originalRequest: AxiosRequestConfig) {
  const sessionData = getSessionTokenFromCookies();
  const refreshToken = sessionData?.token?.refresh_token;

  if (!refreshToken) {
    clearSessionAndRedirect();
    throw new Error('No refresh token available');
  }

  try {
    const response = await refreshAccessToken(refreshToken);

    if (response.data?.access_token) {
      setSessionTokenToCookies({
        token: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token || refreshToken,
        },
      });

      originalRequest.headers ??= {};
      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      return api(originalRequest);
    }

    throw new Error('Invalid refresh response');
  } catch (refreshError) {
    console.error('Token refresh failed:', refreshError);
    clearSessionAndRedirect();
    throw new Error('Token refresh failed');
  }
}

async function refreshAccessToken(refreshToken: string) {
  return axios.post(`${getBaseURL()}/v1/iam/auth/refresh`, {
    refresh_token: refreshToken,
  });
}

function clearSessionAndRedirect() {
  removeSessionTokenFromCookies();
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
}
