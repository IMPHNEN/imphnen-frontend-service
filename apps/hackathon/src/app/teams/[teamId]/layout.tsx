import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Navigation } from '../../../components/navigation';

interface TeamLayoutProps {
  children?: ReactNode;
}

export const TeamLayout: FC<TeamLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default TeamLayout;
