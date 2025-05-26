import { useForm } from 'react-hook-form';
import {
  TVerifyEmailRequest,
  usePostVerifyEmail,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { useState } from 'react';

export const useVerifyEmail = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');

  const postVerifyEmail = usePostVerifyEmail();

  const verifyForm = useForm<{ otp: string }>({
    mode: 'all',
    defaultValues: {
      otp: '',
    },
  });

  const onVerifySubmit = verifyForm.handleSubmit((data) => {
    const otpNumber = Number(data.otp);

    if (isNaN(otpNumber)) {
      toast.error('OTP harus berupa angka');
      return;
    }

    const verifyData: TVerifyEmailRequest = {
      email: emailToVerify,
      otp: otpNumber,
    };

    postVerifyEmail.mutate(verifyData, {
      onSuccess: () => {
        toast.success('Verifikasi email sukses');
        setShowVerifyModal(false);
        verifyForm.reset();
      },
      onError: (error) => toast.error(error.message || 'Verifikasi email gagal'),
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
