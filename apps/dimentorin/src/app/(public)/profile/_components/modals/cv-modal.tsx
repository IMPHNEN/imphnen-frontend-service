import { FC, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';

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
    setCvData(initialValue); // Reset to initial value
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
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit CV/Resume</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Current File */}
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

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload New CV/Resume
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadOutlined className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your PDF file here, or{' '}
                <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                  browse
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4">
          <Button
            variant="text"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
