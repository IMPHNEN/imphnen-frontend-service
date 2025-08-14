import { FC, useState, useEffect } from 'react';
import { ModalButton } from '../buttons/modal-button';
import { useUploadCV } from '@imphnen-frontend-service/service';
import { FileUploader } from '../shared/file-uploader';

interface CVData {
  fileName: string;
  fileUrl?: string;
}

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: CVData;
  onSave: (value: CVData) => Promise<void>;
  isLoading?: boolean;
}

export const CVModal: FC<CVModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [cvData, setCvData] = useState(initialValue);
  const [isUploading, setIsUploading] = useState(false);
  const uploadCVMutation = useUploadCV();

  // Sync local state with backend data
  useEffect(() => {
    setCvData(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(cvData);
      // Only close modal after successful backend response
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      // Modal stays open on error so user can retry
    }
  };

  const handleCancel = () => {
    setCvData(initialValue);
    onClose();
  };

  const handleFileSelect = async (file: File) => {
    try {
      setIsUploading(true);

      // Validate file type
      if (!file.type.includes('pdf')) {
        throw new Error('Please select a PDF file');
      }

      // Upload file to backend
      const uploadResult = await uploadCVMutation.mutateAsync(file);

      console.log('CV upload response:', uploadResult);

      // Extract data from response structure - handle nested structure from API
      interface UploadData {
        original_filename?: string;
        filename?: string;
        url?: string;
      }

      const uploadData = ('data' in uploadResult ? (uploadResult as { data: UploadData }).data : uploadResult as UploadData);

      setCvData({
        fileName: uploadData.original_filename || uploadData.filename || file.name,
        fileUrl: uploadData.url || '',
      });

      console.log('CV uploaded successfully, URL:', uploadData.url);
    } catch (error) {
      console.error('CV upload error:', error);
      // Reset file input if upload fails
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } finally {
      setIsUploading(false);
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


        <div className="px-6 py-6 space-y-6">
          {/* Upload Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Upload CV/Resume
              </h3>
              <FileUploader
                accept=".pdf"
                maxSize={10 * 1024 * 1024} // 10MB
                onFileSelect={handleFileSelect}
                isLoading={isUploading}
                dragAndDrop={true}
                description="Klik atau tarik file PDF yang ingin di upload"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Format yang didukung: PDF • Maksimal ukuran: 10MB
              </p>
            </div>

            {/* Current File Display */}
            {cvData.fileName && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-3">File Terpilih</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900 text-sm">{cvData.fileName}</p>
                    <p className="text-xs text-blue-600">Siap untuk disimpan</p>
                  </div>
                  {cvData.fileUrl && (
                    <a
                      href={cvData.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="flex-1"
            disabled={isLoading || isUploading}
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="flex-1"
            disabled={isLoading || isUploading || !cvData.fileName}
            loading={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan CV'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
};


