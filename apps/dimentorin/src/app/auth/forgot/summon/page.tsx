import { FC, ReactElement } from 'react';
import { RegisterResetBanner } from "@imphnen-frontend-service/ui/organisms";
import { ForgotStep } from "@imphnen-frontend-service/ui/molecules";
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';

export const Components: FC = (): ReactElement => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <RegisterResetBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[48px] flex flex-col justify-center'>
          <ForgotStep step={3} />
          <h3 className='mt-5 text-3xl font-semibold text-primary-500'>Forgot Password</h3>
          <h5 className='mt-2 text-md font-medium text-primary-500'>Sekarang, buatlah password baru yang lebih kuat, seperti jurus andalanmu!<span role="img" aria-label='emoji'>🔥⚡</span></h5>
          <div className='my-4'>
            <h6 className='text-gray-700'>Password Baru</h6>
            <Input className='w-full' type="password" placeholder='Buat password sekokoh armor legendary!'/>
            <h6 className='text-gray-700 mt-5'>Ulang Password Baru</h6>
            <Input className='w-full' type="password" placeholder='Pastikan Cocok! Jangan sampai ada typo, Senpai~!'/>
          </div>
          <div className='mb-4 text-gray-700 flex flex-col gap-3 text-sm'>
            <h6><span role='img' aria-label='emoji'>💡</span> Tips dari kami:</h6>
            <h6><span role='img' aria-label='emoji'>✅ </span> Buat kombinasi huruf besar, kecil, angka, dan simbol untuk kekuatan maksimal!</h6>  
            <h6><span role='img' aria-label='emoji'>✅</span> Pastikan kamu ingat password-mu atau simpan di tempat aman~</h6>  
            <h6>Masukkan password baru dan bersiaplah untuk kembali bertualang!</h6>
          </div>
          <Button className='mt-5'>Summon Password Baru!</Button>
        </div>
      </div>
    </div>
  );
};

export default Components;