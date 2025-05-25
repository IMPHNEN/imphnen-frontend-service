import { useForm } from 'react-hook-form';
import {
  authRegisterSchema,
  TRegisterRequest,
  usePostRegister,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export const useRegister = () => {
  const postRegister = usePostRegister();
  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(authRegisterSchema),
    mode: 'all',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_number: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    postRegister.mutate(data, {
      onSuccess: () => toast.success('Registrasi sukses'),
      onError: (error) => toast.error(error.message),
    });
  });

  return {
    form,
    onSubmit,
  };
};
