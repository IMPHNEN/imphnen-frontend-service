import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputForm, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useState } from 'react';

interface IModalEditAccount {
  isOpen: boolean;
  onClose: () => void;
  handleEditAccount?: () => void;
  currentStep?: number;
}

const ModalEditAccount = ({
  isOpen,
  onClose,
  handleEditAccount,
  currentStep = 1,
}: IModalEditAccount) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      {currentStep === 1 && (
        <StepOne
          nextStep={() => {
            console.log('Next step');
          }}
          onClose={onClose}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          onClose={onClose}
          handleEditAccount={handleEditAccount}
          resetStep={() => {
            console.log('Reset step');
          }}
        />
      )}
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
}

const StepOne = ({ nextStep, onClose }: IStepOneProps) => {
  const [fullName, setFullName] = useState('Ahmad Wiyana');
  const [email, setEmail] = useState('fullname23@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('081904423804');
  const [address, setAddress] = useState('Jl. Pantai Cibaduyut Indah');

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Edit Data Akun
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Email"
            type="text"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Nomor Telepon"
            type="text"
            placeholder="Masukkan Nomor Telepon"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Alamat"
            type="text"
            placeholder="Masukkan Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          Perbarui Data
        </Button>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleEditAccount?: () => void;
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
        onClick={resetStep}
      >
        Batal
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => {
          handleEditAccount && handleEditAccount();
        }}
      >
        Update
      </Button>
    </Modal.Content>
  </>
);

export default ModalEditAccount;
