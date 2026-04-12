'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@imphnen-frontend-service/utils';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white shadow-sm hover:bg-primary-600 active:bg-primary-700',
        secondary:
          'border border-neutral-200 bg-white text-primary-500 shadow-sm hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200',
        text: 'bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-600',
        bordered:
          'border border-primary-500 bg-transparent text-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600',
        success:
          'bg-success-500 text-white shadow-sm hover:bg-success-600 active:bg-success-700',
        danger:
          'bg-danger-100 text-danger-600 shadow-sm hover:bg-danger-200 hover:text-danger-700',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
