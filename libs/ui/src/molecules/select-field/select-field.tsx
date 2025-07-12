import {
  FC,
  ReactElement,
  SelectHTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import { Select } from '../../atoms'; // Custom select atom kamu
import { cn } from '@imphnen-frontend-service/utils';

export type TSelectSize = 'sm' | 'md' | 'lg';

export type TSelectFieldProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'size'
> & {
  label: string;
  size?: TSelectSize;
  error?: string;
  helperText?: string;
  htmlFor?: string;
  disabled?: boolean;
};

const sizeClasses: Record<TSelectSize, { label: string; helperText: string }> = {
  lg: {
    label: 'text-p3 font-medium',
    helperText: 'text-label3 font-normal',
  },
  md: {
    label: 'text-label1 font-medium',
    helperText: 'text-label2 font-normal',
  },
  sm: {
    label: 'text-label2 font-medium',
    helperText: 'text-label2 font-normal',
  },
};

export const SelectField: FC<TSelectFieldProps> = ({
  label,
  size = 'md',
  error,
  helperText,
  htmlFor,
  disabled,
  className,
  children,
  ...rest
}): ReactElement => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor={htmlFor}
        className={cn(
          'items-start justify-item-start text-start !text-neutral-800',
          sizeClasses[size].label
        )}
      >
        {label}
      </label>

      <Select
        {...(htmlFor && { id: htmlFor })}
        size={size}
        disabled={disabled}
        className={cn(
          error &&
            'border-danger-500 hover:border-danger-500 focus:outline-danger-500',
          className,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        {...rest}
      >
        {children}
      </Select>

      {error ? (
        <p className="text-danger-500 text-label1 text-left">{error}</p>
      ) : (
        helperText && (
          <p
            className={cn(
              'text-label2 text-left',
              sizeClasses[size].helperText
            )}
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
};
