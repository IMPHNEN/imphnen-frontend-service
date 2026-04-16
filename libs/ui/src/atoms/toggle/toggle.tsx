'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@imphnen-frontend-service/utils';

/* Radix-backed Switch primitive */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-2xl cursor-pointer shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative',
      'data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-200',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 bg-white rounded-2xl shadow-lg ring-0 transition-transform absolute left-[2px] top-[2px]',
        'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';

/* Backward-compat ToggleInput: label + switch row */
export type ToggleInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'checked' | 'defaultChecked'
> & {
  label?: string;
  labelClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  className,
  labelClassName,
  checked,
  defaultChecked,
  onChange,
  disabled,
  id,
  ...rest
}) => {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  return (
    <div
      className={cn('flex items-center justify-between gap-4 py-2', className)}
    >
      {label && (
        <label
          htmlFor={fieldId}
          className={cn(
            'text-sm font-medium text-foreground cursor-pointer select-none',
            disabled && 'opacity-50 cursor-not-allowed',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <Switch
        id={fieldId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        disabled={disabled}
        {...(rest as React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>)}
      />
    </div>
  );
};

export { Switch };
