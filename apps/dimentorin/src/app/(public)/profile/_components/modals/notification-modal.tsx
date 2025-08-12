import { FC } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message?: string;
}

export const NotificationModal: FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleOutlined className="text-green-600 text-xl" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <CloseCircleOutlined className="text-red-600 text-xl" />
              </div>
            )}
            <h2 className={`text-xl font-semibold px-3 py-1 rounded-md flex-1 ${isSuccess ? 'bg-blue-50 text-blue-900' : 'bg-red-50 text-red-900'}`}>
              {title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {message && (
            <p className="text-gray-700 mb-6">{message}</p>
          )}

          <div className="flex justify-center">
            <Button
              variant={isSuccess ? 'primary' : 'danger'}
              onClick={onClose}
              className="min-w-[120px]"
            >
              Selesai
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
