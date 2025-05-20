import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  signInValidationSchema,
  type SignInValidationType,
} from '../_validation/signin-validation';

export function useFormSignin() {
  return useForm<SignInValidationType>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
}
