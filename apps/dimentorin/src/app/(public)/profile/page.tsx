import { FC, ReactElement } from 'react';
import { ProfileForm, ProfileSidebar } from './_components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';

export const Components: FC = (): ReactElement => {
  return (
    <main className="min-h-screen">
      {/* Header with back button */}
      <div className="border-b border-gray-200">
        <div className="w-full px-8 md:px-[60px] lg:px-20 py-4">
          <div className="max-w-7xl mx-auto">
            <Button variant="primary" className="flex items-center gap-2">
              <ArrowLeftOutlined />
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Title */}
      <div className="w-full px-8 md:px-[60px] lg:px-20 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="w-full px-8 md:px-[60px] lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Main Content - Profile Form */}
            <div className="lg:col-span-8 order-1">
              <ProfileForm />
            </div>

            {/* Sidebar - Career Status & Personal Info */}
            <div className="lg:col-span-4 order-2">
              <ProfileSidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Components;
