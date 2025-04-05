import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  gachaRollItemSchema,
  TGachaRollItem
} from '@imphnen-frontend-service/service';

export const useAddItem = (nextStep: () => void) => {
  const form = useForm<TGachaRollItem>({
    resolver: zodResolver(gachaRollItemSchema),
    mode: 'all',
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

export const useConfirmAddItem = (
  onClose: () => void,
  resetStep: () => void,
  handleAddItem?: () => void,
) => {
  const onConfirm = () => {
    handleAddItem?.();
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
