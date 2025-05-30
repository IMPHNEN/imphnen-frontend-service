'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-[600] rounded-md px-[16px] py-[10px] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md',
        secondary:
          'bg-white hover:text-primary-600 hover:bg-gray-50 text-primary-500 shadow-md',
        text: 'bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
        bordered:
          'border border-primary-500 hover:border-primary-600 bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
        success: 'bg-success-500 hover:bg-success-600 text-white shadow-md',
        danger: 'bg-danger-100 hover:bg-danger-200 text-danger-500 shadow-md',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
