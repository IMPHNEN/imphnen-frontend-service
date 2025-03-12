import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@imphnen-frontend-service/ui/organisms';

export const AppLayout: FC = (): ReactElement => {
  return (
    <main className="bg-primary-50 min-h-screen px-20 py-[60px]">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default AppLayout;
