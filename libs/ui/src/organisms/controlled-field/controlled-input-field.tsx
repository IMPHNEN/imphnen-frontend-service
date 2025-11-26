import {
  InputField,
  TInputFieldProps,
} from '@imphnen-frontend-service/ui/molecules';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type TControlledInputFieldProps<T extends FieldValues> =
  UseControllerProps<T> & TInputFieldProps;

export const ControlledInputField = <T extends FieldValues>(
  props: TControlledInputFieldProps<T>
) => {
  const { field, fieldState } = useController<T>(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value;

    if (props.type === 'number') {
      value = Number(e.target.value);
    } else if (props.type === 'file') {
      value = e.target.files?.[0];
    } else {
      value = e.target.value;
    }
    field.onChange(value);
  };

  const inputProps =
    props.type === 'file'
      ? { ...props, ...field, value: undefined }
      : { ...props, ...field };

  return (
    <InputField
      error={fieldState.error?.message}
      {...inputProps}
      onChange={handleChange}
      isRequired={props.isRequired}
    />
  );
};
