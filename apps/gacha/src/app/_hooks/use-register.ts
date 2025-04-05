import { useForm } from 'react-hook-form';
import {
  authRegisterSchema,
  stepOneRegisterSchema,
  TRegisterRequest,
  usePostRegister,
} from '@imphnen-frontend-service/service';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export const useRegister = () => {
  const postRegister = usePostRegister();
  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(authRegisterSchema),
    mode: 'all',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_number: '',
      referral_code: '',
      referred_by: '',
      student_type: '',
    },
  });

  const [stepValid, setStepValid] = useState(false);

  useEffect(() => {
    const subscription = form.watch(() => {
      const { fullname, email, password, confirm_password } = form.getValues();
      const valid = stepOneRegisterSchema.safeParse({
        fullname,
        email,
        password,
        confirm_password,
      }).success;
      setStepValid(valid);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit((data) => {
    postRegister.mutate(data, {
      onSuccess: (data) => toast.success(data.message),
      onError: (error) => toast.error(error.message),
    });
  });

  return {
    form,
    onSubmit,
    isStepOneValid: stepValid,
  };
};
