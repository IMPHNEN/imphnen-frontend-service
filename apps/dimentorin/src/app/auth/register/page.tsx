import { FC, ReactElement } from 'react';
import { ControlledInputField, RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRegisterHook } from '../../_hooks/use-register';

export const Components: FC = (): ReactElement => {
  const { form, onSubmit, isLoading } = useRegisterHook();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]">
      <div className="bg-white xl:min-w-[1130px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6">
        <RegisterResetBanner />
        <div className="xl:border-2 xl:border-primary-500/50 xl:w-[726px] rounded-lg py-[32px] px-[48px] flex justify-center">
          <div className="xl:w-[714px]">
            <Button
              className='xl:hidden gap-3'
              variant='secondary'
            >
              <ArrowLeftOutlined />
              Login
            </Button>
            <h3 className="mt-5 text-3xl font-semibold text-primary-500">
              Register
            </h3>
            <h5 className="text-primary-500 font-medium">
              Yosha~! Saatnya Bergabung dengan Dimentorin
            </h5>
            <form onSubmit={onSubmit}>
              <div className='my-7'>
                <ControlledInputField
                  label="Full name"
                  size="lg"
                  className="w-full"
                  placeholder="Nama Lengkap"
                  name={'fullname'}
                  control={form.control}
                />
              </div>
              <div className="grid grid-flow-row-dense my-7 lg:grid-cols-2 gap-2">
                <ControlledInputField
                  label="Email"
                  size="lg"
                  className="w-full"
                  placeholder="Contoh : yourname@mail.com"
                  type='email'
                  control={form.control}
                  name={'email'}
                />
                <ControlledInputField
                  label="No Hp"
                  size="lg"
                  className="w-full"
                  placeholder="Contoh : 088877665544"
                  control={form.control}
                  name={'phone_number'}
                />  
              </div>
              <ControlledInputField
                label="Password"
                className="w-full"
                size="lg"
                type="password"
                placeholder="Buat password sekeren jurus ultimate-mu!"
                control={form.control}
                name={'password'}             
              />
              <h6 className="text-sm text-gray-500 mt-1">
                "Senpai~! Pastikan password-mu sekuat pertahanan kastil!"
              </h6>
              <h6 className="text-sm text-gray-500 mt-2">
                Tips membuat password yang OP:
              </h6>
              <h6 className="text-sm text-gray-500">
                - Minimal 8 karakter (semakin panjang, semakin power-up!{' '}
                <span role="img" aria-label="emoji">
                  ⚡
                </span>
                )
              </h6>
              <h6 className="text-sm text-gray-500">
                - Campur huruf besar, kecil, angka, dan simbol untuk kombinasi
                ultimate!
                <span role="img" aria-label="emoji">
                  🔥
                </span>
              </h6>
              <h6 className="text-sm text-gray-500 mb-2">
                - Jangan pakai password yang gampang ditebak, nanti ketahuan
                musuh!
                <span role="img" aria-label="emoji">
                  🚨
                </span>
              </h6>
              <ControlledInputField
                label="Repeat Password"
                className="w-full"
                size="lg"
                type="password"
                placeholder="Ulangi password-mu, Senpai~!"
                control={form.control}
                name={"confirm_password"}
              />
              <Button className="xl:w-full mt-2" disabled={(!form.formState.isValid || isLoading)}>Linked Start !!!</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
