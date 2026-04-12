import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ReactElement, useState } from 'react'
import { RegisterResetBanner, ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { ForgotStep } from '@imphnen-frontend-service/ui/molecules'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const Route = createFileRoute('/_public/auth/forgot')({
  component: ForgotPasswordPage,
})

const forgotSchema = z.object({
  email: z.string().email('Email harus valid'),
  otp_code: z.string().min(6, 'Minimal 6 digit'),
  password: z.string().min(8, 'Minimal 8 karakter'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Password tidak cocok',
  path: ['confirm_password'],
})

type TForgotFields = z.infer<typeof forgotSchema>

function ForgotPasswordPage(): ReactElement {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const { control } = useForm<TForgotFields>({
    resolver: zodResolver(forgotSchema),
    mode: 'onChange',
    defaultValues: { email: '', otp_code: '', password: '', confirm_password: '' }
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-5">
      <div className="flex w-[90%] max-w-[1120px] min-h-[732px] bg-white rounded-[48px] shadow-auth border border-border-light overflow-hidden relative z-[1] p-10 gap-6">
        <RegisterResetBanner />

        <div className="flex-1 py-[53px] px-12 bg-white border border-border-light rounded-[48px] flex flex-col items-center justify-start w-full">
          <div className="mb-8 w-full max-w-[493px]">
            <ForgotStep step={step} />
          </div>

          {step === 1 && (
            <div className="w-full max-w-[493px]">
              <div className="mb-8 text-left">
                <h1 className="text-[37px] font-semibold leading-[1.2] text-text-dark mb-2">Lupa Password?</h1>
                <p className="text-base font-medium text-text-secondary">
                  Tenang, Senpai! Kami bantu ambil kembali akses akunmu! ✨
                </p>
              </div>

              <div className="mt-6">
                <ControlledInputField
                  label="Email"
                  name="email"
                  size="lg"
                  control={control}
                  placeholder="Masukkan email-mu yang terdaftar"
                />
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-[34px] bg-primary-accent text-white rounded-md text-[15px] font-semibold flex items-center justify-center hover:bg-[#1e8cd1] disabled:bg-neutral-400 transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Kirim Kode OTP ^^
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-[493px]">
              <div className="mb-8 text-left">
                <h1 className="text-[37px] font-semibold leading-[1.2] text-text-dark mb-2">Verifikasi OTP</h1>
                <p className="text-base font-medium text-text-secondary">
                  Masukkan kode 6 digit yang dikirimkan ke email-mu! 📬
                </p>
              </div>

              <div className="mt-6">
                <ControlledInputField
                  label="OTP Code"
                  name="otp_code"
                  size="lg"
                  control={control}
                  placeholder="Kode Otp"
                  maxLength={6}
                />
                <div className="mt-4 text-right">
                  <span className="text-sm text-gray-500">Gak dapet kode? </span>
                  <button type="button" className="text-primary-accent hover:underline cursor-pointer font-medium">Kirim Ulang</button>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-[34px] bg-primary-accent text-white rounded-md text-[15px] font-semibold flex items-center justify-center hover:bg-[#1e8cd1] disabled:bg-neutral-400 transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Verifikasi Kode
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full max-w-[493px]">
              <div className="mb-8 text-left">
                <h1 className="text-[37px] font-semibold leading-[1.2] text-text-dark mb-2">Summon Password Baru!</h1>
                <p className="text-base font-medium text-text-secondary">
                  Senpai! Pastikan password barumu lebih OP dan tak terkalahkan! ⚔️
                </p>
              </div>

              <div className="mt-6">
                <ControlledInputField
                  label="Password Baru"
                  name="password"
                  type="password"
                  size="lg"
                  control={control}
                  placeholder="Masukkan password sekeren jurus ultimate-mu!"
                />
              </div>

              <div className="mt-6">
                <ControlledInputField
                  label="Ulang Password"
                  name="confirm_password"
                  type="password"
                  size="lg"
                  control={control}
                  placeholder="Ulangi password-mu, Senpai~!"
                />
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => {
                    toast.success('Password updated! Redirecting to login...')
                    navigate({ to: '/auth/login' })
                  }}
                  className="w-full h-[34px] bg-primary-accent text-white rounded-md text-[15px] font-semibold flex items-center justify-center hover:bg-[#1e8cd1] disabled:bg-neutral-400 transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Summon Password Baru!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
