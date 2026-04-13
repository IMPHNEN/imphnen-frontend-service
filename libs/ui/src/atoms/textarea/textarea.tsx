'use client';

import * as React from 'react';
import { cn } from '@imphnen-frontend-service/utils';

type TTextareaSize = 'sm' | 'md' | 'lg';

type TTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> & {
  size?: TTextareaSize;
  error?: string;
};

const sizeClasses: Record<TTextareaSize, string> = {
  sm: 'text-xs min-h-[60px]',
  md: 'text-sm min-h-[72px]',
  lg: 'text-base min-h-[96px]',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ size = 'md', placeholder, disabled, error, className, ...rest }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          data-slot="textarea"
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={cn(
            'flex w-full rounded-md border border-input bg-background px-3 py-2 font-bai-jamjuree text-foreground shadow-xs transition-colors',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:resize-none',
            'resize-y',
            sizeClasses[size],
            className
          )}
          {...rest}
        />
        {error && (
          <p className="mt-1 text-xs text-destructive" data-slot="textarea-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
