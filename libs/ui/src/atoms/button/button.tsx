import { cva, type VariantProps } from 'class-variance-authority';
import {
  FC,
  ReactElement,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import { cn } from '@imphnen-frontend-service/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-[600] rounded-md px-[16px] py-[10px] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md',
        secondary:
          'bg-white hover:text-primary-600 hover:bg-gray-50 text-primary-500 shadow-md border',
        text: 'bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
        bordered:
          'border border-primary-500 hover:border-primary-600 bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
        success: 'bg-success-500 hover:bg-success-600 text-white shadow-md',
        danger:
          'bg-danger-100 hover:bg-danger-200 text-danger-500 shadow-md',
      },
      size: {
        sm: 'text-[12px] max-h-[36px]',
        md: 'text-[15px] max-h-[40px]',
        lg: 'text-[16px] h-[42px] px-[24px]',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type TButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants>;

export const Button: FC<TButtonProps> = ({
  variant,
  size,
  disabled,
  className,
  children,
  ...rest
}): ReactElement => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
