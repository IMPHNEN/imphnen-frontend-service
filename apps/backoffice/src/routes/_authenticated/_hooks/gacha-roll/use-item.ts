import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  gachaRollItemSchema,
  TGachaRollItem
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

export const useItem = (
  nextStep: () => void,
  initialValues?: Partial<TGachaRollItem>,
  onDataCapture?: (data: any) => void,
) => {
  const form = useForm<any>({
    resolver: zodResolver(gachaRollItemSchema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    onDataCapture?.(data);
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
      if (actionFunction) {
        await actionFunction();
      }
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
