import { useForm } from 'react-hook-form';
import {
  TRegisterRequest,
  usePostRegister,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Local schema for the UI fields
const registerFormSchema = z.object({
  first_name: z.string().min(1, 'Nama depan tidak boleh kosong'),
  last_name: z.string().min(1, 'Nama belakang tidak boleh kosong'),
  email: z.string().min(1, 'Email tidak boleh kosong').email('Email harus valid'),
  phone_number: z.string().min(1, 'Nomor telepon tidak boleh kosong'),
  otp_code: z.string().optional(),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirm_password: z.string().min(1, 'Konfirmasi password tidak boleh kosong'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Password tidak cocok',
  path: ['confirm_password'],
});

type TRegisterFormFields = z.infer<typeof registerFormSchema>;

export const useRegisterHook = () => {
  const form = useForm<TRegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      otp_code: '',
      password: '',
      confirm_password: '',
    },
  });

  const { mutate: register, isPending: isLoading } = usePostRegister();

  const onSubmit = form.handleSubmit((data) => {
    const payload: TRegisterRequest = {
      email: data.email,
      phone_number: data.phone_number,
      fullname: `${data.first_name} ${data.last_name}`.trim(),
      password: data.password,
      confirm_password: data.confirm_password,
    };
    register(payload);
  });

  return {
    form,
    onSubmit,
    isLoading
  };
};
