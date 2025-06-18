import { useSendOTP } from '@imphnen-frontend-service/utils';

export const useResendOtpHook = () => {

  const { resendOTP, isLoading } = useSendOTP();

  return {
    resendOTP
  };
};