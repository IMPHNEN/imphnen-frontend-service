import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  resetPasswordValidationSchema,
  ResetPasswordValidationSchema,
} from '../_validation/reset-password-validation';

export function useResetPasswordForm() {
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get('token') ?? '';

  return useForm<ResetPasswordValidationSchema>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
      token: tokenFromQuery,
    },
  });
}
