import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { Input } from '../../atoms';
import { cn } from '@imphnen-frontend-service/utils';

export type TInputType = 'text' | 'email' | 'number' | 'password' | 'file';
export type TInputSize = 'sm' | 'md' | 'lg';
export type TInputFieldProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  label: string;
  type?: TInputType;
  size?: TInputSize;
  error?: string;
  disabled?: boolean;
  helperText?: string;
  htmlFor?: string;
  isRequired?: boolean;
};

const sizeClasses: Record<TInputSize, { label: string; helperText: string }> = {
  lg: {
    label: 'text-label1 font-medium leading-tight',
    helperText: 'text-label3 font-normal leading-tight',
  },
  md: {
    label: 'text-p3 font-medium leading-6',
    helperText: 'text-label3 font-normal leading-tight',
  },
  sm: {
    label: 'text-label3 font-medium leading-snug',
    helperText: 'text-label2 font-normal leading-tight',
  },
};

export const InputField: FC<TInputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  size = 'md',
  error,
  helperText,
  htmlFor,
  className,
  disabled,
  isRequired = false,
  ...rest
}): ReactElement => {
  return (
    <div className="flex gap-[8px] flex-col">
      <label
        htmlFor={htmlFor}
        className={cn(
          'items-start justify-item-start text-start text-neutral-800',
          sizeClasses[size].label
        )}
      >
        {label} {isRequired ? <span className="text-danger-500">*</span> : null}
      </label>
      <Input
        {...(htmlFor && { id: htmlFor })}
        placeholder={placeholder}
        type={type}
        size={size}
        disabled={disabled}
        className={cn(
          error &&
            'border-danger-500 hover:border-danger-500 focus:outline-danger-500',
          className,
          disabled && 'opacity-50 cursor-not-allowed',
          'focus:outline-primary-500 hover:border-primary-200'
        )}
        {...rest}
      />
      {error ? (
        <p className="text-danger-500 text-label3 text-left leading-tight">{error}</p>
      ) : (
        helperText && (
          <p
            className={cn(
              'text-neutral-800 text-left',
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
