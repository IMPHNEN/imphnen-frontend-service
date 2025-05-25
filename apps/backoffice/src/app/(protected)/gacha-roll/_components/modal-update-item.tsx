import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useConfirmItem, useItem } from '../_hook/use-item';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalUpdateItem {
  isOpen: boolean;
  onClose: () => void;
  handleUpdateItem?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalUpdateItem = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleUpdateItem,
}: IModalUpdateItem) => {
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
      {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} />}
      {currentStep === 2 && (
        <StepTwo
          onClose={onClose}
          handleUpdateItem={handleUpdateItem}
          resetStep={resetStep}
        />
      )}
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
}

const StepOne = ({ nextStep }: IStepOneProps) => {
  const initialValues = {
    itemName: 'Hoodie IMPHNEN Official 2025',
    quantity: 10,
    chanceRate: 0.1,
  };

  const { form, onSubmit } = useItem(nextStep, initialValues);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Update Item Roll Gacha
        </h2>
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Pilih Item"
              name="itemName"
              type="text"
              placeholder="Pilih item yang dimasukkan ke roll"
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
              label="Chance Rate"
              name="chanceRate"
              type="number"
              value={0.1}
              min={0.1}
              step={0.1}
              max={1}
              placeholder="Masukkan Chance Rate (0,1 - 1)"
              size="lg"
              className="w-full"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={nextStep}
          >
            Perbarui Item
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleUpdateItem?: () => Promise<boolean>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleUpdateItem, resetStep }: IStepTwoProps) => {
  const { onConfirm, onCancel } = useConfirmItem(
    onClose,
    resetStep,
    handleUpdateItem,
    {
      success: 'Perubahan item roll berhasil dilakukan',
      error: 'Perubahan item roll gagal dilakukan',
    }
  );

  return (
    <>
      <Modal.Header className="mb-0 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Update Item
        </h2>
        <p className="text-p3 text-neutral-400">
          Apakah kamu yakin dengan
          <br /> perubahan yang dilakukan?
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
          Update
        </Button>
      </Modal.Content>
    </>
  );
};

export default ModalUpdateItem;
