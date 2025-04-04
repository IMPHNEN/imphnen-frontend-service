import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addItemSchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  chanceRate: z
    .string()
    .min(1, 'Chance rate is required')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return num >= 0.1 && num <= 1;
      },
      { message: 'Chance rate must be between 0.1 and 1' }
    ),
});

type TAddItemForm = z.infer<typeof addItemSchema>;

export const useAddItem = (nextStep: () => void) => {
  const form = useForm<TAddItemForm>({
    resolver: zodResolver(addItemSchema),
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
