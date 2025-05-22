import { fetcher } from '@/lib/openapi';
import { VerifyEmailValidationType } from '../_validation/verify-email-validation';

export async function fetchPostVerifyEmail({
  email,
  otp,
}: VerifyEmailValidationType) {
  const formattedOTP = parseInt(otp);

  const { data, error, response } = await fetcher.POST(
    '/v1/auth/verify-email',
    {
      body: {
        email,
        otp: formattedOTP,
      },
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!response.ok) {
    throw new Error('Something went wrong, please try again later');
  }

  console.log(data);

  return data;
}
