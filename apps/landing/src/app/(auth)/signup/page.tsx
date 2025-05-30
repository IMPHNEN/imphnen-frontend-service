import { LogoSimple } from '@/app/_components/logo';
import { Metadata } from 'next';
import Link from 'next/link';
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

      <div className="w-full space-y-4">
        <p className="text-muted-foreground px-4 text-center text-xs leading-5 text-balance sm:text-sm">
          Sudah punya akun?{' '}
          <Link
            href="/signin"
            className="font-bold hover:underline hover:underline-offset-4 transition-colors text-primary-500"
          >
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
}
