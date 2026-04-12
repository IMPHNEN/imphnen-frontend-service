'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@imphnen-frontend-service/utils';

type TInputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'file'
  | 'date'
  | 'time';
type TInputSize = 'sm' | 'md' | 'lg';
type Width = 'standard' | 'custom';

type TInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> & {
  type?: TInputType;
  size?: TInputSize;
  widthform?: Width;
};

const sizeClasses: Record<TInputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-11 text-base',
};

export const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      type = 'text',
      size = 'md',
      placeholder,
      widthform = 'standard',
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = (e: React.MouseEvent) => {
      e.preventDefault();
      if (!disabled) setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative flex items-center w-full">
        <input
          ref={ref}
          data-slot="input"
          type={type === 'password' && showPassword ? 'text' : type}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'flex w-full rounded-md border border-input bg-background px-3 py-1 font-bai-jamjuree text-foreground shadow-xs transition-colors',
            'placeholder:text-muted-foreground',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            type === 'password' && 'pr-9',
            widthform === 'standard' && 'min-w-0',
            className
          )}
          {...rest}
        />
        {type === 'password' && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
