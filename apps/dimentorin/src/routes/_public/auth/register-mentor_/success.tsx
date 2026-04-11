import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement } from 'react'
import { RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ArrowRightOutlined } from '@ant-design/icons'

export const Route = createFileRoute('/_public/auth/register-mentor/success')({
  component: RegisterMentorSuccessPage,
})

function RegisterMentorSuccessPage(): ReactElement {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]">
      <div className="bg-white xl:min-w-[1220px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6">
        <RegisterResetBanner />
        <div className="border-2 border-primary-500/50 xl:w-[696px] rounded-lg py-[32px] px-[48px] flex justify-center bg-primary-50">
          <div className="xl:w-[704px] flex flex-col justify-center items-center">
            <h2 className="text-4xl text-primary-500 font-semibold">
              Register Akun Mentor Berhasil
            </h2>
            <h4 className="mt-3 text-primary-500 font-medium text-xl">
              Akun Kamu Telah Berhasil Diverifikasi!
            </h4>
            <svg
              width="198"
              height="198"
              viewBox="0 0 198 198"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-10"
            >
              <circle cx="99" cy="99" r="99" fill="#BCF8B0" />
              <rect
                x="31.1152"
                y="32.9141"
                width="133.971"
                height="133.971"
                rx="66.9857"
                fill="#35BA43"
              />
              <path
                d="M127.935 75.8846H122.722C121.991 75.8846 121.297 76.2202 120.85 76.7945L90.0997 115.748L75.355 97.0657C75.1319 96.7825 74.8476 96.5535 74.5234 96.3959C74.1992 96.2384 73.8435 96.1563 73.483 96.1558H68.2697C67.77 96.1558 67.4941 96.7301 67.7999 97.1179L88.2277 122.998C89.1824 124.206 91.0171 124.206 91.9792 122.998L128.405 76.8392C128.711 76.4589 128.435 75.8846 127.935 75.8846Z"
                fill="#E0FBD8"
              />
            </svg>
            <h4 className="mt-10 text-primary-500 font-medium text-xl text-center">
              Kamu sekarang bisa login dan mulai menggunakan layanan kami. Selamat bergabung! SENPAIIII
            </h4>
            <a href="/auth/login">
              <Button className="gap-3 mt-10" size="lg">
                Masuk Jalur Mentor Isekai
                <ArrowRightOutlined />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
