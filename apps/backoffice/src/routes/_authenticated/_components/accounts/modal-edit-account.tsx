import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useEffect, useState } from 'react';

interface IModalEditAccount {
  isOpen: boolean;
  onClose: () => void;
  handleEditAccount?: () => Promise<void>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  initialValues?: { fullname?: string; email?: string };
  onDataCapture?: (data: any) => void;
}

const ModalEditAccount = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleEditAccount,
  initialValues,
  onDataCapture,
}: IModalEditAccount) => {
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
      {currentStep === 1 && (
        <StepOne
          nextStep={nextStep}
          onClose={onClose}
          initialValues={initialValues}
          onDataCapture={onDataCapture}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          onClose={onClose}
          handleEditAccount={handleEditAccount}
          resetStep={resetStep}
        />
      )}
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
  initialValues?: { fullname?: string; email?: string };
  onDataCapture?: (data: any) => void;
}

const StepOne = ({ nextStep, initialValues, onDataCapture }: IStepOneProps) => {
  const [fullName, setFullName] = useState(initialValues?.fullname ?? '');
  const [email, setEmail] = useState(initialValues?.email ?? '');

  useEffect(() => {
    setFullName(initialValues?.fullname ?? '');
    setEmail(initialValues?.email ?? '');
  }, [initialValues]);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Edit Data Akun
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputField
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputField
            label="Email"
            type="text"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            className="w-full"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => {
            onDataCapture?.({ fullname: fullName, email });
            nextStep();
          }}
        >
          Perbarui Data
        </Button>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleEditAccount?: () => Promise<void>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleEditAccount, resetStep }: IStepTwoProps) => (
  <>
    <Modal.Header className="mb-0 text-center items-center">
      <h2 className="text-p1 font-semibold text-primary-500 mb-3">
        Update Data
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
        onClick={async () => {
          if (handleEditAccount) await handleEditAccount();
          onClose();
          resetStep();
        }}
      >
        Update
      </Button>
    </Modal.Content>
  </>
);

export default ModalEditAccount;
