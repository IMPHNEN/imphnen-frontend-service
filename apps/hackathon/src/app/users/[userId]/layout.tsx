import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Navigation } from '../../../components/navigation';

interface UserLayoutProps {
  children?: ReactNode;
}

export const UserLayout: FC<UserLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default UserLayout;
