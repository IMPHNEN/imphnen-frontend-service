import { FC, ReactElement, useEffect, useState } from 'react';
import { ControlledInputField, RegisterResetBanner } from "@imphnen-frontend-service/ui/organisms";
import { useOtpHook } from '../../../_hooks/use-otp';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useSearchParams } from 'react-router-dom';
import { useResendOtpHook } from '../../../_hooks/use-resend-otp';

export const Components: FC = (): ReactElement => {
  const { form, onSubmit, isLoading } = useOtpHook()
  const [ searchParams ] = useSearchParams()
  const [ disabled, setDisabled]  = useState(true);
  const [ timeLeft, setTimeLeft ] = useState(5 * 60);
  const { resendOTP } = useResendOtpHook()

  useEffect(() => {
    if (disabled) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [disabled]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <RegisterResetBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[48px] flex flex-col justify-center'>
          <h3 className='mt-5 text-3xl font-semibold text-primary-500'>Verifikasi Email</h3>
          <h5 className='mt-2 text-xl font-medium text-primary-500'>Yeay~! Pesan dari dunia lain sudah dikirimkan ke {searchParams.get("email")}</h5>
          <form onSubmit={onSubmit} className='mt-7'>
            <ControlledInputField
              label="OTP"
              size="lg"
              className="w-full"
              placeholder="XXXXXX"
              max={6}
              name={'otp'}
              maxLength={6}
              control={form.control}
            />
            <Button type="button" className="mt-2" disabled={disabled} onClick={
              () => {
                resendOTP({email: searchParams.get("email") || ""})
                setDisabled(true)
                setTimeLeft(5 * 60)
              }
            }>Kirim ulang otp {disabled? `(${formatTime(timeLeft)})`: ""}</Button>
            <Button className="xl:w-full mt-2" disabled={(!form.formState.isValid || isLoading)}>Linked Start !!!</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Components;