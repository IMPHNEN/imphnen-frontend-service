import { FC, useState, useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { CVModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';


interface CvResumeSectionProps {
  initialFileName: string;
  fullname: string;
  onSave: (cvData: { fileName: string; fileUrl?: string }) => Promise<void>;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isLoading?: boolean;
}

export const CvResumeSection: FC<CvResumeSectionProps> = ({
  initialFileName,
  fullname,
  onSave,
  showNotification,
  isLoading = false,
}) => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [fileName, setFileName] = useState(initialFileName);

  
  useEffect(() => {
    setFileName(initialFileName);
  }, [initialFileName]);

  const handleSave = async (cvData: { fileName: string; fileUrl?: string }) => {



    await onSave(cvData);
  };


  let displayFileName = 'Belum ada CV';
  let fileUrl = '';
  if (fileName) {
    if (fileName.startsWith('http') && fullname) {
      displayFileName = `${fullname}.pdf`;
      fileUrl = fileName;
    } else {
      displayFileName = fileName;

    }
  }

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = displayFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <SectionWrapper
      title="CV/Resume"
      editButton={
        <EditSectionButton
          onClick={() => setIsCVModalOpen(true)}
          disabled={isLoading}
        />
      }
      delay={0.3}
    >
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
          <span className="text-gray-600 text-xs font-medium">PDF</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{displayFileName}</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="flex items-center gap-2"
          disabled={!fileUrl}
          onClick={handleDownload}
        >
          <DownloadOutlined />
          Download
        </Button>
      </div>

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        initialValue={{ fileName, fileUrl: fileName }}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </SectionWrapper>
  );
};


