'use client';

import { useAuthStore } from './auth';

export const useSession = () => {
  const { clearSession, session, status } = useAuthStore();
  const isAuthenticated = status === 'authenticated';

  const signOut = () => {
    clearSession();
    localStorage.clear();
    window.location.href = '/auth/login';
  };

  return {
    session,
    signOut,
    isAuthenticated,
  };
};
