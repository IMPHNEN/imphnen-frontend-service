import { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Icon } from '@iconify/react';
import { decodeWinnerCertificateId } from '../../../../utils/certificate';
import {
  useAuthStore,
  useMyTeams,
  useTeamById,
  useTeamSubmission,
  useWinners,
} from '@imphnen-frontend-service/service';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

type WinnerEntry = {
  team_id: string;
  rank: number;
  team?: {
    id: string;
    name: string;
  };
};

const formatOrdinalRank = (rank: number): string => {
  const mod100 = rank % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${rank}th`;

  switch (rank % 10) {
    case 1:
      return `${rank}st`;
    case 2:
      return `${rank}nd`;
    case 3:
      return `${rank}rd`;
    default:
      return `${rank}th`;
  }
};

const CERT_WIDTH = 842 * 2;
const CERT_HEIGHT = 595 * 2;

const EXPORT_SCALE = 2;

const LAYOUT_BASE_WIDTH = 1000;
const LAYOUT_SCALE = CERT_WIDTH / LAYOUT_BASE_WIDTH;
const s = (px: number) => Math.round(px * LAYOUT_SCALE);

const CertificateWinnerPage: FC = (): ReactElement => {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { data: myTeamsData } = useMyTeams();
  const {
    data: winnersResponse,
    isLoading: isLoadingWinners,
    isError: isWinnersError,
  } = useWinners();

  const [decodedTeamId, setDecodedTeamId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateImage, setCertificateImage] = useState<string>('');
  const [showTemplate, setShowTemplate] = useState(true);

  useEffect(() => {
    if (!certId) return;

    decodeWinnerCertificateId(certId)
      .then((decoded) => setDecodedTeamId(decoded.teamId))
      .catch(() => setError('Invalid certificate ID'));
  }, [certId]);

  const winners = useMemo(
    () => (winnersResponse?.data || []) as WinnerEntry[],
    [winnersResponse?.data]
  );
  const winnerEntry = useMemo(() => {
    if (!decodedTeamId) return undefined;
    return winners.find((w) => w.team_id === decodedTeamId);
  }, [decodedTeamId, winners]);

  const rankLabel = useMemo(() => {
    if (!winnerEntry?.rank) return '';
    return formatOrdinalRank(winnerEntry.rank);
  }, [winnerEntry?.rank]);

  const { data: teamData, isLoading: isLoadingTeam } = useTeamById(
    decodedTeamId,
    !!decodedTeamId
  );

  const { data: submissionData, isLoading: isLoadingSubmission } =
    useTeamSubmission(decodedTeamId, !!decodedTeamId);

  const team = teamData?.data;
  const submission = submissionData?.data;
  const submissionName = submission?.project_name || '(Submission unavailable)';

  const memberNames = useMemo(() => {
    const members = team?.members || [];
    return members
      .map((m) => m.user?.fullname)
      .filter((name): name is string => !!name);
  }, [team?.members]);

  const isWinnerTeam = !!winnerEntry;
  const isTeamMember =
    !!session?.user?.id &&
    !!decodedTeamId &&
    (myTeamsData?.data || []).some(
      (t) => (t as { id?: string } | null | undefined)?.id === decodedTeamId
    );

  useEffect(() => {
    if (!certId) return;

    const encodedCertId = encodeURIComponent(certId);
    const certificateUrl = `${window.location.origin}/certificate/winner/${encodedCertId}`;

    QRCode.toDataURL(certificateUrl, {
      width: s(200),
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then(setQrCodeUrl)
      .catch((err) => console.error('QR Code generation failed:', err));
  }, [certId]);

  useEffect(() => {
    const generateCertificate = async () => {
      if (!certificateRef.current) return;
      if (!team?.name) return;
      if (!qrCodeUrl) return;
      if (!winnerEntry?.rank) return;
      if (isLoadingSubmission) return;

      setIsGenerating(true);
      try {
        setShowTemplate(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const canvas = await html2canvas(certificateRef.current, {
          scale: EXPORT_SCALE,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: CERT_WIDTH,
          height: CERT_HEIGHT,
          allowTaint: true,
          imageTimeout: 0,
          removeContainer: true,
        });

        const imageUrl = canvas.toDataURL('image/png', 1.0);
        setCertificateImage(imageUrl);
        setShowTemplate(false);
      } catch (e) {
        console.error('Failed to generate certificate:', e);
      } finally {
        setIsGenerating(false);
      }
    };

    generateCertificate();
  }, [
    team?.name,
    memberNames,
    qrCodeUrl,
    winnerEntry?.rank,
    isLoadingSubmission,
    submissionName,
  ]);

  const handleDownloadCertificate = () => {
    if (!certificateImage) return;

    const link = document.createElement('a');
    link.href = certificateImage;
    link.download = `winner-certificate-${team?.name || 'hackathon'}.png`;
    link.click();
  };

  const handlePrintCertificate = () => {
    if (!certificateImage) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${team?.name}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            img { max-width: 100%; height: auto; }
            @media print {
              @page { size: A4 landscape; margin: 0; }
              body { margin: 0; }
              img { width: 100%; height: auto; }
            }
          </style>
        </head>
        <body>
          <img src="${certificateImage}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  if (error || !certId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Invalid Certificate
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error || 'The certificate ID is invalid or malformed.'}
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (!decodedTeamId || isLoadingTeam) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">
            Loading certificate...
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingWinners) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">
            Loading winners...
          </div>
        </div>
      </div>
    );
  }

  if (isWinnersError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Unable to Load Winners
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please try again later.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (!isWinnerTeam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Certificate Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This team is not listed as a hackathon winner.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (!team?.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Team Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The team associated with this certificate could not be loaded.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Winner Certificate
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {team.name}
              </p>
            </div>
            {isTeamMember && (
              <Button
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="certificate-wrapper"
      >
        <div
          className={showTemplate ? 'block' : 'hidden'}
          style={{ position: 'absolute', left: '-9999px' }}
        >
          <div
            ref={certificateRef}
            id="certificate-template"
            style={{
              position: 'relative',
              backgroundImage: 'url(/images/blank_winner_cert.svg)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: `${CERT_WIDTH}px`,
              height: `${CERT_HEIGHT}px`,
            }}
          >
            <style>{`
              #winner-members li::marker {
                color: #59bef5;
              }
            `}</style>

            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '3.5%',
                width: '55%',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 'bold',
                  color: '#59bef5',
                  textAlign: 'left',
                  fontSize: `${s(28)}px`,
                  lineHeight: '1.2',
                  wordBreak: 'break-word',
                  margin: 0,
                }}
              >
                {team.name}
              </h3>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '40.5%',
                left: '3.5%',
                width: '55%',
              }}
            >
              <ul
                id="winner-members"
                style={{
                  margin: 0,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: `${s(18)}px`,
                  lineHeight: '1.35',
                  color: '#59bef5',
                }}
              >
                {(memberNames.length
                  ? memberNames
                  : ['(Members unavailable)']
                ).map((name) => (
                  <li key={name}>• {name}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: '3.5%',
                width: '60%',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: `${s(18)}px`,
                  lineHeight: '1.35',
                  color: '#6B6B6B',
                }}
              >
                Diberikan sebagai penghargaan atas pencapaian meraih
                <br />
                <b>JUARA {winnerEntry.rank}</b> pada Hackathon IMPHNEN x
                Kolosal.ai
                <br />
                <span>
                  dengan nama project: <b>{submissionName}</b>
                </span>
              </p>
            </div>

            {!!rankLabel && (
              <div
                style={{
                  position: 'absolute',
                  top: '8%',
                  right: '8.5%',
                  width: `${s(190)}px`,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: `${s(6)}px ${s(16)}px`,
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    color: '#78350F',
                    fontSize: `${s(24)}px`,
                    lineHeight: '1',
                  }}
                >
                  {rankLabel}
                </div>
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                top: '33%',
                right: '9.3%',
                width: `${s(190)}px`,
                height: `${s(190)}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="Certificate QR Code"
                  style={{
                    width: `${s(190)}px`,
                    height: `${s(190)}px`,
                    display: 'block',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-gray-950/50 overflow-hidden p-2">
          {isGenerating && (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-gray-600 dark:text-gray-400">
                  Generating certificate...
                </div>
              </div>
            </div>
          )}

          {certificateImage && !isGenerating && (
            <img
              src={certificateImage}
              alt="Winner Certificate"
              className="w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}

          {isTeamMember && (
            <div className="bg-gray-50 dark:bg-gray-900 p-6 grid grid-cols-2 xl:grid-cols-3 gap-3 justify-center no-print">
              <Button
                variant="secondary"
                onClick={handleDownloadCertificate}
                className="flex items-center gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Icon
                      icon="svg-spinners:ring-resize"
                      width="18"
                      height="18"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icon
                      icon="heroicons:arrow-down-tray"
                      width="18"
                      height="18"
                    />
                    Download
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={handlePrintCertificate}
                className="flex items-center gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Icon
                      icon="svg-spinners:ring-resize"
                      width="18"
                      height="18"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:printer" width="18" height="18" />
                    Print
                  </>
                )}
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="secondary"
                className="col-span-2 flex items-center gap-2 xl:col-span-1"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 no-print">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
            Certificate Information
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This certificate is a digital record of your hackathon achievement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateWinnerPage;
