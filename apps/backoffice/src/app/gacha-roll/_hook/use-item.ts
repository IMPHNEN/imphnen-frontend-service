import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  gachaRollItemSchema,
  TGachaRollItem
} from '@imphnen-frontend-service/service';

export const useItem = (
  nextStep: () => void,
  initialValues?: TGachaRollItem
) => {
  const form = useForm<TGachaRollItem>({
    resolver: zodResolver(gachaRollItemSchema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Form data:', data);
    nextStep();
  });

  return {
    form,
    onSubmit,
  };
};

export const useConfirmItem = (
  onClose: () => void,
  resetStep: () => void,
  actionFunction?: () => void,
) => {
  const onConfirm = () => {
    actionFunction?.();
    onClose();
    resetStep();
  };

  const onCancel = () => {
    onClose();
    resetStep();
  };

  return {
    onConfirm,
    onCancel,
  };
};
