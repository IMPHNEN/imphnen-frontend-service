import { useForm } from 'react-hook-form';
import {
  TVerifyEmailRequest,
  usePostVerifyEmail,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVerifyEmail = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');
  const navigate = useNavigate();

  const postVerifyEmail = usePostVerifyEmail();

  const verifyForm = useForm<{ otp: string }>({
    mode: 'all',
    defaultValues: {
      otp: '',
    },
  });

  const onVerifySubmit = verifyForm.handleSubmit((data) => {
    const otpNumber = data.otp;

    const verifyData: TVerifyEmailRequest = {
      email: emailToVerify,
      otp: otpNumber,
    };

    postVerifyEmail.mutate(verifyData, {
      onSuccess: () => {
        toast.success('Verifikasi email sukses');

        navigate(0);
      },
      onError: (error) =>
        toast.error(error.message || 'Verifikasi email gagal'),
    });
  });

  const openVerifyModal = (email: string) => {
    setEmailToVerify(email);
    setShowVerifyModal(true);
  };

  const closeVerifyModal = () => {
    setShowVerifyModal(false);
    verifyForm.reset();
  };

  return {
    verifyForm,
    onVerifySubmit,
    showVerifyModal,
    openVerifyModal,
    closeVerifyModal,
    isVerifying: postVerifyEmail.isPending,
    emailToVerify,
  };
};
