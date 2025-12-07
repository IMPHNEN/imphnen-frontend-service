import { FC, ReactElement, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { decodeCertificateId } from '../../../utils/certificate';
import { useTeamById, useTeamSubmission } from '@imphnen-frontend-service/service';

interface DecodedCert {
  teamId: string;
  submissionId: string;
}

const CertificatePage: FC = (): ReactElement => {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const [decodedInfo, setDecodedInfo] = useState<DecodedCert | null>(null);
  const [error, setError] = useState<string | null>(null);
  const teamNameRef = useRef<HTMLHeadingElement>(null);
  const projectNameRef = useRef<HTMLSpanElement>(null);
  const [teamNameFontSize, setTeamNameFontSize] = useState('2.25rem');
  const [projectNameFontSize, setProjectNameFontSize] = useState('1.5rem');

  useEffect(() => {
    if (certId) {
      decodeCertificateId(certId)
        .then(setDecodedInfo)
        .catch(() => {
          setError('Invalid certificate ID');
        });
    }
  }, [certId]);

  const { data: teamData, isLoading: isLoadingTeam } = useTeamById(decodedInfo?.teamId || '', !!decodedInfo?.teamId);
  const { data: submissionData, isLoading: isLoadingSubmission } = useTeamSubmission(
    decodedInfo?.teamId || '',
    !!decodedInfo?.teamId
  );

  const team = teamData?.data;
  const submission = submissionData?.data;

  const isLoading = (!decodedInfo && !error) || isLoadingTeam || isLoadingSubmission;

  // Dynamic font sizing: shrink by 2px if height exceeds 80px
  useEffect(() => {
    const adjustFontSize = (element: HTMLElement | null, maxHeight: number, startSize: number, setter: (size: string) => void) => {
      if (!element) return;

      let currentSize = startSize;
      element.style.fontSize = `${currentSize}px`;

      while (element.offsetHeight > maxHeight && currentSize > 1) {
        currentSize -= 2;
        element.style.fontSize = `${currentSize}px`;
      }

      setter(`${currentSize}px`);
    };

    const timer = setTimeout(() => {
      adjustFontSize(teamNameRef.current, 80, 36, setTeamNameFontSize);
      adjustFontSize(projectNameRef.current, 80, 24, setProjectNameFontSize);
    }, 0);

    return () => clearTimeout(timer);
  }, [team?.name, submission?.project_name]);

  if (error || !certId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Invalid Certificate</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error || 'The certificate ID is invalid or malformed.'}
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">Loading certificate...</div>
        </div>
      </div>
    );
  }

  if (!submission || submission.id !== decodedInfo?.submissionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Certificate Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The submission associated with this certificate could not be found.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificate</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{team?.name}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate(`/teams/${decodedInfo?.teamId}/submission`)}>
              Back to Submission
            </Button>
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Certificate Container */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-gray-950/50 overflow-hidden">
          {/* Certificate Design Area */}
          <div
            id="certificate"
            className="p-12 sm:p-16 bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border-4 border-amber-600 dark:border-amber-500 min-h-[500px] flex flex-col items-center justify-center space-y-6"
          >
            {/* Decorative Element */}
            <div className="text-5xl">🏆</div>

            {/* Certificate Title */}
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-amber-900 dark:text-amber-100">
              Certificate of Participation
            </h2>

            {/* Decorative Line */}
            <div className="w-32 h-1 bg-linear-to-r from-amber-600 to-amber-400"></div>

            {/* Team Name */}
            <div className="text-center space-y-2 w-full px-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-widest">
                This Certificate is Proudly Presented To
              </p>
              <h3 ref={teamNameRef} className="font-bold text-gray-900 dark:text-white wrap-break-word" style={{ fontSize: teamNameFontSize, lineHeight: '1.2', wordBreak: 'break-word' }}>
                {team?.name}
              </h3>
            </div>

            {/* Achievement Text */}
            <div className="text-center max-w-2xl w-full px-4">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                For successfully submitting their hackathon project
              </p>
                <p ref={projectNameRef} className="font-bold text-amber-900 dark:text-amber-100 wrap-break-word block" style={{ fontSize: projectNameFontSize, lineHeight: '1.3', wordBreak: 'break-word' }}>
                  {submission.project_name}
                </p>
            </div>

            {/* Submission Details */}
            <div className="grid grid-cols-2 gap-8 pt-6 text-center w-full max-w-md">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Submission ID
                </p>
                <p className="text-xs font-mono text-gray-900 dark:text-white break-all">
                  {submission.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Submitted
                </p>
                <p className="text-xs text-gray-900 dark:text-white">
                  {submission.submitted_at
                    ? new Date(submission.submitted_at).toLocaleDateString('id-ID')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-xs text-gray-600 dark:text-gray-400 pt-4 italic">
              Authenticated Certificate - {new Date().getFullYear()}
            </p>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 flex gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              🖨️ Print Certificate
            </Button>
            <Button
              onClick={() => navigate(`/teams/${decodedInfo?.teamId}/submission`)}
              variant="secondary"
            >
              View Submission
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Certificate Information</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This certificate is a digital record of your hackathon participation and project submission.
            You can print or save this page as a PDF for your records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
