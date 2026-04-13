import * as React from 'react';
import { cn } from '@imphnen-frontend-service/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-neutral-100', className)}
      {...props}
    />
  );
}

export { Skeleton };
