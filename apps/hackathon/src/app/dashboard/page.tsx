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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.fullname || user?.email?.split('@')[0] || 'User'}!
        </h1>
        {user?.location && (
          <p className="text-gray-600 mt-1">Location: {user.location}</p>
        )}
      </div>

      {invitations.length > 0 && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Team Invitations ({invitations.length})
          </h2>
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{invitation.team.name}</p>
                  <p className="text-sm text-gray-600">Invited by {invitation.inviter.fullname}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleAcceptInvitation(invitation.id)}>Accept</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleRejectInvitation(invitation.id)}>Decline</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {myTeams.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myTeams.map((team) => (
              <Link key={team.id} to={'/teams/' + team.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {team.banner && <img src={team.banner} alt={team.name} className="w-full h-32 object-cover" />}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    {team.logo && <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-full object-cover" />}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-600">City: {team.city}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{team.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-8 bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="text-4xl mb-3">Wave</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You are not in a team yet</h2>
            <p className="text-gray-600">Use the sidebar to browse teams or create your own</p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24 rounded-t-xl"></div>
        <div className="px-4 md:px-8 pb-4 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-start -mt-12 mb-4 md:mb-6">
            <div className="flex items-start">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.fullname || 'User'} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover" />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-3xl md:text-4xl">User</span>
                </div>
              )}
              <div className="ml-4 md:ml-6 mt-12 md:mt-14">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{user?.fullname || user?.email?.split('@')[0] || 'Unnamed User'}</h2>
                {user?.location ? (
                  <p className="text-gray-600 flex items-center mt-1 text-sm md:text-base">{user.location}</p>
                ) : (
                  <Link to="/onboarding/user" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm mt-1 inline-block">Complete your profile</Link>
                )}
              </div>
            </div>
            {user?.location && (
              <Link to="/profile" className="mt-3 md:mt-14 md:ml-auto inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors w-full md:w-auto">Edit Profile</Link>
            )}
          </div>
          <div className="space-y-4 md:space-y-6">
            {user?.bio && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">About</h3>
                <p className="text-gray-800 leading-relaxed">{user.bio}</p>
              </div>
            )}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Contact</h3>
              <div className="flex items-center text-gray-700">
                <span className="text-gray-900">{user?.email}</span>
              </div>
            </div>
            {user?.skills && user.skills.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill: string) => (
                    <span key={skill} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">{skill}</span>
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
