import { FC, ReactElement } from 'react';
import { ControlledInputField, LoginBanner } from '@imphnen-frontend-service/ui/organisms';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useLogin } from '../../_hooks/use-login';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const Components: FC = (): ReactElement => {
  const { form, onSubmit } = useLogin();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]">
      <div className="bg-white xl:min-w-[1120px] xl:min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6">
        <LoginBanner />
        <div className="xl:border-2 xl:border-primary-500/50 md:w-[596px] rounded-lg md:py-[70px] md:px-[96px] flex justify-center">
          <div className="md:w-[404px]">
            <h2 className="text-4xl font-semibold text-primary-500 text-center mb-2">
              Hallo Minna-san
            </h2>
            <h5 className="text-xl font-medium text-primary-500 text-center mb-5">
              Welcome to Dimentorin by IMPHNEN
            </h5>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
              <ControlledInputField
                control={form.control}
                label="Email"
                size="lg"
                className="w-full mb-2"
                placeholder="Masukkan email-mu, Senpai~! ✨ (Pastikan tidak typo, ya~ 😆)" 
                name={'email'}            
              />
              <ControlledInputField
                control={form.control}
                label="Password"
                className="w-full"
                size="lg"
                type="password"
                placeholder="Masukkan password rahasiamu!"
                name={'password'}
              />
              <div className="flex justify-end my-5">
                <a href="/auth/forgot" className="text-primary-500 font-medium">
                  Lupa Password ?
                </a>
              </div>
              <Button className="w-full" type='submit'>Enter Isekai</Button>
            </form>
            
            <div className="flex my-3 gap-3 justify-center">
              <h5>Belum Punya akun ?</h5>
              <a href="/auth/register" className="text-primary-500 font-medium">
                Daftar Disini
              </a>
            </div>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-blue-400 opacity-50"></div>
              <span className="px-3 text-blue-400">Or</span>
              <div className="flex-grow border-t border-blue-400 opacity-50"></div>
            </div>
            <Button
              className="w-full my-3 text-gray-500 gap-2"
              variant="secondary"
            >
              <p>Log In With Google</p>
              <img
                src="/image/33978ce5bed2da9bf9d73acad802182a.webp"
                alt="Google Icon"
                width={24}
              />
            </Button>
            <Button
              className='xl:hidden w-full gap-3'
              variant='secondary'
            >
              <ArrowLeftOutlined />
              Kembali Ke Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
