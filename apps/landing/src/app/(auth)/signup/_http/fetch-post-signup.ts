import { fetcher } from '@/lib/fetcher';
import { SignupValidationSchema } from '../_validation/signup-validation';

export async function fetchPostSignin({
  email,
  password,
  fullname,
  phone_number,
}: SignupValidationSchema) {
  const { data, error, response } = await fetcher.POST('/v1/auth/register', {
    body: {
      email,
      password,
      fullname,
      phone_number,
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
