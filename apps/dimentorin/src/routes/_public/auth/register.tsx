import { createFileRoute, Link } from '@tanstack/react-router'
import { ReactElement } from 'react'
import { ControlledInputField, RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms'
import { useRegisterHook } from '../../_hooks/use-register'

export const Route = createFileRoute('/_public/auth/register')({
  component: RegisterPage,
})

function RegisterPage(): ReactElement {
  const { form, onSubmit, isLoading } = useRegisterHook()

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-5">
      <div className="flex w-[90%] max-w-[1120px] min-h-[732px] bg-white rounded-[48px] shadow-auth border border-border-light overflow-hidden relative z-[1] p-10 gap-6">
        <RegisterResetBanner />

        <div className="flex-1 py-[53px] px-12 bg-white border border-border-light rounded-[48px] flex flex-col items-center justify-start w-full">
          <div className="w-full max-w-[493px] mb-7">
            <h1 className="text-[37px] font-semibold leading-[1.2] text-text-dark mb-2">Register</h1>
            <p className="text-base font-medium text-text-secondary">Yosha~! Saatnya Bergabung dengan Dimentorin!</p>
          </div>

          <form onSubmit={onSubmit} className="w-full max-w-[493px]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ControlledInputField
                  label="Nama Depan"
                  name="first_name"
                  control={form.control}
                  size="lg"
                  placeholder="Nama depan"
                  disabled={isLoading}
                />
              </div>
              <div>
                <ControlledInputField
                  label="Nama Belakang"
                  name="last_name"
                  control={form.control}
                  size="lg"
                  placeholder="Nama Belakang"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <ControlledInputField
                  label="Email"
                  name="email"
                  control={form.control}
                  size="lg"
                  placeholder="Contoh : yourname@mail.com"
                  disabled={isLoading}
                />
              </div>
              <div>
                <ControlledInputField
                  label="No Hp"
                  name="phone_number"
                  control={form.control}
                  size="lg"
                  placeholder="Contoh : 08123456789"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-end gap-3 mt-5">
              <div className="flex-1">
                <ControlledInputField
                  label="OTP Code"
                  name="otp_code"
                  control={form.control}
                  size="lg"
                  placeholder="Kode Otp"
                  disabled={isLoading}
                />
              </div>
              <button
                type="button"
                className="w-[66px] h-[42px] bg-primary-accent text-white rounded-md text-[10px] font-medium flex items-center justify-center hover:bg-[#1e8cd1] disabled:bg-neutral-400 transition-all duration-200 ease-in-out"
              >
                Kirim OTP
              </button>
            </div>

            <div className="mt-5">
              <ControlledInputField
                label="Password"
                name="password"
                type="password"
                control={form.control}
                size="lg"
                placeholder="Buat password sekeren jurus ultimate-mu!"
                helperText='"Senpai~! Pastikan password-mu sekuat pertahanan kastil!"'
                disabled={isLoading}
              />
              <p className="mt-2 text-[10px] text-gray-500 italic">
                Tips membuat password yang OP:<br/>
                - Minimal 8 karakter (semakin panjang, semakin power-up! ⚡)<br/>
                - Campur huruf besar, kecil, angka, dan simbol untuk kombinasi ultimate!🔥<br/>
                - Jangan pakai password yang gampang ditebak, nanti ketahuan musuh!🚨
              </p>
            </div>

            <div className="mt-4">
              <ControlledInputField
                label="Ulang Password"
                name="confirm_password"
                type="password"
                control={form.control}
                size="lg"
                placeholder="Ulangi password-mu, Senpai~!"
                disabled={isLoading}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={(!form.formState.isValid || isLoading)}
                className="w-full h-[34px] bg-primary-accent text-white rounded-md text-[15px] font-semibold flex items-center justify-center hover:bg-[#1e8cd1] disabled:bg-neutral-400 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {isLoading ? 'Processing...' : 'Linked Start!!!'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center w-full max-w-[493px]">
            <p className="text-base font-medium text-text-secondary">Sudah punya akun? <Link to="/auth/login" className="text-primary-accent font-medium text-base hover:underline cursor-pointer">Login disini</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
