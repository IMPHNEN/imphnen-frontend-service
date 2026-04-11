import { useForm } from 'react-hook-form';
import {
  authLoginSchema,
  TLoginRequest,
  usePostLogin,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLogin = () => {
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'all',
  });

  const loginMutation = usePostLogin();

  const onSubmit = form.handleSubmit((data) => loginMutation.mutate(data));

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};
