import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { resendOTPAction } from '../_actions/resend-otp-action';
import { useFormResendOTP } from './use-form-resend-otp';

export function usePostResendOTP(form: ReturnType<typeof useFormResendOTP>) {
  const router = useRouter();

  return useMutation({
    mutationFn: resendOTPAction,
    onSuccess: () => router.replace('/verification?success=true'),
  });
}
