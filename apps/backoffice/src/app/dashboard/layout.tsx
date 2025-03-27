import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { BackofficeSidebar } from '@imphnen-frontend-service/ui/organisms';

export const AppLayout: FC = (): ReactElement => {
  return (
    <div className="bg-primary-50 min-h-screen flex justify-center">
      <div className="bg-primary-50 min-h-screen max-w-[1280px] w-full flex">
        <BackofficeSidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
