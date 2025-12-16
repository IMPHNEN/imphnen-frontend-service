import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  useMyTeams,
  useMyInvitations,
  useRespondToInvitation,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Icon } from '@iconify/react';
import ProfilePage from '../profile/page';
import winnerData from '../certificate/winner-data.json';
import { encodeWinnerCertificateId } from '../../utils/certificate';

// Team features deadline: 2025-11-30 23:59:00 WIB (UTC+7)
const TEAM_FEATURES_DEADLINE = new Date('2025-11-30T16:59:00Z');

// Submission deadline: 2025-12-07 23:59:00 WIB (UTC+7)
const SUBMISSION_DEADLINE = new Date('2025-12-07T16:59:00Z');

type Invitation = {
  id: string;
  team: {
    id?: string;
    name?: string;
    logo?: string;
    banner?: string;
    description?: string;
    city?: string;
    visibility?: string;
    leader_id?: string;
  };
  inviter: {
    id?: string;
    fullname?: string;
    email?: string;
    avatar?: string;
  };
};

const DashboardPage: FC = (): ReactElement => {
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Check if team features are closed
  const isTeamFeaturesClosed = new Date() >= TEAM_FEATURES_DEADLINE;

  // Check if submission deadline passed
  const isSubmissionDeadlinePassed = new Date() >= SUBMISSION_DEADLINE;

  // Countdown timer
  useEffect(() => {
    if (isSubmissionDeadlinePassed) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = SUBMISSION_DEADLINE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isSubmissionDeadlinePassed]);

  // Lock background scroll when profile modal is open
  useEffect(() => {
    if (showProfileModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [showProfileModal]);
  const { data: teamsData } = useMyTeams();
  const { data: invitationsData } = useMyInvitations();
  const { mutateAsync: respondToInvitation } = useRespondToInvitation();

  const user = session?.user;
  const myTeams = teamsData?.data || [];
  const invitations: Invitation[] = (invitationsData?.data ||
    []) as Invitation[];

  const winnerEntry = useMemo(() => {
    const team = (myTeams[0] as any) || null;
    const winners = (winnerData as any)?.data || [];
    if (!team?.id || !Array.isArray(winners)) return null;
    return winners.find((w: any) => w?.team_id === team.id) || null;
  }, [myTeams]);

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await respondToInvitation({ invitationId, action: 'accept' });
      toast.success('Invitation accepted! You are now a team member.');
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      toast.error('Failed to accept invitation');
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await respondToInvitation({ invitationId, action: 'reject' });
      toast.success('Invitation declined');
    } catch (error) {
      console.error('Failed to reject invitation:', error);
      toast.error('Failed to decline invitation');
    }
  };

  return (
    <>
      <div className="p-6 md:p-8 md:max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.fullname || user?.email?.split('@')[0] || 'User'}!
          </h1>
          {user?.location && (
            <p className="text-gray-600 dark:text-gray-400 mt-1 font-sans flex items-center space-x-1">
              <Icon icon="heroicons:map-pin-16-solid" width="24" height="24" />
              <span>{user.location}</span>
            </p>
          )}
        </div>

        {/* Winner Banner */}
        {winnerEntry && myTeams.length > 0 && (
          <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-500 rounded-lg p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="text-4xl shrink-0">🏆</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">
                    Selamat! Tim Anda meraih JUARA {winnerEntry.rank}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Anda dapat generate sertifikat penghargaan dan membagikannya.
                  </p>
                </div>
              </div>
              <button
                onClick={async () => {
                  const team = myTeams[0] as any;
                  const certId = await encodeWinnerCertificateId(team.id);
                  navigate(`/certificate/winner/${encodeURIComponent(certId)}`);
                }}
                className="shrink-0 px-6 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
              >
                Generate Sertifikat Juara
              </button>
            </div>
          </div>
        )}

        {/* Countdown Timer */}
        {timeLeft && !isSubmissionDeadlinePassed && (
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">⏰</span>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                  Submission Deadline
                </h3>
                <p className="text-blue-800 dark:text-blue-200 mt-2 text-sm font-sans">
                  Project submissions close on December 7, 2025 at 23:59 WIB
                </p>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Days
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Hours
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Minutes
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {invitations.length > 0 && (
          <div className="mb-8 bg-primary-50 dark:bg-blue-900/20 border border-primary-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Team Invitations ({invitations.length})
            </h2>
            {isTeamFeaturesClosed && (
              <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <Icon icon="mdi:clock-alert" className="text-lg shrink-0" />
                  Team features are closed. You can no longer accept invitations.
                </p>
              </div>
            )}
            <div className="space-y-3 font-sans">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {invitation.team?.name ?? 'Unnamed Team'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Invited by{' '}
                      {invitation.inviter?.fullname ?? 'Unknown User'}
                    </p>
                  </div>
                  {!isTeamFeaturesClosed && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptInvitation(invitation.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleRejectInvitation(invitation.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {myTeams.length > 0 ? (
          (() => {
            const team = myTeams[0] as any;
            return (
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  My Team
                </h2>
                <Link
                  to={'/teams/' + team.id}
                  className="block bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border dark:border-gray-700"
                >
                  <img
                    src={team.banner || '/images/banner-imphnen.webp'}
                    alt={team.name}
                    className="w-full aspect-3/1 object-cover"
                  />
                  <div className="p-4 md:p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-16 h-16 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <Icon icon="mdi:account-group" className="text-gray-500 dark:text-gray-400 text-2xl" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">
                          {team.name}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-3 font-sans mt-2">
                          {team.has_submission && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shrink-0">
                              <Icon icon="mdi:check-circle" className="text-sm" />
                              Submitted
                            </span>
                          )}
                          {team.city && (
                            <span className="flex items-center gap-1 truncate">
                              <Icon icon="mdi:map-marker" className="shrink-0" />
                              <span className="truncate">{team.city}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 shrink-0">
                            <Icon icon="mdi:account-group" />
                            {team.member_count || team.members?.length || 0} member{(team.member_count || team.members?.length || 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    {team.description && (
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3 font-sans">
                        {team.description}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })()
        ) : (
          <div className="mb-6 md:mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 md:p-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">👋</div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                You are not in a team yet
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-sans">
                Use the sidebar to browse teams or create your own
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="bg-linear-to-r from-primary-600 to-primary-500 h-24 rounded-t-xl"></div>
          <div className="px-4 md:px-8 pb-4 md:pb-8 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-start -mt-12 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row items-start">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullname || 'User'}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-3xl md:text-4xl font-sans">
                      U
                    </span>
                  </div>
                )}
                <div className="md:ml-6 mt-4 md:mt-14">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.fullname ||
                      user?.email?.split('@')[0] ||
                      'Unnamed User'}
                  </h2>

                  {user?.location ? (
                    <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1 text-sm md:text-base font-sans">
                      <Icon
                        icon="heroicons:map-pin-16-solid"
                        width="16"
                        height="16"
                      />
                      <span className="ml-1">{user.location}</span>
                    </p>
                  ) : (
                    <Link
                      to="/onboarding/user"
                      className="text-primary-500 dark:text-blue-400 hover:text-primary-600 dark:hover:text-blue-300 text-sm md:text-sm mt-1 flex items-center"
                    >
                      <span className="font-sans">Complete your profile</span>
                      <Icon
                        icon="ic:baseline-chevron-right"
                        width="24"
                        height="24"
                      />
                    </Link>
                  )}
                </div>
              </div>
              {user?.location && (
                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  className="mt-3 md:mt-14 md:ml-auto inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-primary-500 text-white rounded-lg text md:text-sm font-medium shadow-sm hover:bg-primary-600 transition-colors w-full md:w-auto cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="space-y-4 md:space-y-6 w-full max-w-full">
              {user?.bio && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm w-full max-w-full overflow-x-hidden">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                    About
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-3 wrap-break-word break-all overflow-hidden w-full max-w-full">
                    {user.bio}
                  </p>
                </div>
              )}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 tracking-wide mb-3">
                  Contact
                </h3>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-gray-900 dark:text-white">
                    {user?.email}
                  </span>
                </div>
              </div>
              {user?.skills && user.skills.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 tracking-wide mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-4 py-2 border border-primary-600 dark:border-gray-500 text-primary-600 dark:text-white rounded-4xl text-xs font-medium dark:bg-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProfilePage
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default DashboardPage;
