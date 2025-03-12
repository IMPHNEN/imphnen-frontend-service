import {
  FC,
  ReactElement,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import { cn } from '@imphnen-frontend-service/utils';

type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'text'
  | 'bordered';
type TButtonSize = 'sm' | 'md' | 'lg';

type TButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: TButtonVariant;
  size?: TButtonSize;
};

const variantClasses: Record<TButtonVariant, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md',
  secondary:
    'bg-white hover:text-primary-600 hover:bg-gray-50 text-primary-500 shadow-md',
  text: 'bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
  bordered:
    'border border-primary-500 hover:border-primary-600 bg-transparent hover:text-primary-600 hover:bg-gray-50 text-primary-500',
  success: 'bg-success-500 hover:bg-success-600 text-white shadow-md',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white shadow-md',
};

const sizeClasses: Record<TButtonSize, string> = {
  sm: 'text-[12px] max-h-[36px]',
  md: 'text-[15px] max-h-[40px]',
  lg: 'text-[19px] max-h-[44px]',
};

const disabledClass = 'opacity-50 cursor-not-allowed';

export const Button: FC<TButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled,
  className,
  children,
  ...rest
}): ReactElement => {
  const mergedClassName = cn(
    'inline-flex items-center justify-center font-[600] rounded-lg px-[16px] py-[10px]',
    'transition-colors duration-200 cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    disabled && disabledClass,
    className
  );

  return (
    <button className={mergedClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
