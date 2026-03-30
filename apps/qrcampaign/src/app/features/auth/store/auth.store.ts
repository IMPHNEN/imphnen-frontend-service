import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, User } from '../api/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await authService.login({ email, password });
          
          const token = response.data.tokens.access_token;
          const refreshToken = response.data.tokens.refresh_token;
          
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          set({ 
            user: response.data.user, 
            token: token, 
            isAuthenticated: true 
          });
          
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },

      register: async (name, email, password) => {
        try {
          const response = await authService.register({ name, email, password });
          
          const token = response.data.tokens.access_token;
          const refreshToken = response.data.tokens.refresh_token;
          
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          set({ 
            user: response.data.user, 
            token: token, 
            isAuthenticated: true 
          });
          
          return true;
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
