'use client';

import { cn } from '@utils';
import { useState } from 'react';
import { ResendOTPForm } from './resend-otp-form';
import { VerifyEmailForm } from './verify-email-form';

export function VerificationTabs() {
  const [activeTab, setActiveTab] = useState<'form' | 'resend'>('form');

  return (
    <>
      <div className="flex space-x-2 border-b">
        <button
          className={cn(
            'py-2 px-4 w-full',
            activeTab === 'form'
              ? 'border-b-2 border-primary-500 font-semibold'
              : 'text-gray-500'
          )}
          onClick={() => setActiveTab('form')}
        >
          Verifikasi Email
        </button>
        <button
          className={cn(
            'py-2 px-4 w-full',
            activeTab === 'resend'
              ? 'border-b-2 border-primary-500 font-semibold'
              : 'text-gray-500'
          )}
          onClick={() => setActiveTab('resend')}
        >
          Kirim Ulang OTP
        </button>
      </div>

      {activeTab === 'form' ? <VerifyEmailForm /> : <ResendOTPForm />}
    </>
  );
}
