'use client';

import React from 'react';
import { Guard } from '@imphnen-frontend-service/utils';

interface MentorGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const MentorGuard: React.FC<MentorGuardProps> = ({
  children,
  fallback = (
    <div className="p-4 text-center text-red-500">
      <p>Akses ditolak: Anda tidak memiliki izin untuk mengakses fitur mentor.</p>
    </div>
  )
}) => {
  return (
    <Guard
      permissions={['mentor', 'admin']}
      fallback={fallback}
    >
      {children}
    </Guard>
  );
};
