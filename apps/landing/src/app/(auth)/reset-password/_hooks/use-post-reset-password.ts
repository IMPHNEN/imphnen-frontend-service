import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { resetPasswordAction } from '../_actions/reset-password-actions';
import { useResetPasswordForm } from './use-reset-password-form';

export function usePostResetPassword(
  form: ReturnType<typeof useResetPasswordForm>
) {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: ({ message }) => {
      form.reset();
      router.replace('/signin');
      toast.success(message);
    },
    onError: ({ message }) => {
      form.reset();
      toast.error(message);
    },
  });
}
