import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useConfirmItem, useItem } from '../_hook/use-item';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalEditItem {
  isOpen: boolean;
  onClose: () => void;
  handleEditItem?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalEditItem = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleEditItem,
}: IModalEditItem) => {
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
          handleEditItem={handleEditItem}
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
  };

  const { form, onSubmit } = useItem(nextStep, initialValues);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Edit Item Gacha
        </h2>
        <p className="text-p3 text-neutral-400">
          Silakan mengubah detail dari item yang diperlukan
        </p>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Nama Hadiah"
              type="text"
              name="itemName"
              placeholder="Masukkan Nama Hadiah"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Quantity"
              type="number"
              name="quantity"
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
  handleEditItem?: () => Promise<boolean>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleEditItem, resetStep }: IStepTwoProps) => {
  const { onConfirm, onCancel } = useConfirmItem(
    onClose,
    resetStep,
    handleEditItem,
    {
      success: 'Perubahan item berhasil dilakukan',
      error: 'Perubahan item gagal dilakukan',
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

export default ModalEditItem;
