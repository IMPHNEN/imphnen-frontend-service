import { useForm } from 'react-hook-form';
import {
  TVerifyOtpRequest,
  verifyEmailSchema,
  usePostVerifyEmail,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';

export const useOtpHook = () => {
  const form = useForm<TVerifyOtpRequest>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'all',
  });

  const { mutate, isPending: isLoading } = usePostVerifyEmail();

  const onSubmit = form.handleSubmit(() => mutate());

  return {
    form,
    onSubmit,
    isLoading
  };
};
