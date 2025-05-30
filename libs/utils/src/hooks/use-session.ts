import { TLoginRequest, usePostLogin } from '@imphnen-frontend-service/service';
import { useAuthStore } from './';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const useSession = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostLogin();
  const { setLoading, setSession, clearSession, session, status } =
    useAuthStore();
  const isAuthenticated = status === 'authenticated';

  const signIn = (payload: TLoginRequest) => {
    setLoading(true);
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('Login sukses');
        setSession(data.data);
        navigate(0);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ??
            'Terjadi Kesalahan yang tidak diketahui'
        );
        clearSession();
      },
    });
  };
  const signOut = () => {
    clearSession();
    navigate(0);
  };
  return {
    session,
    signIn,
    signOut,
    isLoading: isPending,
    isAuthenticated,
  };
};
