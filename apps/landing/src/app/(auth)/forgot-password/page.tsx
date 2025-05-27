import { LogoSimple } from '@/app/_components/logo';
import { Metadata } from 'next';
import { ForgotPasswordForm } from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'IMPHNEN - Signin',
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Reset password akunmu
        </p>

        <ForgotPasswordForm />
      </div>
    </>
  );
}
