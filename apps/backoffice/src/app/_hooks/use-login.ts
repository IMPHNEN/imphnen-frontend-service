import { useForm } from 'react-hook-form';
import {
  authLoginSchema,
  TLoginRequest,
  usePostLogin,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export const useLogin = () => {
  const postLogin = usePostLogin();
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'all',
  });

  const onSubmit = form.handleSubmit((data) => {
    postLogin.mutate(data, {
      onSuccess: () => toast.success("Login sukses"),
      onError: (error) => toast.error(error.message),
    });
  });

  return {
    form,
    onSubmit,
  };
};
