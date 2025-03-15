import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';
import { cn } from '@imphnen-frontend-service/utils';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

type TPasswordInputType = 'password';
type TPasswordInputSize = 'sm' | 'md' | 'lg';

type TPasswordInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  type?: TPasswordInputType;
  size?: TPasswordInputSize;
  error?: string;
};

const sizeClasses: Record<TPasswordInputSize, string> = {
  sm: 'text-[10px] max-h-[28px]',
  md: 'text-[12px] max-h-[30px]',
  lg: 'text-[15px] max-h-[34px]',
};

const iconSizeClasses: Record<TPasswordInputSize, string> = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[16px]',
};

const disabledClass = 'opacity-50 hover:border-neutral-200 cursor-not-allowed';
const errorClass =
  'border-danger-500 hover:border-danger-500 focus:outline-danger-500';

export const PasswordInput: FC<TPasswordInputProps> = ({
  size = 'md',
  placeholder = 'Placeholder',
  disabled,
  error,
  className,
  ...rest
}): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword((prev) => !prev);
  };

  const mergedClassName = cn(
    'px-[12px] py-[8px] text-neutral-800 placeholder:text-neutral-300 border border-neutral-200 hover:border-blue-300 focus:outline-1 focus:outline-blue-500 rounded-md font-bai-jamjuree',
    sizeClasses[size],
    disabled && disabledClass,
    error && errorClass,
    className
  );

  return (
    <>
      <div
        className={cn(
          'relative inline-flex items-center border border-neutral-200 rounded-md',
          mergedClassName
        )}
      >
        <input
          className="focus:outline-0"
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
        <div className="absolute end-0 px-[12px] h-full flex items-center">
          <Button
            variant="text"
            size={size}
            onClick={togglePasswordVisibility}
            className={cn(
              'relative aspect-square -me-[10px] p-[6px]',
              iconSizeClasses[size],
              disabled && 'cursor-not-allowed'
            )}
          >
            {showPassword ? (
              <EyeInvisibleOutlined
                style={{
                  color: error
                    ? 'var(--color-danger-500)'
                    : 'var(--color-neutral-500)',
                }}
              />
            ) : (
              <EyeOutlined
                style={{
                  color: error
                    ? 'var(--color-danger-500)'
                    : 'var(--color-neutral-500)',
                }}
              />
            )}
          </Button>
        </div>
      </div>
      {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
    </>
  );
};
