import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputForm, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useQueryState } from '../../../hooks/use-query-state';

interface IModalFormRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFormRegister = ({ isOpen, onClose }: IModalFormRegisterProps) => {
  const {
    step: currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useQueryState('registerStep', {
    defaultValue: 1,
    maxValue: 2,
    minValue: 1,
  });

  return (
    <Modal
      className="py-[45px] min-w-[400px] lg:min-w-[455px] px-7"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetStep();
      }}
    >
      <Modal.Header className="space-y-4">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 text-center font-semibold">
          Register
        </h1>
        <h2 className="text-neutral-500 text-lg text-center">
          {currentStep === 1 ? 'Info Akun' : 'Informasi Pengiriman Hadiah'}
        </h2>
      </Modal.Header>
      <Modal.Content className="space-y-6">
        {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} />}
        {currentStep === 2 && (
          <StepTwo nextStep={nextStep} prevStep={prevStep} />
        )}
      </Modal.Content>
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
}

const StepOne = ({ nextStep, onClose }: IStepOneProps) => (
  <>
    <InputForm
      label="Nama Lengkap"
      placeholder="Masukkan Nama Lengkap"
      type="text"
      size="lg"
      className="w-full"
    />
    <InputForm
      label="Email"
      placeholder="Masukkan Email Anda"
      type="email"
      size="lg"
      className="w-full"
    />
    <InputForm
      label="Password"
      placeholder="Masukkan Password"
      type="password"
      size="lg"
      className="w-full"
    />
    <InputForm
      label="Ulangi Password"
      placeholder="Masukkan Ulang Password"
      type="password"
      size="lg"
      className="w-full"
    />
    <Button size="md" className="w-full" onClick={nextStep}>
      Selanjutnya
    </Button>
  </>
);

interface IStepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepTwo = ({ nextStep, prevStep }: IStepTwoProps) => (
  <>
    <InputForm
      label="Nomor Telepon"
      placeholder="Masukkan Nomor Telepon Aktif"
      type="text"
      size="lg"
      className="w-full"
    />
    <InputForm
      label="Alamat Pengiriman"
      placeholder="Masukkan Alamat Pengiriman"
      type="text"
      size="lg"
      className="w-full"
    />
    <div className="flex gap-6">
      <Button size="md" variant="text" className="w-[40%]" onClick={prevStep}>
        Kembali
      </Button>
      <Button size="md" className="w-full" onClick={nextStep}>
        Gacha Sekarang
      </Button>
    </div>
  </>
);

export default ModalFormRegister;
