import { TSendOTPRequest, usePostSendOTP } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

export const useSendOTP = () => {
  const { mutate, isPending } = usePostSendOTP();
  
  const resendOTP = (payload: TSendOTPRequest) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('Berhasil Mengirim Ulang OTP');
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
    resendOTP,
    isLoading: isPending,
  };
};
