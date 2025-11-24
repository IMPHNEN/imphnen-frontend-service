import { supabase, useAuthStore } from '@imphnen-frontend-service/service';
import { useNavigate } from 'react-router';

export const useSession = () => {
  const navigate = useNavigate();
  const { clearSession, session, status } = useAuthStore();
  const isAuthenticated = status === 'authenticated';

  const signOut = async () => {
    await supabase.auth.signOut();
    clearSession();
    navigate('/auth/login');
  };

  return {
    session,
    signOut,
    isAuthenticated,
  };
};
