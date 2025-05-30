import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  forgotPasswordValidationSchema,
  type ForgotPasswordValidationType,
} from '../_validation/forgot-password-validation';

export function useFormForgotPassword() {
  return useForm<ForgotPasswordValidationType>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
      token: '',
    },
  });
}
