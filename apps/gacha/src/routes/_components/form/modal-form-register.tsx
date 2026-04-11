import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useRegister } from '../../_hooks/use-register';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import ModalFormVerifyEmail from './modal-form-verify-email';

interface IModalFormRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFormRegister = ({ isOpen, onClose }: IModalFormRegisterProps) => {
  const {
    form,
    verifyForm,
    onSubmit,
    onVerifySubmit,
    showVerifyModal,
    closeVerifyModal,
    isVerifying,
    isRegistering,
    registeredEmail,
  } = useRegister();

  return (
    <>
      <Modal
        className="py-[45px] min-w-[400px] lg:min-w-[455px] px-7"
        isOpen={isOpen && !showVerifyModal}
        onClose={onClose}
      >
        <Modal.Header className="space-y-4">
          <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
          <h1 className="text-primary-500 text-p1 text-center font-semibold">
            Register
          </h1>
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={onSubmit} className="space-y-6">
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
            <ControlledInputField
              control={form.control}
              name="phone_number"
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon Aktif"
              type="text"
              size="lg"
              className="w-full"
            />
            <Button
              size="md"
              className="w-full"
              type="submit"
              disabled={isRegistering || !form.formState.isValid}
            >
              {isRegistering ? 'Mendaftar...' : 'Register'}
            </Button>
          </form>
        </Modal.Content>
      </Modal>

      <ModalFormVerifyEmail
        isOpen={showVerifyModal}
        onClose={closeVerifyModal}
        verifyForm={verifyForm}
        onVerifySubmit={onVerifySubmit}
        isVerifying={isVerifying}
        email={registeredEmail}
      />
    </>
  );
};

export default ModalFormRegister;
