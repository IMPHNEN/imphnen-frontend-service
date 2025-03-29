import { FC, ReactElement } from 'react';
import { RegisterResetBanner } from "@imphnen-frontend-service/ui/organisms";
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';

export const Components: FC = (): ReactElement => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <RegisterResetBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[96px] flex justify-center'>
          <div className='w-[404px]'>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Components;