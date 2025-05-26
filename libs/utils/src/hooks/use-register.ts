import { TRegisterRequest, usePostRegister } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostRegister();

  const register = (payload: TRegisterRequest) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('Berhasil Registrasi');
        navigate(`/auth/register/otp?email=${payload.email}`);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ??
            'Terjadi Kesalahan yang tidak diketahui'
        );
      },
    });
  };

  return {
    register,
    isLoading: isPending,
  };
};
