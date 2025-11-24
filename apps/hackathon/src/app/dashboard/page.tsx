import { FC, ReactElement } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Link, useNavigate } from 'react-router';
import { useMyTeams, useMyInvitations, useRespondToInvitation, supabase, useAuthStore } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

const DashboardPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { session, clearSession } = useAuthStore();
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

  const handleLogout = async () => {
    try {
      // Clear Supabase session
      await supabase.auth.signOut();

      // Clear Zustand store
      clearSession();

      // Clear localStorage
      localStorage.clear();

      toast.success('Logged out successfully');

      // Redirect to login
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear everything and redirect
      clearSession();
      localStorage.clear();
      navigate('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user?.fullname || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.location && `📍 ${user.location}`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Invitations */}
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
                    <p className="text-sm text-gray-600">
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

        {/* My Teams */}
        {myTeams.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Team</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myTeams.map((team) => (
                <Link
                  key={team.id}
                  to={`/teams/${team.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {team.banner && (
                    <img
                      src={team.banner}
                      alt={team.name}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      {team.logo && (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                        <p className="text-sm text-gray-600">📍 {team.city}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {team.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* No Team - Show CTAs */
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You're not in a team yet
              </h2>
              <p className="text-gray-600">
                Join an existing team or create your own to get started
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
              <Link
                to="/teams/browse"
                className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors text-center"
              >
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-xl font-bold mb-2">Browse Teams</h3>
                <p className="text-blue-100">
                  Find and join existing teams looking for members
                </p>
              </Link>

              <Link
                to="/teams/create"
                className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition-colors text-center"
              >
                <div className="text-4xl mb-3">➕</div>
                <h3 className="text-xl font-bold mb-2">Create Team</h3>
                <p className="text-green-100">
                  Start your own team and invite members
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* User Profile Card */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24"></div>
          <div className="px-8 pb-8">
            <div className="flex items-start -mt-12 mb-6">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
              )}
              <div className="ml-6 mt-14">
                <h2 className="text-2xl font-bold text-gray-900">{user?.fullname}</h2>
                {user?.location ? (
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {user.location}
                  </p>
                ) : (
                  <Link to="/onboarding/user" className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block">
                    Complete your profile →
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {user?.bio && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">About</h3>
                  <p className="text-gray-800 leading-relaxed">{user.bio}</p>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Contact</h3>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-900">{user?.email}</span>
                </div>
              </div>

              {user?.skills && user.skills.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
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
    </div>
  );
};

export default DashboardPage;
