'use client';

import { Button } from '@components/atoms';
import { usePostResendOTP } from '../_hooks/use-post-resend-otp';

export function ButtonResendOTP({ email }: { email: string }) {
  const { mutate } = usePostResendOTP();

  const handleResendOTP = () => mutate(email);

  return (
    <Button onClick={handleResendOTP} className="w-full -mt-2">
      Kirim Ulang Kode OTP
    </Button>
  );
}
