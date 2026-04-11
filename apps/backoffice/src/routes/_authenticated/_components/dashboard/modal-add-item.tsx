import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useConfirmItem, useItem } from '../_hook/use-item';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalAddItem {
  isOpen: boolean;
  onClose: () => void;
  handleAddItem?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  onDataCapture?: (data: any) => void;
}

const ModalAddItem = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAddItem,
  onDataCapture,
}: IModalAddItem) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
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
          handleAddItem={handleAddItem}
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
          Tambah Item Gacha
        </h2>
        <p className="text-p3 text-neutral-400">
          Lengkapi detail di bawah ini untuk menambahkan item gacha
        </p>
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Nama Hadiah"
              name="itemName"
              type="text"
              placeholder="Masukkan Nama Hadiah"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              placeholder="Masukkan Kuantitas Item"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Foto Barang"
              type="file"
              name="foto"
              placeholder=".jpg, .jpeg, atau .png"
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
            Tambahkan Item
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleAddItem?: () => Promise<boolean>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleAddItem, resetStep }: IStepTwoProps) => {
  const { onConfirm, onCancel } = useConfirmItem(
    onClose,
    resetStep,
    handleAddItem,
    {
      success: 'Item ditambahkan ke gacha item',
      error: 'Item gagal ditambahkan ke gacha item',
    }
  );

  return (
    <>
      <Modal.Header className="mb-0 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Item
        </h2>
        <p className="text-p3 text-neutral-400">
          Apakah kamu yakin ingin
          <br /> menambahkan item ini?
        </p>
      </Modal.Header>
      <Modal.Content className="flex gap-4">
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

export default ModalAddItem;
