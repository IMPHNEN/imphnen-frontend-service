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
          'bg-white dark:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary-500 dark:text-primary-400 shadow-md dark:shadow-gray-900/50 border dark:border-gray-700',
        text: 'bg-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-primary-500 dark:text-primary-400',
        bordered:
          'border border-primary-500 dark:border-primary-400 hover:border-primary-600 dark:hover:border-primary-300 bg-transparent hover:text-primary-600 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-primary-500 dark:text-primary-400',
        success: 'bg-success-500 hover:bg-success-600 text-white shadow-md',
        danger:
          'bg-danger-100 dark:bg-danger-500/20 hover:bg-danger-200 dark:hover:bg-danger-500/30 text-danger-500 shadow-md dark:shadow-gray-900/50',
      },
      size: {
        sm: 'text-[12px] max-h-[36px]',
        md: 'text-[15px] max-h-[40px]',
        lg: 'text-[19px] max-h-[44px]',
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
