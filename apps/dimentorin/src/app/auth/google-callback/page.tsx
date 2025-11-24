import { FC, ReactElement, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGoogleCallback, useAuthStore } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

export const GoogleCallbackPage: FC = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSession, clearSession } = useAuthStore();
  const { mutate: googleCallback } = useGoogleCallback();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        toast.error('Google login dibatalkan atau terjadi kesalahan');
        navigate('/auth/login');
        return;
      }

      if (!code || !state) {
        toast.error('Parameter login Google tidak valid');
        navigate('/auth/login');
        return;
      }

      try {
        googleCallback(
          { code, state },
          {
            onSuccess: (response) => {
              if (response.token && response.user) {
                setSession({
                  token: response.token,
                  user: response.user,
                });
                toast.success('Login Google berhasil!');
                navigate('/dashboard');
              } else {
                throw new Error('Response data tidak valid');
              }
            },
            onError: (error) => {
              console.error('Google OAuth callback error:', error);
              toast.error('Login Google gagal');
              clearSession();
              navigate('/auth/login');
            },
          }
        );
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        toast.error('Login Google gagal');
        clearSession();
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setSession, clearSession, googleCallback]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-primary-500 mb-2">
          Menyelesaikan Login Google...
        </h2>
        <p className="text-gray-600">
          Mohon tunggu sebentar, kami sedang memproses login Anda.
        </p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
