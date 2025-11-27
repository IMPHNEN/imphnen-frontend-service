import { FC, ReactElement } from 'react';
import { Link } from 'react-router';
import {
  useMyTeams,
  useMyInvitations,
  useRespondToInvitation,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Icon } from '@iconify/react';

const DashboardPage: FC = (): ReactElement => {
  const { session } = useAuthStore();
  const { data: teamsData } = useMyTeams();
  const { data: invitationsData } = useMyInvitations();
  const { mutateAsync: respondToInvitation } = useRespondToInvitation();

  const user = session?.user;
  const myTeams = teamsData?.data || [];
  const invitations = invitationsData?.data || [];

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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.fullname || user?.email?.split('@')[0] || 'User'}!
        </h1>
        {user?.location && (
          <p className="text-gray-600 dark:text-neutral-400 mt-1 font-sans flex items-center space-x-1">
            <Icon icon="heroicons:map-pin-16-solid" width="24" height="24" />
            <span>{user.location}</span>
          </p>
        )}
      </div>

      {invitations.length > 0 && (
        <div className="mb-8 bg-primary-50 dark:bg-blue-900/20 border border-primary-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Team Invitations ({invitations.length})
          </h2>
          <div className="space-y-3 font-sans">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invitation.team.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    Invited by {invitation.inviter.fullname}
                  </p>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      )}

      {myTeams.length > 0 ? (
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            My Team
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myTeams.map((team) => (
              <Link
                key={team.id}
                to={'/teams/' + team.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {team.banner && (
                  <img
                    src={team.banner}
                    alt={team.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-2 md:mb-3">
                    {team.logo && (
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                        {team.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-neutral-400">
                        City: {team.city}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-neutral-400 text-xs md:text-sm line-clamp-2">
                    {team.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 md:mb-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">👋</div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              You are not in a team yet
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 font-sans">
              Use the sidebar to browse teams or create your own
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-linear-to-br from-white-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg">
        <div className="bg-linear-to-r from-primary-600 to-indigo-600 h-24 rounded-t-xl"></div>
        <div className="px-4 md:px-8 pb-4 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-start -mt-12 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row items-start">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullname || 'User'}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-neutral-700 shadow-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-neutral-700 shadow-lg bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-neutral-500 text-3xl md:text-4xl font-sans">
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
                  <p className="text-gray-600 dark:text-neutral-400 flex items-center mt-1 text-sm md:text-base font-sans">
                    {user.location}
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
              <Link
                to="/profile"
                className="mt-3 md:mt-14 md:ml-auto inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-primary-500 text-white rounded-lg text md:text-sm font-medium shadow-sm hover:bg-primary-600 transition-colors w-full md:w-auto"
              >
                Edit Profile
              </Link>
            )}
          </div>
          <div className="space-y-4 md:space-y-6">
            {user?.bio && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-300 uppercase tracking-wide mb-2">
                  About
                </h3>
                <p className="text-gray-800 dark:text-neutral-200 leading-relaxed line-clamp-3 wrap-break-word">
                  {user.bio}
                </p>
              </div>
            )}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 dark:text-neutral-300 tracking-wide mb-3">
                Contact
              </h3>
              <div className="flex items-center text-gray-700 dark:text-neutral-300">
                <span className="text-gray-900 dark:text-white">
                  {user?.email}
                </span>
              </div>
            </div>
            {user?.skills && user.skills.length > 0 && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-700 dark:text-neutral-300 tracking-wide mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 rounded-4xl text-xs font-medium "
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
  );
};

export default DashboardPage;
