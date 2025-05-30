import { useForm } from 'react-hook-form';
import {
  authRegisterSchema,
  TRegisterRequest,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@imphnen-frontend-service/utils';

export const useRegisterHook = () => {
  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(authRegisterSchema),
    mode: 'all',
  });

  const { register, isLoading } = useRegister();

  const onSubmit = form.handleSubmit((data) => register(data));

  return {
    form,
    onSubmit,
    isLoading
  };
};