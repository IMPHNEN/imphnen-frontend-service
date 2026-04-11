import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement } from 'react'
import { RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms'
import { ForgotStep } from '@imphnen-frontend-service/ui/molecules'
import { Button, Input } from '@imphnen-frontend-service/ui/atoms'

export const Route = createFileRoute('/_public/auth/forgot')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage(): ReactElement {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]'>
      <div className='bg-white min-w-[1120px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6'>
        <RegisterResetBanner />
        <div className='border-2 border-primary-500/50 w-[596px] rounded-lg py-[70px] px-[48px] flex flex-col justify-center'>
          <ForgotStep step={1} />
          <h3 className='mt-5 text-3xl font-semibold text-primary-500'>Forgot Password</h3>
          <h5 className='mt-2 text-xl font-medium text-primary-500'>Masukkan email-mu, dan biarkan kami memanggil password-mu kembali dari dunia lain!</h5>
          <h6 className='text-gray-600 mt-8'>Email</h6>
          <Input type='email' size='lg' placeholder='Contoh: yourname@mail.com'></Input>
          <Button variant='primary' className='mt-7'>Kirim Kode OTP ^^</Button>
        </div>
      </div>
    </div>
  )
}
