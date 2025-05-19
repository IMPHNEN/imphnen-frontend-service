import { buttonVariants } from '@components/atoms';
import { cn } from '@utils/ui';
import Link from 'next/link';

export function ButtonSignin() {
  return (
    <Link href="/signin" className={cn(buttonVariants(), 'hidden lg:flex')}>
      Masuk
    </Link>
  );
}
