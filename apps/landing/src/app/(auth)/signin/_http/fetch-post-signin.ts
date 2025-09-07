import { fetcher } from '@/lib/fetcher';
import { SignInValidationType } from '../_validation/signin-validation';

export async function fetchPostSignin({
  email,
  password,
}: SignInValidationType) {
  const { data, error, response } = await fetcher.POST('/v1/auth/login', {
    body: {
      email,
      password,
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

