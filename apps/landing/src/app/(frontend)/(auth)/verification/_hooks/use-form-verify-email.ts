import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  verifyEmailSchema,
  type VerifyEmailValidationType,
} from '../_validation/verify-email-validation';

export function useFormVerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get('ref');

  return useForm<VerifyEmailValidationType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: email ?? '',
      otp: '',
    },
  });
}
