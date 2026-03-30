import { useForm } from 'react-hook-form';
import {
  authRegisterSchema,
  TRegisterRequest,
  usePostRegister,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';

export const useRegisterHook = () => {
  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(authRegisterSchema),
    mode: 'all',
  });

  const { mutate: register, isPending: isLoading } = usePostRegister();

  const onSubmit = form.handleSubmit((data) =>
    register({
      email: data.email,
      password: data.password,
      fullname: data.fullname,
    })
  );

  return {
    form,
    onSubmit,
    isLoading
  };
};
