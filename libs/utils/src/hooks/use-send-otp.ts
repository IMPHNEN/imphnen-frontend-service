// OTP is not used with GitHub OAuth authentication
// This hook is kept for backward compatibility but is not used
export const useSendOTP = () => {
  return {
    resendOTP: () => {
      console.warn('OTP is not used with GitHub OAuth authentication');
    },
    isLoading: false,
  };
};
