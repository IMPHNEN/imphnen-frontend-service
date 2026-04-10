import { useState } from 'react';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useLogin } from '../../_hooks/use-login';
import { authLoginSchema, TLoginRequest } from '@imphnen-frontend-service/service';
import ModalFormVerifyEmail from './modal-form-verify-email';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
    onSubmit: originalOnSubmit,
    isLoading,
    showVerifyModal,
    verifyForm,
    onVerifySubmit,
    closeVerifyModal,
    isVerifying,
    emailToVerify,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(() => {
    originalOnSubmit();
  });

  return (
    <>
      <Modal
        className="py-8 min-w-[400px] lg:min-w-[440px] px-8"
        isOpen={isOpen && !showVerifyModal}
        onClose={onClose}
      >
        <Modal.Header>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Sign in to IMPHNEN Gacha</p>
          </div>
        </Modal.Header>
        <Modal.Content>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="login-email" type="text" {...register('email')} placeholder="your@email.com" disabled={isLoading}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" onClick={onForgotPassword} className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer">Forgot password?</button>
              </div>
              <div className="relative">
                <input id="login-password" type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••" disabled={isLoading}
                  className={`w-full px-4 py-2.5 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.password ? 'border-red-400' : 'border-gray-300'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="text-xl" />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={!isValid || isLoading}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button type="button" className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer" onClick={() => setIsOpenRegisterModal(true)}>Sign up</button>
              </p>
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
