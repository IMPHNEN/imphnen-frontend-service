import { LogoSimple } from '@/app/_components/logo';
import { Metadata } from 'next';
import { SignupForm } from './_components/signup-form';

export const metadata: Metadata = {
  title: 'IMPHNEN - Signup',
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Buat akunmu sekarang
        </p>
      </div>

      <SignupForm />
    </>
  );
}
