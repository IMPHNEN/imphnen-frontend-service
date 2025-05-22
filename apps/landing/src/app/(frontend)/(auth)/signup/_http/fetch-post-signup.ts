import { fetcher } from '@/lib/openapi';
import { SignupValidationSchema } from '../_validation/signup-validation';

export async function fetchPostSignin({
  email,
  password,
  fullname,
  phone_number,
  student_type,
  referral_code,
  referred_by,
}: SignupValidationSchema) {
  const { data, error, response } = await fetcher.POST('/v1/auth/register', {
    body: {
      email,
      password,
      fullname,
      phone_number,
      student_type,
      referral_code,
      referred_by,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!response.ok) {
    throw new Error('Someting went wrong, please try again later');
  }

  return data;
}
