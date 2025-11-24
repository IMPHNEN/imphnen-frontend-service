// OTP verification is not used with GitHub OAuth authentication
// This hook is kept for backward compatibility but is not used
export const useOtp = () => {
  return {
    otp: () => {
      console.warn('OTP verification is not used with GitHub OAuth authentication');
    },
    isLoading: false,
  };
};
