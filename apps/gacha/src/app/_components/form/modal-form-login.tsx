import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Link } from 'react-router-dom';
import { useLogin } from '../../_hooks/use-login';

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
  const { form, onSubmit } = useLogin();

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
            <Button variant="text" onClick={onForgotPassword}>
              Lupa Password?
            </Button>
          </h1>
          <Button type="submit" size="md" className="w-full">
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
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalFormLogin;
