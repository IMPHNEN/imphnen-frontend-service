import { LogoSimple } from '../../_components/logo';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <LogoSimple />

        <p className="text-muted-foreground text-center text-sm sm:text-base">
          Buat akunmu sekarang
        </p>
      </div>
    </>
  );
}
