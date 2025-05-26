import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { useLogin } from '../../_hooks/use-login';
import ModalFormVerifyEmail from './modal-form-verify-email';

interface IModalFormLogin {
  isOpen: boolean;
  onClose: () => void;
  onForgotPassword: () => void;
  setIsOpenRegisterModal: (value: boolean) => void;
}

const ModalFormLogin = ({
  isOpen,
  onClose,
  onForgotPassword,
  setIsOpenRegisterModal,
}: IModalFormLogin) => {
  const {
    form,
    onSubmit,
    isLoading,
    showVerifyModal,
    verifyForm,
    onVerifySubmit,
    closeVerifyModal,
    isVerifying,
    emailToVerify,
  } = useLogin();

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
            Login
          </h1>
        </Modal.Header>
        <Modal.Content>
          <form className="space-y-4" onSubmit={onSubmit}>
            <ControlledInputField
              control={form.control}
              label="Email"
              placeholder="Masukkan Email"
              type="email"
              name="email"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Password"
              placeholder="Masukkan Password"
              type="password"
              name="password"
              size="lg"
              className="w-full"
            />
            <h1 className="text-end text-primary-500 text-xl font-medium">
              <Button variant="text" type="button" onClick={onForgotPassword}>
                Lupa Password?
              </Button>
            </h1>
            <Button
              type="submit"
              size="md"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <div className="flex justify-center gap-2 pt-2.5 font-medium">
              <p className="text-neutral-500">Belum punya akun?</p>
              <Button
                variant="text"
                className="text-primary-500 hover:text-primary-600 m-0 p-0"
                onClick={() => setIsOpenRegisterModal(true)}
              >
                Daftar
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal>

      <ModalFormVerifyEmail
        isOpen={showVerifyModal}
        onClose={closeVerifyModal}
        verifyForm={verifyForm}
        onVerifySubmit={onVerifySubmit}
        isVerifying={isVerifying}
        email={emailToVerify}
      />
    </>
  );
};

export default ModalFormLogin;
