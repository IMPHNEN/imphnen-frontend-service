import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { verifyEmailAction } from '../_actions/verify-email-action';
import { useFormVerifyEmail } from './use-form-verify-email';

export function usePostVerifyEmail(
  form: ReturnType<typeof useFormVerifyEmail>
) {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyEmailAction,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      form.resetField('otp');
    },
  });
}
