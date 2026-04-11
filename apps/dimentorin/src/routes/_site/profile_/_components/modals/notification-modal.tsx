import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { ModalButton } from '../buttons/modal-button';

export type NotificationType = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message?: string;
  header: string;
}

interface NotificationModalProps extends NotificationType {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message?: string;
  header: string;
}

export const NotificationModal: FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  header,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">{header}</h2>
          </div>
        </div>

        <div className="p-8 text-center">

          <div className="mb-6">
            {isSuccess ? (
              <div className="w-30 h-30 mx-auto mb-4">
                <img
                  src="/image/success.png"
                  alt="Success"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloseOutlined className="text-white text-3xl" />
              </div>
            )}

            <h2 className={`text-lg font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {title}
            </h2>
            {!isSuccess && message && (
              <div className="mt-2 text-sm text-red-500 whitespace-pre-line">{message}</div>
            )}
          </div>

          <ModalButton
            variant="primary"
            onClick={onClose}
            className="w-full bg-[#23A1EB] hover:bg-[#23A1EB]/90"
          >
            Selesai
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

