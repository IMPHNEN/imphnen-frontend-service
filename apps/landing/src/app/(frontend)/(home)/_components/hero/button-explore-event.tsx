'use client';

import { Button } from '@components/atoms';
import { useRouter } from 'next/navigation';
import { TbCalendarStar } from 'react-icons/tb';

export function ButtonExploreEvent() {
  const router = useRouter();

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full sm:w-auto group relative overflow-hidden border-primary flex items-center justify-center gap-2"
      onClick={() => router.push('/events')}
    >
      <TbCalendarStar className="size-7" />
      <span className="relative">Explore Event</span>
    </Button>
  );
}
