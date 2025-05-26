import { FC, ReactElement } from 'react';
import { RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { InputField } from '@imphnen-frontend-service/ui/molecules';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const Components: FC = (): ReactElement => {
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
            <div className="grid grid-flow-row-dense my-7 lg:grid-cols-2 gap-2">
              <InputField
                label="First Name"
                size="lg"
                className="w-full"
                placeholder="Nama Depan"
              />
              <InputField
                label="Last Name"
                size="lg"
                className="w-full"
                placeholder="Nama Belakang"
              />
              <InputField
                label="Email"
                size="lg"
                className="w-full"
                placeholder="Contoh : yourname@mail.com"
              />
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <h4 className="font-medium">OTP Code</h4>
                  <Input
                    className="w-full"
                    size="lg"
                    placeholder="Kode OTP"
                  />
                </div>
                <div className="flex flex-col">
                  <Button size="sm" className="mt-[30px]">
                    Kirim OTP
                  </Button>
                </div>
              </div>
            </div>
            <InputField
              label="Password"
              className="w-full"
              size="lg"
              type="password"
              placeholder="Buat password sekeren jurus ultimate-mu!"
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
            <InputField
              label="Repeat Password"
              className="w-full"
              size="lg"
              type="password"
              placeholder="Ulangi password-mu, Senpai~!"
            />
            <Button className="xl:w-full mt-2">Linked Start !!!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
