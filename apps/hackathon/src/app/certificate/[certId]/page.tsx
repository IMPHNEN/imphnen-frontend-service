import { FC, ReactElement, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { decodeCertificateId } from '../../../utils/certificate';
import {
  useCertificatePublicData,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

interface DecodedCert {
  teamId: string;
  submissionId: string;
  userId: string;
}

const CertificatePage: FC = (): ReactElement => {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [decodedInfo, setDecodedInfo] = useState<DecodedCert | null>(null);
  const [error, setError] = useState<string | null>(null);
  const teamNameRef = useRef<HTMLHeadingElement>(null);
  const userNameRef = useRef<HTMLHeadingElement>(null);
  const [teamNameFontSize, setTeamNameFontSize] = useState('2.25rem');
  const [userNameFontSize, setUserNameFontSize] = useState('2.25rem');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateImage, setCertificateImage] = useState<string>('');
  const [showTemplate, setShowTemplate] = useState(true);

  useEffect(() => {
    if (certId) {
      decodeCertificateId(certId)
        .then(setDecodedInfo)
        .catch(() => {
          setError('Invalid certificate ID');
        });
    }
  }, [certId]);

  // Fetch certificate data using the new endpoint
  const { data: certificateData, isLoading: isLoadingCertificate } = useCertificatePublicData(
    decodedInfo?.userId || '',
    !!decodedInfo?.userId
  );

  // Generate QR Code
  useEffect(() => {
    if (certId) {
      // Use encodeURIComponent to properly encode the certId for the URL
      const encodedCertId = encodeURIComponent(certId);
      const certificateUrl = `${window.location.origin}/certificate/${encodedCertId}`;
      QRCode.toDataURL(certificateUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then(setQrCodeUrl)
        .catch((err) => console.error('QR Code generation failed:', err));
    }
  }, [certId]);

  const certificate = certificateData?.data;
  const team = certificate?.team;
  const submission = certificate?.submission;
  const certificateUser = certificate?.user;

  const isLoading = (!decodedInfo && !error) || isLoadingCertificate;

  // Certificate name from the user data
  const certificateName = certificateUser?.fullname;

  // Check if current user is viewing their own certificate (team member)
  const isTeamMember = session?.user?.id === decodedInfo?.userId;

  // Dynamic font sizing: shrink by 2px if height exceeds 80px
  useEffect(() => {
    const adjustFontSize = (
      element: HTMLElement | null,
      maxHeight: number,
      startSize: number,
      setter: (size: string) => void
    ) => {
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
      adjustFontSize(teamNameRef.current, 80, 20, setTeamNameFontSize);
      adjustFontSize(userNameRef.current, 80, 36, setUserNameFontSize);
    }, 0);

    return () => clearTimeout(timer);
  }, [team?.name, certificateName]);

  // Generate certificate canvas screenshot
  useEffect(() => {
    const generateCertificate = async () => {
      if (!certificateRef.current || !team || !submission || !qrCodeUrl) return;

      setIsGenerating(true);
      try {
        // Wait a bit for fonts and images to load
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: 1000,
          height: (1000 * 2480) / 3508,
        });

        const imageUrl = canvas.toDataURL('image/png');
        setCertificateImage(imageUrl);
        setShowTemplate(false);
      } catch (error) {
        console.error('Failed to generate certificate:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateCertificate();
  }, [team, submission, qrCodeUrl]);

  // Download certificate
  const handleDownloadCertificate = () => {
    if (!certificateImage) return;

    const link = document.createElement('a');
    link.href = certificateImage;
    link.download = `certificate-${team?.name || 'hackathon'}.png`;
    link.click();
  };

  // Print certificate
  const handlePrintCertificate = () => {
    if (!certificateImage) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
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
    }
  };

  if (error || !certId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">❌</div>
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

  if (isLoading) {
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

  if (!certificateUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Certificate Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The user associated with this certificate could not be found.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          body * {
            visibility: hidden;
          }
          #certificate-wrapper {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: relative;
            max-width: 100%;
            page-break-after: avoid;
          }
          .no-print {
            display: none !important;
          }
        }

        /* Mobile responsive - zoom out to fit */
        @media (max-width: 768px) {
          #certificate-container {
            transform-origin: top center;
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Certificate
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {team?.name}
              </p>
            </div>
            {team && isTeamMember && (
              <Button
                variant="secondary"
                onClick={() =>
                  navigate(`/teams/${team.id}/submission`)
                }
              >
                Back to Submission
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="certificate-wrapper"
      >
        {/* Hidden Template for Canvas Generation */}
        <div
          className={showTemplate ? 'block' : 'hidden'}
          style={{ position: 'absolute', left: '-9999px' }}
        >
          <div
            ref={certificateRef}
            id="certificate-template"
            style={{
              position: 'relative',
              backgroundImage: 'url(/images/blank_cert.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '1000px',
              height: `${(1000 * 2480) / 3508}px`,
            }}
          >
            {/* User Name (from session) */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
              }}
            >
              <h3
                ref={userNameRef}
                style={{
                  fontWeight: 'bold',
                  color: '#111827',
                  textAlign: 'center',
                  fontSize: userNameFontSize,
                  lineHeight: '1.2',
                  wordBreak: 'break-word',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  margin: 0,
                }}
              >
                {certificateName || 'N/A'}
              </h3>
            </div>

            {/* Team Name */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
              }}
            >
              <h3
                ref={teamNameRef}
                style={{
                  fontWeight: '600',
                  color: '#1f2937',
                  textAlign: 'center',
                  fontSize: teamNameFontSize,
                  lineHeight: '1.2',
                  wordBreak: 'break-word',
                  margin: 0,
                }}
              >
                {team?.name}
              </h3>
            </div>

            {/* Participation Text */}
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
              }}
            >
              <p
                style={{
                  textAlign: 'center',
                  color: '#374151',
                  fontSize: '18px',
                  fontWeight: '500',
                  margin: 0,
                }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  Peserta Hackathon IMPHNEN x KOLOSAL AI
                </span>
              </p>
            </div>

            {/* QR Code */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '8%',
              }}
            >
              {qrCodeUrl && (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={qrCodeUrl}
                    alt="Certificate QR Code"
                    style={{ width: '96px', height: '96px' }}
                  />
                </div>
              )}
            </div>

            {/* Date */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                right: '8%',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#374151',
                  margin: 0,
                }}
              >
                {new Date().toLocaleDateString(
                  'id-ID',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Display Certificate Image */}
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
              alt="Certificate"
              className="w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}

          {/* Actions */}
          {isTeamMember && (
            <div className="bg-gray-50 dark:bg-gray-800 p-6 grid grid-cols-2 xl:grid-cols-3 gap-3 justify-center no-print">
              <Button
                variant="secondary"
                onClick={handleDownloadCertificate}
                className="flex items-center gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? '⏳ Generating...' : '📥 Download'}
              </Button>
              <Button
                variant="secondary"
                onClick={handlePrintCertificate}
                className="flex items-center gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? '⏳ Generating...' : '🖨️ Print'}
              </Button>
              {team && (
                <Button
                  onClick={() =>
                    navigate(`/teams/${team.id}/submission`)
                  }
                  variant="secondary"
                  className="col-span-2 flex items-center gap-2 xl:col-span-1"
                >
                  View Submission
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 no-print">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
            Certificate Information
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This certificate is a digital record of your hackathon participation
            and project submission. You can print or save this page as a PDF for
            your records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
