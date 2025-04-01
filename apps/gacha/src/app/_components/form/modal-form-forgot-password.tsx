import { Button } from '@imphnen-frontend-service/ui/atoms';
import {
  InputForm,
  Modal,
  Stepper,
} from '@imphnen-frontend-service/ui/molecules';
import { useQueryState } from '../../../hooks/use-query-state';

interface IModalFormForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFormForgotPassword = ({
  isOpen,
  onClose,
}: IModalFormForgotPasswordProps) => {
  const {
    step: currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useQueryState('step', {
    defaultValue: 1,
    maxValue: 3,
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
          Forgot Password
        </h1>
        <Stepper currentStep={currentStep} totalSteps={3} />
      </Modal.Header>
      <Modal.Content className="space-y-6">
        {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} />}
        {currentStep === 2 && (
          <StepTwo nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 3 && (
          <StepThree onClose={onClose} resetStep={resetStep} />
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
      label="Email"
      placeholder="Masukkan Email yang Terdaftar"
      type="email"
      size="lg"
      className="w-full"
    />
    <div className="flex gap-6">
      <Button variant="bordered" size="md" className="w-full" onClick={onClose}>
        Back To Login
      </Button>
      <Button size="md" className="w-full" onClick={nextStep}>
        Kirim OTP
      </Button>
    </div>
  </>
);

interface IStepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepTwo = ({ nextStep, prevStep }: IStepTwoProps) => (
  <>
    {/* TODO: Change component using OTP Input */}
    <InputForm
      label="Kode OTP"
      placeholder="Masukkan Kode OTP"
      type="text"
      size="lg"
      className="w-full"
    />
    <div className="flex gap-6">
      <Button
        size="md"
        variant="bordered"
        className="w-full"
        onClick={prevStep}
      >
        Change Email
      </Button>
      <Button size="md" className="w-full" onClick={nextStep}>
        Reset Password
      </Button>
    </div>
  </>
);

interface IStepThreeProps {
  onClose: () => void;
  resetStep: () => void;
}

const StepThree = ({ onClose, resetStep }: IStepThreeProps) => (
  <>
    <InputForm
      label="Password Baru"
      placeholder="Masukkan Password Baru"
      type="password"
      size="lg"
      className="w-full"
    />
    <InputForm
      label="Ulang Password"
      placeholder="Masukkan Ulang Password"
      type="password"
      size="lg"
      className="w-full"
    />
    <Button
      size="md"
      className="w-full"
      onClick={() => {
        console.log('Password reset submitted');
        onClose();
        resetStep();
      }}
    >
      Buat Password Baru
    </Button>
  </>
);

export default ModalFormForgotPassword;
