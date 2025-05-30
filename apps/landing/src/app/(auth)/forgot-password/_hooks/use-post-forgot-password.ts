import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ForgotPasswordAction } from '../_actions/forgot-password-action';
import { useFormForgotPassword } from './use-form-forgot-password';

export function usePostForgotPassowrd(
  form: ReturnType<typeof useFormForgotPassword>
) {
  return useMutation({
    mutationFn: ForgotPasswordAction,
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
