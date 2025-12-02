import { FC } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import {
  CloseOutlined,
  LinkOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
}

const SubmissionModal: FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  teamId,
  teamName,
}) => {
  if (!isOpen) return null;

  // Mock submission data
  const mockSubmission = {
    id: `submission-${teamId}`,
    project_name: `${teamName} Project`,
    repository_url: `https://github.com/${teamName
      .toLowerCase()
      .replace(/\s+/g, '-')}/hackathon-project`,
    demo_url: `https://${teamName
      .toLowerCase()
      .replace(/\s+/g, '-')}.vercel.app`,
    presentation_url: `https://docs.google.com/presentation/d/${teamId}/edit`,
    submitted_at: new Date().toISOString(),
    status: 'submitted',
    description:
      'An innovative solution built during the IMPHNEN x Kolosal.ai Hackathon 2025.',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
              <ProjectOutlined className="text-success-600 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Project Submission
              </h2>
              <p className="text-sm text-neutral-500">
                {teamName} - Hackathon Submission Details
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="shrink-0"
          >
            <CloseOutlined />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Submission Status */}
          <div className="flex items-center gap-3 p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-success-500"></div>
            <div>
              <p className="text-sm font-medium text-success-800">
                Submission Completed
              </p>
              <p className="text-xs text-success-600">
                Submitted on{' '}
                {new Date(mockSubmission.submitted_at).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
              </p>
            </div>
          </div>

          {/* Project Information */}
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Project Name
              </label>
              <p className="text-sm text-neutral-900 p-3 bg-neutral-50 rounded-lg">
                {mockSubmission.project_name}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Project Description
              </label>
              <p className="text-sm text-neutral-900 p-3 bg-neutral-50 rounded-lg">
                {mockSubmission.description}
              </p>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Repository
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-700 flex-1 truncate">
                    {mockSubmission.repository_url}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() =>
                      window.open(mockSubmission.repository_url, '_blank')
                    }
                  >
                    <LinkOutlined className="text-xs" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Live Demo
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-700 flex-1 truncate">
                    {mockSubmission.demo_url}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() =>
                      window.open(mockSubmission.demo_url, '_blank')
                    }
                  >
                    <LinkOutlined className="text-xs" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Presentation
              </label>
              <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                <span className="text-sm text-neutral-700 flex-1 truncate">
                  {mockSubmission.presentation_url}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                  onClick={() =>
                    window.open(mockSubmission.presentation_url, '_blank')
                  }
                >
                  <LinkOutlined className="text-xs" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Note */}
          <div className="p-4 bg-info-50 border border-info-200 rounded-lg">
            <p className="text-sm text-info-800">
              <strong>Note:</strong> This is a submission preview. The team has
              successfully submitted their project. You can review the
              submission details and access the project links above.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                // Navigate to hackathon-submissions page
                console.log('Navigate to full submissions page');
                // You can implement navigation here
                onClose();
              }}
              className="flex items-center gap-2"
            >
              <ProjectOutlined />
              View All Submissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
