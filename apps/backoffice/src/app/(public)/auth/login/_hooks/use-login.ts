import { useForm } from 'react-hook-form';
import {
  authLoginSchema,
  TLoginRequest,
  useBackofficeLogin,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = useBackofficeLogin();

  const form = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success('Login berhasil!');
      navigate('/hackathon-dashboard');
    } catch (error) {
      console.error('[Backoffice Login] Error:', error);
      toast.error((error as Error).message || 'Login gagal');
    }
  });

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};
