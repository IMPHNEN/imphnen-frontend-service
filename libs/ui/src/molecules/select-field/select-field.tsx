import * as React from 'react';
import { NativeSelect } from '../../atoms/select';
import { Label } from '../../atoms/label';
import { cn } from '@imphnen-frontend-service/utils';

export type TSelectSize = 'sm' | 'md' | 'lg';

export type TSelectFieldProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> & {
  label: string;
  size?: TSelectSize;
  error?: string;
  helperText?: string;
  htmlFor?: string;
};

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  TSelectFieldProps
>(
  (
    {
      label,
      size = 'md',
      error,
      helperText,
      htmlFor,
      className,
      disabled,
      id,
      children,
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
        </Label>
        <NativeSelect
          ref={ref}
          id={fieldId}
          size={size}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive/20',
            className
          )}
          {...rest}
        >
          {children}
        </NativeSelect>
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
SelectField.displayName = 'SelectField';
