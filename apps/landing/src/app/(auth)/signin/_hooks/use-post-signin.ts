import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SigninAction } from '../_actions/signin-action';
import { useFormSignin } from './use-form-signin';

export function usePostSignin(form: ReturnType<typeof useFormSignin>) {
  const router = useRouter();

  return useMutation({
    mutationFn: SigninAction,

    onSuccess: () => {
      router.push('/');
    },
    onError: (error, variables) => {
      form.resetField('password');

      if (error.message.includes('not active')) {
        setTimeout(() => {
          router.push(`/verification?ref=${variables.email}`);
        }, 750);
      }

      toast.error(error.message);
    },
  });
}
