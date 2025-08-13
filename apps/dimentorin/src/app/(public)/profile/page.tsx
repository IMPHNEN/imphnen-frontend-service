import { FC, ReactElement, useState } from 'react';
import { ProfileForm, ProfileSidebar } from './_components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { NotificationModal, NotificationType } from './_components/modals/notification-modal';

export const Components: FC = (): ReactElement => {
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showNotification = (type: NotificationType['type'], title: string, message?: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="min-h-screen">
      <div className="">
        <div className="w-full px-8 md:px-[60px] lg:px-20 py-4">
          <div className="max-w-7xl mx-auto">
            <Button variant="primary" className="flex items-center gap-2">
              <ArrowLeftOutlined />
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-8 md:px-[60px] lg:px-20 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
        </div>
      </div>

      <div className="w-full px-8 md:px-[60px] lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 order-1">
              <ProfileForm showNotification={showNotification} />
            </div>

            <div className="lg:col-span-4 order-2">
              <ProfileSidebar showNotification={showNotification} />
            </div>
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        header="Profile"
      />
    </main>
  );
};

export default Components;
