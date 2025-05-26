import { TVerifyOtpRequest, usePostVerifyEmail } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router';

export const useOtp = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostVerifyEmail();
  const [ searchParams ] = useSearchParams();
  
  const otp = (payload: TVerifyOtpRequest) => {
    mutate({ ...payload, email: searchParams.get("email") || "" }, {
      onSuccess: (data) => {
        toast.success('Berhasil Registrasi');
        navigate("/auth/register/success");
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
    otp,
    isLoading: isPending,
  };
};
