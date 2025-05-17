'use client';

import { Button } from '@components/atoms';
import { useRouter } from 'next/navigation';
import { TbLocationFilled } from 'react-icons/tb';

export function ButtonJoinCommunity() {
  const router = useRouter();

  return (
    <Button
      variant="default"
      size="lg"
      className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 font-bold text-white hover:text-white/90 shadow-lg"
      onClick={() => router.push('#community')}
    >
      <TbLocationFilled className="size-6" />
      Gabung Komunitas
    </Button>
  );
}
