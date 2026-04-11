import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { useItem, useConfirmItem } from '../../_hooks/cms-events/use-item';

interface IModalAddEvent {
  isOpen: boolean;
  onClose: () => void;
  handleAdd?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  onDataCapture?: (data: any) => void;
}

const ModalAddEvent = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAdd,
  onDataCapture,
}: IModalAddEvent) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-0 text-center"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetStep();
      }}
      disableEscapeKeyDown={true}
    >
      {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} onDataCapture={onDataCapture} />}
      {currentStep === 2 && (
        <StepTwo
          onClose={onClose}
          handleAdd={handleAdd}
          resetStep={resetStep}
        />
      )}
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
  onDataCapture?: (data: any) => void;
}

const StepOne = ({ nextStep, onDataCapture }: IStepOneProps) => {
  const { form, onSubmit } = useItem(nextStep, undefined, onDataCapture);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Event
        </h2>
      </Modal.Header>
      <Modal.Content>
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
                id="is_online"
                className="rounded"
                {...form.register('is_online')}
              />
              <label htmlFor="is_online" className="text-p3 font-medium text-neutral-800">
                Event Online
              </label>
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit">
            Tambah Event
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleAdd?: () => Promise<boolean>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleAdd, resetStep }: IStepTwoProps) => {
  const { onConfirm, onCancel } = useConfirmItem(
    onClose,
    resetStep,
    handleAdd,
    {
      success: 'Data event berhasil ditambahkan',
      error: 'Data event gagal ditambahkan',
    }
  );

  return (
    <>
      <Modal.Header className="mb-10 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Event
        </h2>
        <p className="text-p3 text-center text-neutral-400">
          Apakah kamu yakin ingin
          <br /> menambahkan event ini?
        </p>
      </Modal.Header>
      <Modal.Content className="flex mb-0 gap-4">
        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          onClick={onCancel}
        >
          Batal
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onConfirm}
        >
          Tambahkan
        </Button>
      </Modal.Content>
    </>
  );
};

export default ModalAddEvent;
