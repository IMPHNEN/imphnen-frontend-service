import { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSuspendOrBan: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow w-full max-w-lg">
          <div className="border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-p3 font-semibold">Suspend or Ban User</h2>
            <button className="p-2" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <label className="text-label2 text-neutral-700">Reason</label>
            <textarea
              className="border border-neutral-200 rounded-md px-3 py-2"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button className="px-3 py-2 rounded-md border" onClick={onClose}>
                Cancel
              </button>
              <button className="px-3 py-2 rounded-md bg-amber-600 text-white">
                Suspend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuspendOrBan;
