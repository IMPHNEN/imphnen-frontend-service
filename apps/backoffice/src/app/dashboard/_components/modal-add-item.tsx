import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField, Modal } from '@imphnen-frontend-service/ui/molecules';

interface IModalAddItem {
  isOpen: boolean;
  onClose: () => void;
  handleAddItem: () => void;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalAddItem = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAddItem,
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
      {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} />}
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
}

const StepOne = ({ nextStep }: IStepOneProps) => (
  <>
    <Modal.Header>
      <h2 className="text-p1 font-semibold text-primary-500 mb-3">
        Tambah Item Gacha
      </h2>
      <p className="text-p3 text-neutral-400">
        Lengkapi detail di bawah ini untuk menambahkan item gacha
      </p>
    </Modal.Header>
    <Modal.Content className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <InputField
          label="Nama Hadiah"
          type="text"
          placeholder="Masukkan Nama Hadiah"
          size="lg"
          className="w-full"
        />
        <InputField
          label="Chance Rate"
          type="text"
          placeholder="Masukkan Chance Rate"
          size="lg"
          className="w-full"
        />
        <InputField
          label="Foto Barang"
          type="file"
          placeholder=".jpg, .jpeg, atau .png"
          size="lg"
          className="w-full"
        />
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={nextStep}>
        Tambahkan Item
      </Button>
    </Modal.Content>
  </>
);

interface IStepTwoProps {
  onClose: () => void;
  handleAddItem?: () => void;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleAddItem, resetStep }: IStepTwoProps) => (
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
        onClick={() => {
          onClose();
          resetStep();
        }}
      >
        Batal
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => {
          handleAddItem && handleAddItem();
          onClose();
          resetStep();
        }}
      >
        Tambahkan
      </Button>
    </Modal.Content>
  </>
);

export default ModalAddItem;
