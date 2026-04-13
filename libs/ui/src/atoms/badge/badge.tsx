'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@imphnen-frontend-service/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap transition-colors overflow-hidden [&>svg]:size-3 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-500 text-white',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-700',
        success:
          'border-transparent bg-success-100 text-success-700',
        warning:
          'border-transparent bg-warning-100 text-warning-800',
        info:
          'border-transparent bg-info-100 text-info-700',
        destructive:
          'border-transparent bg-danger-100 text-danger-700',
        outline:
          'border-neutral-200 bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
