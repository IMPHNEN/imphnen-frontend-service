import { useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@imphnen-frontend-service/service';

export interface GoogleLoginResponse {
  access_token?: string;
  token?: string | {
    access_token: string;
    refresh_token: string;
  };
  accessToken?: string;
  refresh_token?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
    birthdate?: string;
    gender?: string;
    is_active?: boolean;
    phone_number?: string;
    role?: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
      permissions: Array<{
        id: string;
        name: string;
        created_at: string;
        updated_at: string;
      }>;
    };
    [key: string]: unknown;
  };
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  const handleGoogleLogin = useCallback(async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4099';
      const callbackUrl = `${window.location.origin}/auth/google-oauth-popup`;

      let authUrl;
      if (baseUrl.endsWith('/v1')) {
        authUrl = `${baseUrl}/auth/google/login?redirect_uri=${encodeURIComponent(callbackUrl)}`;
      } else {
        authUrl = `${baseUrl}/v1/auth/google/login?redirect_uri=${encodeURIComponent(callbackUrl)}`;
      }

      const popup = window.open(
        authUrl,
        'google-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        toast.error('Popup diblokir. Silakan aktifkan popup untuk situs ini.');
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
          const { payload } = event.data as { payload: GoogleLoginResponse };

          const tokenObj = typeof payload.token === 'object' ? payload.token : null;
          const accessToken = tokenObj?.access_token || payload.access_token;
          const refreshToken = tokenObj?.refresh_token || payload.refresh_token;
          const user = payload.user;

          if (accessToken && refreshToken && user && typeof accessToken === 'string' && typeof refreshToken === 'string') {
            // Convert Google user data to match TUserItem structure
            const convertedUser = {
              id: user.id,
              avatar: user.avatar || '',
              birthdate: user.birthdate || '',
              email: user.email,
              fullname: user.fullname,
              gender: user.gender || '',
              is_active: user.is_active ?? true,
              phone_number: user.phone_number || '',
              role: user.role || {
                id: '',
                name: 'User',
                created_at: '',
                updated_at: '',
                permissions: []
              }
            };

            // Use setSession like credential login does
            setSession({
              token: {
                access_token: accessToken,
                refresh_token: refreshToken,
              },
              user: convertedUser,
            });

            toast.success('Login berhasil!');
            navigate(0); // Same as credential login
          } else {
            toast.error('Data login tidak lengkap');
          }

          window.removeEventListener('message', handleMessage);
        } else if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
          const { error } = event.data;
          toast.error(`Login gagal: ${error}`);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        toast.error('Login timeout. Silakan coba lagi.');
      }, 300000);

    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Terjadi kesalahan saat login dengan Google');
    }
  }, [navigate, setSession]);

  return {
    handleGoogleLogin,
  };
};
