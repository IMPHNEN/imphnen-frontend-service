import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  resendOTPValidationSchema,
  type ResendOTPValidationType,
} from '../_validation/resend-otp-validation';

export function useFormResendOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get('ref');

  return useForm<ResendOTPValidationType>({
    resolver: zodResolver(resendOTPValidationSchema),
    defaultValues: {
      email: email ?? '',
      token: '',
    },
  });
}
