import { FC, ReactElement } from 'react';
import { LoginBanner } from "@imphnen-frontend-service/ui/organisms"
import { Button, Input, PasswordInput } from '@imphnen-frontend-service/ui/atoms';
import { useSearchParams } from 'react-router-dom';

export const Components: FC = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error"); // Ambil nilai ?error=

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <LoginBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[96px] flex justify-center'>
          <div className='w-[404px]'>
            <h2 className='text-4xl font-semibold text-primary-500 text-center mb-2'>Hallo Minna-san</h2>
            <h5 className='text-xl font-medium text-primary-500 text-center'>Welcome to Dimentorin by IMPHNEN</h5>
            <h6 className='text-gray-600 mt-10 font-medium'>Email</h6>
            <Input error={error ? error : undefined} size='lg' className='w-full' placeholder='Masukkan email-mu, Senpai~! ✨ (Pastikan tidak typo, ya~ 😆)' />
            <h6 className='text-gray-600 mt-3 font-medium'>Password</h6>
            <PasswordInput error={error ? error : undefined} className='w-full' size='lg' type='password' placeholder='Masukkan password rahasiamu!' />
            <div className='flex justify-end my-5'>
              <a href="/auth/forgot" className='text-primary-500 font-medium'>Lupa Password ?</a>
            </div>
            <Button className='w-full'>Enter Isekai</Button>
            <div className='flex my-3 gap-3 justify-center'>
              <h5>Belum Punya akun ?</h5>
              <a href="/auth/register" className='text-primary-500 font-medium'>Daftar Disini</a>
            </div>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-blue-400 opacity-50"></div>
              <span className="px-3 text-blue-400">Or</span>
              <div className="flex-grow border-t border-blue-400 opacity-50"></div>
            </div>
            <Button className='w-full my-3 text-gray-500 gap-2' variant='secondary'>
              <p>Log In With Google</p>
              <img src="/image/33978ce5bed2da9bf9d73acad802182a.png" alt="Google Icon" width={24}/>
            </Button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Components;