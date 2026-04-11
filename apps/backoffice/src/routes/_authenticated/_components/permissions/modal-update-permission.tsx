import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalUpdatePermission {
  isOpen: boolean;
  onClose: () => void;
  handleUpdate?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  initialValues?: { name?: string };
  onDataCapture?: (data: any) => void;
}

const ModalUpdatePermission = ({
  isOpen,
  onClose,
  resetStep,
  handleUpdate,
  initialValues,
  onDataCapture,
}: IModalUpdatePermission) => {
  const form = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValues);
    }
  }, [isOpen, initialValues]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      onDataCapture?.(data);
      if (handleUpdate) await handleUpdate();
      toast.success('Perubahan permissions berhasil dilakukan');
      onClose();
      resetStep();
    } catch (error) {
      console.log(error);
      toast.error('Perubahan permissions gagal dilakukan');
    }
  });

  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-3 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500">
          Update Permissions
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <ControlledInputField
            control={form.control}
            label="Name"
            name="name"
            type="text"
            placeholder="Nama Permission"
            size="lg"
            className="w-full"
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            type="submit"
          >
            Update Permission
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdatePermission;
