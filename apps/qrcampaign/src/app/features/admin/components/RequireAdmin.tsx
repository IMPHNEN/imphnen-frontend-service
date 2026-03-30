import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/auth.store';

interface RequireAdminProps {
  children: JSX.Element;
}

export const RequireAdmin = ({ children }: RequireAdminProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role?.name;
  if (userRole !== 'Admin' && userRole !== 'Super Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
