import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { resendOTPAction } from '../_actions/resend-otp-action';

export function usePostResendOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: resendOTPAction,
    onSuccess: () => router.replace('/verification?success=true'),
  });
}
