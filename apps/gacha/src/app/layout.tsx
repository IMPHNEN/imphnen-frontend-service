import { Navbar } from '@imphnen-frontend-service/ui/organisms';
import { Outlet } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { ModalLoginProvider } from '@imphnen-frontend-service/utils';

export const AppLayout: FC = (): ReactElement => {
  return (
    <ModalLoginProvider>
      <main className="bg-primary-50 min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    </ModalLoginProvider>
  );
};
export default AppLayout;
