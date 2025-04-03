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
  return (
    <InputField error={fieldState.error?.message} {...{ ...props, ...field }} />
  );
};
