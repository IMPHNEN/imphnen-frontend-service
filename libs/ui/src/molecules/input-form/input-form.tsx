import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { Input } from '../../atoms';
import { cn } from '@imphnen-frontend-service/utils';

type TInputType = 'text' | 'email';
type TInputSize = 'sm' | 'md' | 'lg';

type TInputFormProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  label: string;
  type?: TInputType;
  size?: TInputSize;
  error?: string;
  helperText?: string;
  htmlFor?: string;
};

export const InputForm: FC<TInputFormProps> = ({
  label,
  placeholder,
  type = 'text',
  size = 'md',
  error,
  helperText,
  htmlFor,
  className,
  ...rest
}): ReactElement => {
  return (
    <div className="flex gap-[8px] flex-col">
      <label htmlFor={htmlFor} className="self-start text-p3 font-medium">
        {label}
      </label>
      <Input
        {...(htmlFor && { id: htmlFor })}
        placeholder={placeholder}
        type={type}
        size={size}
        className={cn(
          error &&
            'border-danger-500 hover:border-danger-500 focus:outline-danger-500',
          className
        )}
        {...rest}
      />
      {error ? (
        <p className="text-danger-500 text-xs mt-1">{error}</p>
      ) : (
        helperText && (
          <p className="text-neutral-500 text-xs mt-1">{helperText}</p>
        )
      )}
    </div>
  );
};

export default InputForm;
