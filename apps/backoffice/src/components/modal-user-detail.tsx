import { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalUserDetail: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow w-full max-w-3xl">
          <div className="border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-p3 font-semibold">User Detail</h2>
            <button className="p-2" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-label1 font-medium mb-2">Account Profile</h3>
              <div className="text-label2 text-neutral-600">
                Email, provider, createdAt
              </div>
            </div>
            <div>
              <h3 className="text-label1 font-medium mb-2">Detail Profile</h3>
              <div className="text-label2 text-neutral-600">
                Name, phone, city
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-label1 font-medium mb-2">Activity Log</h3>
              <div className="text-label2 text-neutral-600">
                Recent actions...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserDetail;
