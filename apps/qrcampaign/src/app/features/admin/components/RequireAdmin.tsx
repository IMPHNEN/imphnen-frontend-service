import { useAuthStore } from '../../auth/store/auth.store';

interface RequireAdminProps {
  children: JSX.Element;
}

export const RequireAdmin = ({ children }: RequireAdminProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return null;
  }

  const userRole = user?.role?.name;
  if (userRole !== 'Admin' && userRole !== 'Super Admin') {
    return null;
  }

  return children;
};
