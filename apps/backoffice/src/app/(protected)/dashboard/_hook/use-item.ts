import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  gachaItemSchema,
  TGachaItem
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

export const useItem = (
  nextStep: () => void,
  initialValues?: TGachaItem
) => {
  const form = useForm<TGachaItem>({
    resolver: zodResolver(gachaItemSchema),
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
  actionFunction?: () => Promise<boolean>,
  messages?: {
    success?: string;
    error?: string;
  }
) => {
  const onConfirm = async () => {
    try {
      toast.success(messages?.success);
      onClose();
      resetStep();
    } catch (error) {
      console.log(error);
      toast.error(messages?.error);
    }
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
