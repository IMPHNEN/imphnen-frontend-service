import { buttonVariants } from '@components/atoms';
import { cn } from '@utils/ui';
import Link from 'next/link';

export function ButtonSignup() {
  return (
    <Link
      href="/signup"
      className={cn(buttonVariants({ variant: 'outline' }), 'hidden lg:flex')}
    >
      Daftar
    </Link>
  );
}
