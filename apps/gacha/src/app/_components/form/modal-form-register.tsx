import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useQueryState } from '@imphnen-frontend-service/utils';
import { useRegister } from '../../_hooks/use-register';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { UseFormReturn } from 'react-hook-form';
import { TRegisterRequest } from '@imphnen-frontend-service/service';

interface IModalFormRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFormRegister = ({ isOpen, onClose }: IModalFormRegisterProps) => {
  const { form, onSubmit } = useRegister();

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
      <Modal.Content>
        <form onSubmit={onSubmit} className="space-y-6">
          {currentStep === 1 && (
            <StepOne form={form} nextStep={nextStep} onClose={onClose} />
          )}
          {currentStep === 2 && <StepTwo form={form} prevStep={prevStep} />}
        </form>
      </Modal.Content>
    </Modal>
  );
};

interface IStepOneProps {
  form: UseFormReturn<TRegisterRequest, any, TRegisterRequest>;
  nextStep: () => void;
  onClose: () => void;
}

const StepOne = ({ form, nextStep, onClose }: IStepOneProps) => (
  <>
    <ControlledInputField
      control={form.control}
      name="fullname"
      label="Nama Lengkap"
      placeholder="Masukkan Nama Lengkap"
      type="text"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      label="Email"
      placeholder="Masukkan Email Anda"
      type="email"
      name="email"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      name="password"
      label="Password"
      placeholder="Masukkan Password"
      type="password"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      name="confirm_password"
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
  form: UseFormReturn<TRegisterRequest, any, TRegisterRequest>;
  prevStep: () => void;
}

const StepTwo = ({ form, prevStep }: IStepTwoProps) => (
  <>
    <ControlledInputField
      control={form.control}
      name="phone_number"
      label="Nomor Telepon"
      placeholder="Masukkan Nomor Telepon Aktif"
      type="text"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      name="referral_code"
      label="Kode Referral"
      placeholder="Masukkan Kode Referral"
      type="text"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      name="referred_by"
      label="Referral By"
      placeholder="Masukkan Referral By"
      type="text"
      size="lg"
      className="w-full"
    />
    <ControlledInputField
      control={form.control}
      name="student_type"
      label="Tipe Pelajar"
      placeholder="Masukkan Tipe Pelajar"
      type="text"
      size="lg"
      className="w-full"
    />
    <div className="flex gap-6">
      <Button size="md" variant="text" className="w-[40%]" onClick={prevStep}>
        Kembali
      </Button>
      <Button size="md" className="w-full" type="submit">
        Gacha Sekarang
      </Button>
    </div>
  </>
);

export default ModalFormRegister;
