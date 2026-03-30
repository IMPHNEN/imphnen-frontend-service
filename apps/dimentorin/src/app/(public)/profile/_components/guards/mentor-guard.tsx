'use client';

import React from 'react';

interface MentorGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const MentorGuard: React.FC<MentorGuardProps> = ({
  children,
}) => {
  return <>{children}</>;
};
