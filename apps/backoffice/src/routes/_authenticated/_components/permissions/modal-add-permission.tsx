import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { useItem, useConfirmItem } from '../_hook/use-item';

interface IModalAddPermission {
  isOpen: boolean;
  onClose: () => void;
  handleAddItem?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  onDataCapture?: (data: any) => void;
}

const ModalAddPermission = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAddItem,
  onDataCapture,
}: IModalAddPermission) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-3 text-center"
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
        <h2 className="text-p1 font-semibold text-primary-500">
          Tambah Permissions
        </h2>
      </Modal.Header>
      <Modal.Content>
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

          <Button variant="primary" size="lg" className="w-full" type="submit">
            Tambah Permission
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
      success: 'Data permissions berhasil ditambahkan',
      error: 'Data permissions gagal ditambahkan',
    }
  );

  return (
    <>
      <Modal.Header className="mb-7 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Permissions
        </h2>
        <p className="text-p3 text-center text-neutral-400">
          Apakah kamu yakin ingin
          <br /> menambahkan permission ini?
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

export default ModalAddPermission;
