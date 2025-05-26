import { useForm } from 'react-hook-form';
import {
  TVerifyOtpRequest,
  verifyEmailSchema,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOtp } from '@imphnen-frontend-service/utils';

export const useOtpHook = () => {
  const form = useForm<TVerifyOtpRequest>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'all',
  });

  const { otp, isLoading } = useOtp();

  const onSubmit = form.handleSubmit((data) => otp(data));

  return {
    form,
    onSubmit,
    isLoading
  };
};