import {
  FC,
  ReactElement,
  SelectHTMLAttributes,
} from 'react';
import { cn } from '@imphnen-frontend-service/utils';

type TSelectSize = 'sm' | 'md' | 'lg';
type Width = 'standard' | 'custom';

type TSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> & {
  size?: TSelectSize;
  widthform?: Width;
  disabled?: boolean;
};

const sizeClasses: Record<TSelectSize, string> = {
  sm: 'text-[10px] max-h-[34px]',
  md: 'text-[12px] max-h-[36px]',
  lg: 'text-[15px] max-h-[38px]',
};

const disabledClass =
  'opacity-50 hover:border-neutral-200 cursor-not-allowed';

export const Select: FC<TSelectProps> = ({
  size = 'md',
  widthform = 'standard',
  disabled,
  className,
  children,
  ...rest
}): ReactElement => {
  const mergedClassName = cn(
    `appearance-none px-[12px] py-[8px] text-neutral-800 bg-white placeholder:text-neutral-300 border border-neutral-200 hover:border-blue-300 focus:outline-1 focus:outline-blue-500 rounded-md`,
    sizeClasses[size],
    widthform === 'standard' && 'min-w-70',
    disabled && disabledClass,
    className
  );

  return (
    <select className={mergedClassName} disabled={disabled} {...rest}>
      {children}
    </select>
  );
};
