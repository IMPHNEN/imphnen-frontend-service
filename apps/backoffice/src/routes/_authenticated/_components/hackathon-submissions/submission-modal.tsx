import { FC } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import {
  CloseOutlined,
  LinkOutlined,
  ProjectOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { TAdminSubmissionItem } from '@imphnen-frontend-service/service';
import { cn } from '@imphnen-frontend-service/utils';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: TAdminSubmissionItem;
}

const SubmissionModal: FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  submission,
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-success-50 border-success-200 text-success-800';
      case 'pending':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'approved':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'rejected':
        return 'bg-error-50 border-error-200 text-error-800';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
              <ProjectOutlined className="text-success-600 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {submission.project_name}
              </h2>
              <p className="text-sm text-neutral-500">
                Team ID: {submission.team_id} • Submitted{' '}
                {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            <CloseOutlined className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          <div
            className={cn(
              'flex items-center gap-3 p-4 border rounded-lg',
              getStatusColor(submission.status)
            )}
          >
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                submission.status === 'submitted' && 'bg-success-500',
                submission.status === 'pending' && 'bg-orange-500',
                submission.status === 'approved' && 'bg-blue-500',
                submission.status === 'rejected' && 'bg-error-500'
              )}
            ></div>
            <div>
              <p className="text-sm font-medium">
                Status:{' '}
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </p>
              <p className="text-xs">Submitted by: {submission.submitted_by}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">
              Project Description
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {submission.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-700">
              Project Links
            </h3>

            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <LinkOutlined className="text-primary-500 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-600 mb-1">
                  Repository
                </p>
                <a
                  href={submission.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline break-all"
                >
                  {submission.repository_url}
                </a>
              </div>
            </div>

            {submission.demo_url && (
              <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                <LinkOutlined className="text-primary-500 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-600 mb-1">
                    Live Demo
                  </p>
                  <a
                    href={submission.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 hover:underline break-all"
                  >
                    {submission.demo_url}
                  </a>
                </div>
              </div>
            )}

            {submission.presentation_url && (
              <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                <LinkOutlined className="text-primary-500 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-600 mb-1">
                    Presentation
                  </p>
                  <a
                    href={submission.presentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 hover:underline break-all"
                  >
                    {submission.presentation_url}
                  </a>
                </div>
              </div>
            )}
          </div>

          {submission.screenshots && submission.screenshots.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <FileImageOutlined className="text-primary-500" />
                Screenshots ({submission.screenshots.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {submission.screenshots.map((screenshot, index) => (
                  <a
                    key={index}
                    href={screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-300 transition-colors"
                  >
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Created</p>
              <p className="text-sm text-neutral-900">
                {new Date(submission.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Last Updated</p>
              <p className="text-sm text-neutral-900">
                {new Date(submission.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
