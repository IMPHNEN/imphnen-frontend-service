import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { cn } from '@imphnen-frontend-service/utils';

type TInputType = 'text' | 'email';
type TInputSize = 'sm' | 'md' | 'lg';

type TInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  type?: TInputType;
  size?: TInputSize;
  error?: string;
};

const sizeClasses: Record<TInputSize, string> = {
  sm: 'text-[10px] max-h-[28px]',
  md: 'text-[12px] max-h-[30px]',
  lg: 'text-[15px] max-h-[34px]',
};

const disabledClass = 'opacity-50 hover:border-neutral-200 cursor-not-allowed';
const errorClass =
  'border-danger-500 hover:border-danger-500 focus:outline-danger-500';

export const Input: FC<TInputProps> = ({
  size = 'md',
  type,
  placeholder = 'Placeholder',
  disabled,
  error,
  className,
  ...rest
}): ReactElement => {
  const mergedClassName = cn(
    'px-[12px] py-[8px] text-neutral-800 placeholder:text-neutral-300 border border-neutral-200 hover:border-blue-300 focus:outline-1 focus:outline-blue-500 rounded-md font-bai-jamjuree',
    sizeClasses[size],
    disabled && disabledClass,
    error && errorClass,
    className
  );

  return (
    <>
      <input
        className={mergedClassName}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
      {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
    </>
  );
};
