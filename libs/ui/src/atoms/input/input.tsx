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

type TInputType = 'text' | 'email' | 'password';
type TInputSize = 'sm' | 'md' | 'lg';

type TInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  type?: TInputType;
  size?: TInputSize;
  disabled?: boolean;
};

const sizeClasses: Record<TInputSize, { textSize: string; iconSize: string }> =
  {
    sm: { textSize: 'text-[10px] max-h-[28px]', iconSize: 'text-[10px]' },
    md: { textSize: 'text-[12px] max-h-[30px]', iconSize: 'text-[12px]' },
    lg: { textSize: 'text-[15px] max-h-[34px]', iconSize: 'text-[15px]' },
  };

const disabledClass = 'opacity-50 hover:border-neutral-200 cursor-not-allowed';

export const Input: FC<TInputProps> = ({
  type = 'text',
  size = 'md',
  placeholder = 'Placeholder',
  disabled,
  className,
  ...rest
}): ReactElement => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword((prev) => !prev);
  };

  const mergedClassName = cn(
    'px-[12px] py-[8px] text-neutral-800 placeholder:text-neutral-300 border border-neutral-200 hover:border-blue-300 focus:outline-1 focus:outline-blue-500 rounded-md font-bai-jamjuree w-full',
    sizeClasses[size].textSize,
    disabled && disabledClass,
    className
  );

  return (
    <div className="relative inline-flex min-w-70 items-center">
      <input
        className={mergedClassName}
        type={type === 'password' && showPassword ? 'text' : type}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
      {type === 'password' && (
        <div className="absolute end-0 px-[12px] h-full flex items-center">
          <Button
            variant="text"
            size={size}
            onClick={togglePasswordVisibility}
            className={cn(
              'relative aspect-square -me-[8px] p-[6px]',
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
