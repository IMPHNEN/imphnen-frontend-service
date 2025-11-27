import { cn } from '@imphnen-frontend-service/utils';
import {
  DetailedHTMLProps,
  FC,
  ReactElement,
  TextareaHTMLAttributes,
} from 'react';

type TTextareaSize = 'sm' | 'md' | 'lg';

type TTextareaProps = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'size'
> & {
  size?: TTextareaSize;
  error?: string;
};

const sizeClasses: Record<TTextareaSize, string> = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[15px]',
};

const disabledClass = 'opacity-50 hover:border-neutral-200 cursor-not-allowed';
const errorClass =
  'border-danger-500 hover:border-danger-500 focus:outline-danger-500';

export const Textarea: FC<TTextareaProps> = ({
  size = 'md',
  placeholder = 'Placeholder',
  disabled,
  error,
  className,
  ...rest
}): ReactElement => {
  const mergedClassName = cn(
    'rounded-md border border-neutral-200 dark:border-neutral-600 hover:border-blue-300 dark:hover:border-blue-500 focus:outline-1 focus:outline-blue-500 dark:focus:outline-primary-500 px-[12px] py-[8px] bg-white dark:bg-gray-800 text-neutral-800 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-500 invalid:border-danger-500 invalid:text-danger-500',
    sizeClasses[size],
    disabled && disabledClass,
    error && errorClass,
    className
  );
  return (
    <>
      <textarea
        className={mergedClassName}
        placeholder={placeholder}
        disabled={disabled}
        style={{ resize: disabled ? 'none' : 'both' }}
        {...rest}
      ></textarea>
      {error && <p className="text-danger-500 text-xs">{error}</p>}
    </>
  );
};
