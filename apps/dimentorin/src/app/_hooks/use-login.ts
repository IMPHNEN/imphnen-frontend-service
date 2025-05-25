import { useForm } from 'react-hook-form';
import {
  authLoginSchema,
  TLoginRequest,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@imphnen-frontend-service/utils';

export const useLogin = () => {
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'all',
  });

  const { signIn } = useSession();

  const onSubmit = form.handleSubmit((data) => signIn(data));

  return {
    form,
    onSubmit,
  };
};
