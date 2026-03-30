import { usePostSendOtp } from '@imphnen-frontend-service/service';

export const useResendOtpHook = () => {

  const { mutate, isPending: isLoading } = usePostSendOtp();

  const resendOTP = (_data?: { email: string }) => {
    mutate();
  };

  return {
    resendOTP,
    isLoading
  };
};
