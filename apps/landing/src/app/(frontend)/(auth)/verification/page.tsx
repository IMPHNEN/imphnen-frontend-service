import { LogoSimple } from '../../_components/logo';
import { VerifyEmailForm } from './_components/verify-email-form';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Verifikasi akun mu sekarang
        </p>
      </div>

      <VerifyEmailForm />
    </>
  );
}
