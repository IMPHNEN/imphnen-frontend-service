import { LogoSimple } from '@/app/_components/logo';
import { redirect } from 'next/navigation';
import { use } from 'react';
import { ResetPasswordForm } from './_components/reset-password-form';

export const dynamic = 'force-dynamic';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = use(searchParams);

  if (!token) redirect('/signin');

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Ubah passwordmu
        </p>

        <ResetPasswordForm />
      </div>
    </>
  );
}
