import * as React from 'react';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';
import { cn } from '@imphnen-frontend-service/utils';

export type TInputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'file'
  | 'date'
  | 'time';
export type TInputSize = 'sm' | 'md' | 'lg';
export type TInputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> & {
  label: string;
  type?: TInputType;
  size?: TInputSize;
  error?: string;
  helperText?: string;
  htmlFor?: string;
  isRequired?: boolean;
};

export const InputField = React.forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    {
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
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = React.useId();
    const fieldId = htmlFor ?? id ?? autoId;
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
          {label}
          {isRequired && <span className="text-destructive">*</span>}
        </Label>
        <Input
          ref={ref}
          id={fieldId}
          placeholder={placeholder}
          type={type}
          size={size}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive/20',
            className
          )}
          {...rest}
        />
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
InputField.displayName = 'InputField';
