'use client';

import * as React from 'react';
import { cn } from '@imphnen-frontend-service/utils';

type SegmentedSwitchOption = {
  value: string;
  label: string;
};

type SegmentedSwitchProps = {
  value: string;
  onChange: (nextValue: string) => void;
  options: [SegmentedSwitchOption, SegmentedSwitchOption];
  className?: string;
};

export function SegmentedSwitch({
  value,
  onChange,
  options,
  className,
}: SegmentedSwitchProps) {
  const [leftOption, rightOption] = options;
  const isRightActive = value === rightOption.value;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isRightActive}
      aria-label={`Toggle ${leftOption.label} or ${rightOption.label}`}
      onClick={() => onChange(isRightActive ? leftOption.value : rightOption.value)}
      className={cn(
        'relative inline-grid h-9 w-50 grid-cols-2 items-center rounded-sm border border-primary-100 bg-primary-100 p-1 shadow-sm',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-1 top-1 h-7 w-24 rounded-sm bg-white transition-transform duration-200',
          isRightActive && 'translate-x-24'
        )}
      />
      <span
        className={cn(
          'relative z-10 text-xs font-semibold',
          isRightActive ? 'text-primary-500/80' : 'text-primary-500'
        )}
      >
        {leftOption.label}
      </span>
      <span
        className={cn(
          'relative z-10 text-xs font-semibold',
          isRightActive ? 'text-primary-500' : 'text-primary-500/80'
        )}
      >
        {rightOption.label}
      </span>
    </button>
  );
}
