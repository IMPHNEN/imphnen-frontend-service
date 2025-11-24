import { useForm } from 'react-hook-form';
import {
  authLoginSchema,
  TLoginRequest,
  usePostLogin,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useVerifyEmail } from './use-verify-email';

export const useLogin = () => {
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const { mutate, isPending } = usePostLogin();
  const { setLoading, setSession, clearSession } = useAuthStore();

  const {
    openVerifyModal,
    showVerifyModal,
    verifyForm,
    onVerifySubmit,
    closeVerifyModal,
    isVerifying,
    emailToVerify,
  } = useVerifyEmail();

  const onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    mutate(data, {
      onSuccess: (response) => {
        toast.success('Login sukses');

        if (response.data.token && response.data.user) {
          setSession(response.data);
        } else {
          const { token, ...userData } = response.data;

          const loginData = {
            token,
            userData,
          };
          setSession(loginData);
        }

        navigate(0);
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message;

        if (errorMessage === 'Account not active, please verify your email') {
          toast.error('Akun belum aktif, silakan verifikasi email Anda');
          openVerifyModal(data.email);
        } else {
          toast.error(errorMessage ?? 'Terjadi Kesalahan yang tidak diketahui');
          clearSession();
        }
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: isPending,
    showVerifyModal,
    verifyForm,
    onVerifySubmit,
    closeVerifyModal,
    isVerifying,
    emailToVerify,
  };
};
