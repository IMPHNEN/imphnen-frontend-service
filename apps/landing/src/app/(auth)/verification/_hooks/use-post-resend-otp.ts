import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resendOTPAction } from '../_actions/resend-otp-action';
import { useFormResendOTP } from './use-form-resend-otp';

export function usePostResendOTP(form: ReturnType<typeof useFormResendOTP>) {
  return useMutation({
    mutationFn: resendOTPAction,
    onSuccess: ({ message }) => {
      form.reset();
      toast.success(message);
    },
    onError: ({ message }) => {
      form.reset();
      toast.error(message);
    },
  });
}
