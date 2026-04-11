import { useForm } from 'react-hook-form';
import {
  authRegisterSchema,
  TRegisterRequest,
  usePostRegister,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useVerifyEmail } from './use-verify-email';

export const useRegister = () => {
  const postRegister = usePostRegister();
  const {
    verifyForm,
    onVerifySubmit,
    showVerifyModal,
    openVerifyModal,
    closeVerifyModal,
    isVerifying,
    emailToVerify,
  } = useVerifyEmail();

  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(authRegisterSchema),
    mode: 'all',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_number: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    postRegister.mutate(data, {
      onSuccess: () => {
        toast.success('Registrasi sukses. Silakan verifikasi email Anda.');
        openVerifyModal(data.email);
      },
      onError: (error) => toast.error(error.message || 'Registrasi gagal'),
    });
  });

  return {
    form,
    verifyForm,
    onSubmit,
    onVerifySubmit,
    showVerifyModal,
    closeVerifyModal,
    isVerifying,
    isRegistering: postRegister.isPending,
    registeredEmail: emailToVerify,
  };
};
