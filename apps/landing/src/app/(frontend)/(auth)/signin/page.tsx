import { Metadata } from 'next';
import Link from 'next/link';
import { LogoSimple } from '../../_components/logo';
import { SigninForm } from './_components/signin-form';

export const metadata: Metadata = {
  title: 'IMPHNEN - Signin',
  description:
    'Komunitas Ingin Menjadi Programmer Handal Namung Enggan Ngonding',
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Masuk untuk mengakses akunmu
        </p>
      </div>

      <SigninForm />

      <div className="w-full space-y-4">
        <p className="text-muted-foreground px-4 text-center text-xs leading-5 text-balance sm:text-sm">
          Belum punya akun?{' '}
          <Link
            href="/signup"
            className="text-[#22a5f1] font-bold hover:underline hover:underline-offset-4 transition-colors"
          >
            Daftar
          </Link>
        </p>
      </div>
    </>
  );
}
