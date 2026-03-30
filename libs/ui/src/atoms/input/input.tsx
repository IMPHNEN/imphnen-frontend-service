'use client';

import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { cn } from '@imphnen-frontend-service/utils';
import { Button } from '../button';

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
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  type?: TInputType;
  size?: TInputSize;
  widthform?: Width;
  disabled?: boolean;
};

const sizeClasses: Record<TInputSize, { textSize: string; iconSize: string }> =
  {
    sm: { textSize: 'text-[10px] h-[28px]', iconSize: 'text-[10px]' },
    md: { textSize: 'text-[12px] h-[30px]', iconSize: 'text-[12px]' },
    lg: { textSize: 'text-[15px] h-[34px]', iconSize: 'text-[15px]' },
  };

const disabledClass = 'opacity-50 hover:border-neutral-200 cursor-not-allowed';

export const Input: FC<TInputProps> = ({
  type = 'text',
  size = 'md',
  placeholder = 'Placeholder',
  widthform = 'standard',
  disabled,
  className,
  ...rest
}): ReactElement => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) setShowPassword((prev) => !prev);
  };

  const mergedClassName = cn(
    `px-[12px] py-[8px] text-neutral-800 dark:text-white bg-white dark:bg-gray-800 placeholder:text-neutral-300 dark:placeholder:text-neutral-500 border border-neutral-200 dark:border-neutral-600 hover:border-blue-300 dark:hover:border-blue-500 focus:outline-1 focus:outline-blue-500 dark:focus:outline-primary-500 rounded-md font-bai-jamjuree w-full ${
      widthform === 'standard' ? 'min-w-70' : ''
    }`,
    sizeClasses[size].textSize,
    disabled && disabledClass,
    className
  );

  return (
    <div className="relative flex items-center">
      <input
        className={mergedClassName}
        type={type === 'password' && showPassword ? 'text' : type}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
      {type === 'password' && (
        <div className="absolute end-0 px-3 h-full flex items-center">
          <Button
            type="button"
            variant="text"
            size={size}
            onClick={togglePasswordVisibility}
            className={cn(
              'relative aspect-square -me-2 p-1.5',
              sizeClasses[size].iconSize,
              disabled && 'cursor-not-allowed'
            )}
          >
            {showPassword ? (
              <EyeInvisibleOutlined
                style={{ color: 'var(--color-neutral-500)' }}
              />
            ) : (
              <EyeOutlined style={{ color: 'var(--color-neutral-500)' }} />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
