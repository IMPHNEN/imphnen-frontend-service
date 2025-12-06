'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  useUserMe,
  useMyTeams,
} from '@imphnen-frontend-service/service';
import { generateCertificateHash } from '@imphnen-frontend-service/utils';
import { Icon } from '@iconify/react';

interface Team {
  id: string;
  name: string;
  city: string;
  created_at: string;
}

const CertificatePage: FC = (): ReactElement => {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const { data: userData } = useUserMe();
  const { data: teamsData } = useMyTeams();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [validTeam, setValidTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  const user = userData?.data;

  // Add print styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page {
          size: landscape;
          margin: 0;
        }
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Verify certificate
  useEffect(() => {
    const teams = teamsData?.data || [];

    if (!user || !teams.length || !certId) {
      setLoading(true);
      return;
    }

    const matchingTeam = teams.find((team: Team) => {
      const generatedHash = generateCertificateHash(user.id, team.id);
      return generatedHash === certId;
    });

    if (matchingTeam) {
      setIsValid(true);
      setValidTeam(matchingTeam as Team);
    } else {
      setIsValid(false);
      setValidTeam(null);
    }

    setLoading(false);
  }, [user, teamsData, certId]);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print(); // Yoloooo
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Icon icon="eos-icons:loading" className="text-6xl text-primary-600 mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Validating certificate...</p>
        </div>
      </div>
    );
  }

  if (!isValid || !validTeam || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="text-center max-w-md">
          <Icon icon="heroicons:x-circle-solid" className="text-8xl text-red-500 mb-6 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Certificate
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The certificate ID you provided is not valid or you don't have access to view this certificate.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      {/* Action buttons - hidden on print */}
      <div className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Icon icon="heroicons:arrow-left" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon icon="heroicons:arrow-down-tray" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Icon icon="heroicons:printer" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Certificate */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Decorative header pattern */}
          <div className="h-3 bg-linear-to-r from-primary-400 via-primary-600 to-primary-400" />

          <div className="p-12 md:p-16 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  currentColor 35px,
                  currentColor 70px
                )`
              }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    IMPHNEN x KOLOSAL
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Hackathon 2025
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    PARTICIPANT
                  </div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    Certificate of Completion
                  </div>
                </div>
              </div>

              {/* Badge/Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                    <div className="bg-white dark:bg-slate-800 w-28 h-28 rounded-full flex items-center justify-center">
                      <Icon icon="heroicons:academic-cap-solid" className="text-6xl text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  {/* Laurel wreath effect */}
                  <div className="absolute -top-2 -left-2 text-yellow-500">
                    <Icon icon="game-icons:laurel-crown" className="text-4xl" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-yellow-500">
                    <Icon icon="game-icons:laurel-crown" className="text-4xl transform rotate-180" />
                  </div>
                </div>
              </div>

              {/* Certificate text */}
              <div className="text-center mb-12">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  This award is presented to
                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-wide">
                  {user.fullname}
                </h2>

                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    for active participation and successful completion in the IMPHNEN x KOLOSAL Hackathon 2025
                    as a member of team <span className="font-semibold text-primary-600 dark:text-primary-400">"{validTeam.name}"</span> from{' '}
                    <span className="font-semibold">{validTeam.city}</span>.
                  </p>
                </div>
              </div>

              {/* Signature and date */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="mb-8">
                      <div className="font-signature text-3xl text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'cursive' }}>
                        IMPHNEN Team
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      IMPHNEN Team
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Hackathon Organizer
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {formatDate(validTeam.created_at)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Completion Date
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate ID footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 font-mono break-all">
                  Certificate ID: {certId}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative footer pattern */}
          <div className="h-3 bg-linear-to-r from-primary-400 via-primary-600 to-primary-400" />
        </div>
      </div>

      {/* Certificate verification info - hidden on print */}
      <div className="max-w-5xl mx-auto mt-8 print:hidden">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
          <div className="flex items-start gap-3">
            <Icon icon="heroicons:information-circle" className="text-2xl text-primary-600 mt-1 shrink-0" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">Certificate Verification</p>
              <p>
                This certificate is cryptographically verified using HMAC-SHA256.
                The certificate ID is generated from your user ID and team ID, ensuring authenticity and uniqueness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
