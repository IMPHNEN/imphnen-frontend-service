import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useState } from 'react';

interface IModalUpdateItem {
  isOpen: boolean;
  onClose: () => void;
  handleUpdateItem?: () => void;
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
  prevStep,
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
  const [itemName, setItemName] = useState('Hoodie IMPHNEN Official 2025');
  const [quantity, setQuantity] = useState('10');
  const [chanceRate, setChanceRate] = useState('0.1');

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Update Item Roll Gacha
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputField
            label="Pilih Item"
            type="text"
            placeholder="Pilih item yang dimasukkan ke roll"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputField
            label="Quantity"
            type="text"
            placeholder="Masukkan Kuantitas Item"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputField
            label="Chance Rate"
            type="text"
            placeholder="Masukkan Chance Rate (0.1 - 1)"
            value={chanceRate}
            onChange={(e) => setChanceRate(e.target.value)}
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
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleUpdateItem?: () => void;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleUpdateItem, resetStep }: IStepTwoProps) => (
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
          handleUpdateItem && handleUpdateItem();
          onClose();
          resetStep();
        }}
      >
        Update
      </Button>
    </Modal.Content>
  </>
);

export default ModalUpdateItem;
