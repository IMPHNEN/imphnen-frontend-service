import { FC, ReactElement } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import { useTeamById, useTeamSubmission } from '@imphnen-frontend-service/service';
import { encodeCertificateId } from '../../../../utils/certificate';

const SubmissionViewPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const { data: teamData } = useTeamById(teamId || '');
  const { data: submissionData, isLoading } = useTeamSubmission(teamId || '', !!teamId);

  const team = teamData?.data;
  const submission = submissionData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading submission...</div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Submission Yet</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Your team hasn't submitted a project</p>
        <Button onClick={() => navigate(`/teams/${teamId}`)}>Back to Team</Button>
      </div>
    );
  }

  const submittedDate = submission.submitted_at
    ? new Date(submission.submitted_at).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not submitted';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Submission</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{team?.name}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate(`/teams/${teamId}`)}>
              Back to Team
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        {submission.status === 'submitted' ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">✅</span>
              <div>
                <h3 className="font-bold text-green-900 dark:text-green-100 text-lg">Project Submitted Successfully</h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Submitted on {submittedDate}
                </p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                  This submission is now read-only and cannot be edited
                </p>
              </div>
            </div>
          </div>
        ) : submission.status === 'pending_verification' ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-500 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">⏳</span>
              <div>
                <h3 className="font-bold text-yellow-900 dark:text-yellow-100 text-lg">Submission Pending Verification</h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Your submission is being processed
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-500 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">📝</span>
              <div>
                <h3 className="font-bold text-orange-900 dark:text-orange-100 text-lg">Draft Submission</h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  This submission is still in draft and has not been finalized
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Banner - Only show when submission is submitted */}
        {submission.status === 'submitted' && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-500 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="text-4xl shrink-0">🏆</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">
                    View Your Certificate
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Congratulations! Your certificate is ready to download and share.
                  </p>
                </div>
              </div>
              <button
                onClick={async () => {
                  const certId = await encodeCertificateId(teamId || '', submission.id);
                  navigate(`/certificate/${encodeURIComponent(certId)}`);
                }}
                className="shrink-0 px-6 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Certificate
              </button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 overflow-hidden">
          {/* Project Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-8">
            <h2 className="text-3xl font-bold mb-2">{submission.project_name}</h2>
            <p className="text-blue-100">Team: {team?.name}</p>
          </div>

          {/* Project Details */}
          <div className="p-8 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Project Description</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{submission.description}</p>
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Repository */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Repository</h3>
                <a
                  href={submission.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 dark:text-primary-400 hover:text-blue-800 dark:hover:text-primary-300"
                >
                  <span>🔗</span>
                  <span className="break-all">{submission.repository_url}</span>
                </a>
              </div>

              {/* Demo URL */}
              {submission.demo_url && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Live Demo</h3>
                  <a
                    href={submission.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 dark:text-primary-400 hover:text-blue-800 dark:hover:text-primary-300"
                  >
                    <span>🌐</span>
                    <span className="break-all">{submission.demo_url}</span>
                  </a>
                </div>
              )}

            </div>

            {/* Screenshots */}
            {submission.screenshots && submission.screenshots.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Screenshots ({submission.screenshots.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {submission.screenshots.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={url}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-primary-500 transition-colors cursor-pointer"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-t-4 border-blue-600 dark:border-primary-500">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Submission Information</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    submission.status === 'submitted'
                      ? 'text-green-600 dark:text-green-400'
                      : submission.status === 'pending_verification'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {submission.status === 'submitted'
                      ? '✓ Submitted'
                      : submission.status === 'pending_verification'
                        ? '⏳ Pending Verification'
                        : '📝 Draft'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{submittedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Submission ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">
                    {submission.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Read-only Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This submission is now locked and cannot be edited or deleted.
                If you need to make changes, please contact the hackathon organizers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionViewPage;
