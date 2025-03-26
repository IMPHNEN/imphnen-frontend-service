import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { Input } from '../../atoms';

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
};

export const InputForm: FC<TInputFormProps> = ({
  label,
  placeholder,
  type = 'text',
  size = 'md',
  error,
  ...rest
}): ReactElement => {
  return (
    <div className="flex gap-[8px] flex-col">
      <div className="self-start text-p3 font-medium">{label}</div>
      <Input
        placeholder={placeholder}
        type={type}
        size={size}
        error={error}
        {...rest}
      />
    </div>
  );
};

export default InputForm;
