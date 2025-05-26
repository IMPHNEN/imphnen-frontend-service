import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { UseFormReturn } from 'react-hook-form';

interface IModalFormVerifyEmailProps {
  isOpen: boolean;
  onClose: () => void;
  verifyForm: UseFormReturn<{ otp: string }, any>;
  onVerifySubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isVerifying: boolean;
  email?: string;
}

const ModalFormVerifyEmail = ({
  isOpen,
  onClose,
  verifyForm,
  onVerifySubmit,
  isVerifying,
  email,
}: IModalFormVerifyEmailProps) => {
  return (
    <Modal
      className="py-[45px] min-w-[400px] lg:min-w-[455px] px-7"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Modal.Header className="space-y-4">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 text-center font-semibold">
          Verifikasi Email
        </h1>
        <h2 className="text-neutral-500 text-lg text-center">
          Masukkan kode OTP yang telah dikirim ke {email ? email : 'email Anda'}
        </h2>
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={onVerifySubmit} className="space-y-6">
          <ControlledInputField
            control={verifyForm.control}
            name="otp"
            label="Kode OTP"
            placeholder="Masukkan Kode OTP"
            type="number"
            size="lg"
            className="w-full"
          />
          <Button
            size="md"
            className="w-full"
            type="submit"
            disabled={isVerifying}
          >
            {isVerifying ? 'Memverifikasi...' : 'Verifikasi'}
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalFormVerifyEmail;
