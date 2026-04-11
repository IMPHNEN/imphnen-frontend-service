import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement } from 'react'
import { RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ArrowRightOutlined } from '@ant-design/icons'

export const Route = createFileRoute('/_public/auth/register-mentor/pending')({
  component: RegisterMentorPendingPage,
})

function RegisterMentorPendingPage(): ReactElement {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]">
      <div className="bg-white xl:min-w-[1220px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6">
        <RegisterResetBanner />
        <div className="border-2 border-primary-500/50 xl:w-[696px] rounded-lg py-[32px] px-[48px] flex justify-center bg-primary-50">
          <div className="xl:w-[704px] flex flex-col justify-center items-center">
            <h2 className="text-4xl text-primary-500 font-semibold">
              Register Akun Mentor Berhasil
            </h2>
            <h4 className="mt-3 text-primary-500 font-medium text-xl text-center">
              Data kamu telah kami terima dan sedang dalam proses verifikasi.
            </h4>
            <svg className="mt-10" width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="74" cy="74" r="73.6348" fill="#42CDF8"/>
              <rect x="23.5078" y="24.8463" width="99.646" height="99.646" rx="49.823" fill="#0185D0"/>
              <circle cx="73.3284" cy="74.6689" r="33.11" transform="rotate(150 73.3284 74.6689)" stroke="#F0F8FF" strokeWidth="1.1825"/>
              <path d="M44.6436 91.2314C42.1053 92.6969 41.2086 95.9711 43.0096 98.2836C46.1026 102.255 49.9569 105.594 54.3651 108.095C60.3178 111.473 67.0644 113.199 73.9077 113.096C80.7511 112.993 87.4427 111.065 93.2912 107.51C97.6222 104.878 101.374 101.424 104.347 97.3614C106.077 94.9958 105.083 91.75 102.501 90.3615C99.9201 88.9729 96.7369 89.9826 94.884 92.2537C92.8925 94.6949 90.4923 96.7901 87.7782 98.4398C83.545 101.013 78.7015 102.409 73.7482 102.483C68.7949 102.558 63.9116 101.308 59.6029 98.8634C56.8404 97.2961 54.3784 95.2739 52.3144 92.8938C50.3941 90.6794 47.182 89.7658 44.6436 91.2314Z" fill="#F0F8FF"/>
            </svg>
            <h4 className="mt-10 text-primary-500 font-medium text-xl text-center">
              Mohon tunggu maksimal 2 hari kerja untuk proses aktivasi akun. Kami akan menghubungi kamu jika proses telah selesai.
            </h4>
            <a href="/auth/login">
              <Button className="gap-3 mt-10" size="lg">
                Kembali
                <ArrowRightOutlined />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
