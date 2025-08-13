import { FC, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ModalButton } from '../buttons/modal-button';

interface CVData {
  fileName: string;
  fileUrl?: string;
}

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: CVData;
  onSave: (value: CVData) => void;
}

export const CVModal: FC<CVModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [cvData, setCvData] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = () => {
    onSave(cvData);
    onClose();
  };

  const handleCancel = () => {
    setCvData(initialValue);
    onClose();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCvData({
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setCvData({
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />


      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto">

        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit CV/Resume</h2>
          </div>
        </div>


        <div className="px-6 py-4 space-y-4">
            <div>
              <button
                type="button"
                className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging
                ? 'border-[#23A1EB] bg-[#23A1EB]/20'
                : 'border-[#23A1EB] bg-[#23A1EB]/5 hover:bg-[#23A1EB]/10'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
              // Trigger file input click
              document.getElementById('cv-upload-input')?.click();
              }}
              onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('cv-upload-input')?.click();
              }
              }}
              aria-label="Upload CV/Resume"
            >
              <UploadOutlined className="w-8 h-8 text-[#23A1EB] mx-auto mb-2" />
              <p className="text-sm text-[#23A1EB] mb-2">
              Klik atau tarik file yang ingin di upload{' '}
              <label className="text-[#23A1EB] hover:text-[#1e90d6] cursor-pointer font-medium">
                <input
                id="cv-upload-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden" />
                <span className="sr-only">Browse for CV/Resume PDF file</span>
              </label>
              </p>
              <p className="text-xs text-gray-500">(Format .pdf, max 10mb)</p>
            </button>
            </div>

          {cvData.fileName && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current File</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-xs font-medium">PDF</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{cvData.fileName}</p>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="flex gap-3 p-6 pt-4">
          <ModalButton variant="secondary"
            onClick={handleCancel}
            className="flex-1 bg-white shadow-md"
          >
            Batal
          </ModalButton>
          <ModalButton variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Simpan
          </ModalButton>
        </div>
      </div>
    </div>
  );
};


