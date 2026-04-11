import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalUpdateEvent {
  isOpen: boolean;
  onClose: () => void;
  handleUpdate?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  initialValues?: {
    name?: string;
    description?: string;
    detail_link?: string;
    location?: string;
    price?: number;
    start_date?: string;
    end_date?: string;
    is_online?: boolean;
  };
  onDataCapture?: (data: any) => void;
}

const ModalUpdateEvent = ({
  isOpen,
  onClose,
  resetStep,
  handleUpdate,
  initialValues,
  onDataCapture,
}: IModalUpdateEvent) => {
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
      toast.success('Perubahan event berhasil dilakukan');
      onClose();
      resetStep();
    } catch (error) {
      console.log(error);
      toast.error('Perubahan event gagal dilakukan');
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
          Update Event
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Nama Event"
              name="name"
              type="text"
              placeholder="Masukkan Nama Event"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Deskripsi"
              name="description"
              type="text"
              placeholder="Masukkan Deskripsi Event"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Link Detail"
              name="detail_link"
              type="text"
              placeholder="Masukkan Link Detail"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Lokasi"
              name="location"
              type="text"
              placeholder="Masukkan Lokasi"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Harga"
              name="price"
              type="number"
              placeholder="Masukkan Harga"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Tanggal Mulai"
              name="start_date"
              type="date"
              placeholder="Pilih Tanggal Mulai"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Tanggal Selesai"
              name="end_date"
              type="date"
              placeholder="Pilih Tanggal Selesai"
              size="lg"
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_online_update"
                className="rounded"
                {...form.register('is_online')}
              />
              <label htmlFor="is_online_update" className="text-p3 font-medium text-neutral-800">
                Event Online
              </label>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            type="submit"
          >
            Update Event
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdateEvent;
