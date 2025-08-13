import { FC, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { CVModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface CvResumeSectionProps {
  initialFileName: string;
  onSave: (cvData: { fileName: string }) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const CvResumeSection: FC<CvResumeSectionProps> = ({
  initialFileName,
  onSave,
  showNotification,
}) => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [fileName, setFileName] = useState(initialFileName);

  const handleSave = (cvData: { fileName: string }) => {
    setFileName(cvData.fileName);
    onSave(cvData);
    showNotification('success', 'Perubahan Berhasil Disimpan', '');
  };

  return (
    <SectionWrapper
      title="CV/Resume"
      editButton={
        <EditSectionButton onClick={() => setIsCVModalOpen(true)} />
      }
      delay={0.3}
    >
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
          <span className="text-gray-600 text-xs font-medium">PDF</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{fileName}</p>
        </div>
        <Button variant="primary" size="sm" className="flex items-center gap-2">
          <DownloadOutlined />
          Download
        </Button>
      </div>

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        initialValue={{ fileName }}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


