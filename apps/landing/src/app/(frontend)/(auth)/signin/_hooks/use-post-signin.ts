import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SigninAction } from '../_actions/signin-action';
import { useFormSignin } from './use-form-signin';

export function usePostSignin(form: ReturnType<typeof useFormSignin>) {
  const router = useRouter();

  return useMutation({
    mutationFn: SigninAction,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      form.resetField('password');
    },
  });
}
