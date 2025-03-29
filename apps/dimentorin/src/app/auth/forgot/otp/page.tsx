import { FC, ReactElement } from 'react';
import { RegisterResetBanner } from "@imphnen-frontend-service/ui/organisms";
import { ForgotStep, OtpForm } from "@imphnen-frontend-service/ui/molecules";
import { Button } from '@imphnen-frontend-service/ui/atoms';

export const Components: FC = (): ReactElement => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <RegisterResetBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[48px] flex flex-col justify-center'>
          <ForgotStep step={2} />
          <h3 className='mt-5 text-3xl font-semibold text-primary-500'>Forgot Password</h3>
          <h5 className='mt-2 text-xl font-medium text-primary-500'>Yeay~! Pesan dari dunia lain (a.k.a email-mu) sudah tiba!</h5>
          <OtpForm />
          <Button>Summon Password Baru!</Button>
        </div>
      </div>
    </div>
  );
};

export default Components;