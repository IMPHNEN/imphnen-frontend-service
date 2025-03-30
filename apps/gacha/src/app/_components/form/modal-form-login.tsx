import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputForm, Modal } from '@imphnen-frontend-service/ui/molecules';
import { Link } from 'react-router-dom';

interface IModalFormLogin {
  isOpen: boolean;
  onClose: () => void;
  onForgotPassword: () => void;
}

const ModalFormLogin = ({
  isOpen,
  onClose,
  onForgotPassword,
}: IModalFormLogin) => {
  return (
    <Modal
      className="py-[45px] min-w-[400px] lg:min-w-[455px] px-7"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Modal.Header className="space-y-4">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 text-center font-semibold">
          Login
        </h1>
      </Modal.Header>
      <Modal.Content className="space-y-4">
        <InputForm
          label="Email"
          placeholder="Masukkan Email"
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
        <h1 className="text-end text-primary-500 text-xl font-medium">
          <Button variant="text" onClick={onForgotPassword}>
            Lupa Password?
          </Button>
        </h1>
        <Button size="md" className="w-full">
          Login
        </Button>
        <div className="flex justify-center gap-2 pt-2.5 font-medium">
          <p className="text-neutral-500">Belum punya akun?</p>
          <Link
            className="text-primary-500 hover:text-primary-600"
            to="/register"
          >
            Daftar
          </Link>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalFormLogin;
