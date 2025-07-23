import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: FC = (): ReactElement => {
  return (
    <main className="bg-primary-50 min-h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
