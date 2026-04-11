import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalUpdateTestimonial {
  isOpen: boolean;
  onClose: () => void;
  handleUpdate?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  initialValues?: {
    role?: string;
    content?: string;
  };
  onDataCapture?: (data: any) => void;
}

const ModalUpdateTestimonial = ({
  isOpen,
  onClose,
  resetStep,
  handleUpdate,
  initialValues,
  onDataCapture,
}: IModalUpdateTestimonial) => {
  const form = useForm<any>({
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
      toast.success('Perubahan testimonial berhasil dilakukan');
      onClose();
      resetStep();
    } catch (error) {
      console.log(error);
      toast.error('Perubahan testimonial gagal dilakukan');
    }
  });

  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-0 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Update Testimonial
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Role"
              name="role"
              type="text"
              placeholder="Masukkan Role"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Konten Testimonial"
              name="content"
              type="text"
              placeholder="Masukkan Konten Testimonial"
              size="lg"
              className="w-full"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            type="submit"
          >
            Update Testimonial
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdateTestimonial;
