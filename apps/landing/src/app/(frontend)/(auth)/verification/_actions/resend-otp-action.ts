'use server';

import { fetcher } from '@/lib/openapi';

export async function resendOTPAction(email: string) {
  const data = await fetcher.POST('/v1/auth/send-otp', {
    body: {
      email,
    },
  });

  console.log(data);

  return data;
}
