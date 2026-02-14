import axios from 'axios';

// Define the base URL for the API
const API_URL = 'https://api-qr.imphnen.dev/api/v1';

// Create a configured axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Backend user response
interface BackendUser {
  id: string;
  email: string;
  name: string;
  role: string;
  provider: string;
  created_at: string;
  updated_at: string;
}

// Frontend user type
export interface User {
  id: string;
  email: string;
  fullname: string;
  role?: {
    id: string;
    name: string;
    permissions: string[];
  };
}

// Backend auth response
interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: BackendUser;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: User;
  };
}

// Helper to transform backend user to frontend user
const transformUser = (backendUser: BackendUser): User => {
  return {
    id: backendUser.id,
    email: backendUser.email,
    fullname: backendUser.name,
    role: {
      id: '',
      name: backendUser.role === 'admin' ? 'Admin' : backendUser.role === 'user' ? 'User' : 'User',
      permissions: [],
    },
  };
};

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>('/auth/login', data);
    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        tokens: response.data.data.tokens,
        user: transformUser(response.data.data.user),
      },
    };
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>('/auth/register', data);
    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        tokens: response.data.data.tokens,
        user: transformUser(response.data.data.user),
      },
    };
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
};
