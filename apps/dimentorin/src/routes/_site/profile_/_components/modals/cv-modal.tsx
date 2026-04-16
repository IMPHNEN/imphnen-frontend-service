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

  
  useEffect(() => {
    setCvData(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(cvData);

      onClose();
    } catch (error) {
      console.error('Save failed:', error);

    }
  };

  const handleCancel = () => {
    setCvData(initialValue);
    onClose();
  };

  const handleFileSelect = async (file: File) => {
    try {
      setIsUploading(true);


      if (!file.type.includes('pdf')) {
        throw new Error('Please select a PDF file');
      }


      const uploadResult = await uploadCVMutation.mutateAsync(file);

      console.log('CV upload response:', uploadResult);


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

      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">

      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F6F6F6] p-5 sm:p-6">
        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">CV/Resume</h2>
        </div>

        <div className="space-y-5 pt-8">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-medium leading-7 text-[#4B4B4B]">
                Upload CV/Resume
              </h3>
              <FileUploader
                accept=".pdf"
                maxSize={10 * 1024 * 1024}
                onFileSelect={handleFileSelect}
                isLoading={isUploading}
                dragAndDrop={true}
                description="Klik atau tarik file PDF yang ingin di upload"
                className="w-full"
              />
              <p className="mt-2 text-sm leading-5 text-[#8B8B8B]">
                Format yang didukung: PDF • Maksimal ukuran: 10MB
              </p>
            </div>

            {cvData.fileName && (
              <div className="rounded-[6px] border border-[#BFDCF4] bg-[#EDF7FF] p-4">
                <h4 className="mb-2 text-sm font-medium leading-5 text-[#1F6FA3]">File Terpilih</h4>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#23A1EB]">
                    <span className="text-xs font-bold text-white">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-5 text-[#1F6FA3]">{cvData.fileName}</p>
                    <p className="text-xs leading-5 text-[#3A85B8]">Siap untuk disimpan</p>
                  </div>
                  {cvData.fileUrl && (
                    <a
                      href={cvData.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium leading-5 text-[#1F6FA3] underline"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-8">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="w-[110px]"
            disabled={isLoading || isUploading}
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="w-[110px]"
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


