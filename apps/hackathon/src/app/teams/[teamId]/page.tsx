import { FC, ReactElement, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Link, useParams, useNavigate } from 'react-router';
import { useTeamById, useTeamMembers, useInviteMember, useTeamJoinRequests, useRespondToJoinRequest, ETeamMemberRole, useAuthStore } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

const MAX_TEAM_MEMBERS = 5;

const TeamDashboardPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const { data: teamData, isLoading: isLoadingTeam } = useTeamById(teamId || '');
  const { data: membersData, isLoading: isLoadingMembers } = useTeamMembers(teamId || '');
  const { data: joinRequestsData } = useTeamJoinRequests(teamId || '', !!teamId);
  const { mutateAsync: inviteMember, isPending: isInviting } = useInviteMember(teamId || '');
  const { mutateAsync: respondToJoinRequest, isPending: isResponding } = useRespondToJoinRequest(teamId || '');

  const team = teamData?.data;
  const members = membersData?.data || [];
  const joinRequests = joinRequestsData?.data || [];
  const pendingJoinRequests = joinRequests.filter((req: any) => req.status === 'pending');
  const currentUserId = session?.user?.id;

  const isLeader = currentUserId === team?.leader_id;
  const canInvite = isLeader && members.length < MAX_TEAM_MEMBERS;

  console.log('Leader check:', { currentUserId, leaderId: team?.leader_id, isLeader });

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || isInviting) return;

    try {
      await inviteMember({ email: inviteEmail.trim() });
      toast.success('Invitation sent successfully!');
      setInviteEmail('');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Failed to invite member:', error);
      toast.error('Failed to send invitation');
    }
  };

  const handleRespondToJoinRequest = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      await respondToJoinRequest({ requestId, action });
      toast.success(action === 'approve' ? 'Request approved!' : 'Request rejected');
    } catch (error) {
      console.error('Failed to respond to join request:', error);
      toast.error('Failed to process request');
    }
  };

  if (isLoadingTeam || isLoadingMembers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading team...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Team not found</h2>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Banner */}
      <div className="bg-white border-b">
        {team.banner && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={team.banner}
              alt={team.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {team.logo && (
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg -mt-10"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
                <p className="text-gray-600 mt-1">📍 {team.city}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">
                    {members.length} {members.length === 1 ? 'Member' : 'Members'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {team.visibility === 'public' ? '🌐 Public' : '🔒 Private'}
                  </span>
                  {isLeader && (
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-semibold shadow-sm">
                      👑 Team Leader
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Team</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{team.description}</p>
            </div>

            {/* Team Actions - Only for Leader */}
            {isLeader && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Team Management</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setShowInviteModal(true)}
                    disabled={!canInvite}
                  >
                    ➕ Invite Member {!canInvite && `(${members.length}/${MAX_TEAM_MEMBERS})`}
                  </Button>
                  <Button
                    className="w-full relative"
                    variant="secondary"
                    onClick={() => setShowJoinRequestsModal(true)}
                  >
                    📩 Join Requests
                    {pendingJoinRequests.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {pendingJoinRequests.length}
                      </span>
                    )}
                  </Button>
                  <Link to={`/teams/${teamId}/edit`}>
                    <Button className="w-full" variant="secondary">
                      ✏️ Edit Team Info
                    </Button>
                  </Link>
                  <Link to={`/teams/${teamId}/members`}>
                    <Button className="w-full" variant="secondary">
                      👥 Manage Members
                    </Button>
                  </Link>
                  <Link to={`/teams/${teamId}/chat`}>
                    <Button className="w-full" variant="secondary">
                      💬 Team Chat
                    </Button>
                  </Link>
                  <Link to={`/teams/${teamId}/submit`}>
                    <Button className="w-full">
                      🚀 Submit Project
                    </Button>
                  </Link>
                </div>
                {!canInvite && members.length >= MAX_TEAM_MEMBERS && (
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Maximum team size reached ({MAX_TEAM_MEMBERS} members)
                  </p>
                )}
              </div>
            )}

            {/* Quick Actions for Members */}
            {!isLeader && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link to={`/teams/${teamId}/chat`}>
                    <Button className="w-full" variant="secondary">
                      💬 Team Chat
                    </Button>
                  </Link>
                  {team.has_submission && (
                    <Link to={`/teams/${teamId}/submission`}>
                      <Button className="w-full" variant="secondary">
                        📄 View Submission
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Submission Status */}
            {team.has_submission && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h3 className="font-bold text-green-900">Project Submitted</h3>
                    <p className="text-green-700 text-sm">
                      Your team has successfully submitted a project
                    </p>
                  </div>
                </div>
                <Link to={`/teams/${teamId}/submission`}>
                  <Button className="mt-4 w-full" variant="secondary">
                    View Submission Details
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Leader */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Team Leader</h3>
              {team.leader && (
                <button
                  onClick={() => navigate(`/users/${team.leader.id}`)}
                  className="w-full flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors text-left cursor-pointer"
                >
                  {team.leader.avatar ? (
                    <img
                      src={team.leader.avatar}
                      alt={team.leader.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{team.leader.fullname}</p>
                    <p className="text-sm text-gray-600">{team.leader.email}</p>
                  </div>
                </button>
              )}
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Members ({members.length})
              </h3>
              <div className="space-y-3">
                {members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => navigate(`/users/${member.user.id}`)}
                    className="w-full flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors text-left cursor-pointer"
                  >
                    {member.user.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt={member.user.fullname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">👤</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {member.user.fullname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.role === ETeamMemberRole.LEADER ? 'Leader' : 'Member'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Invite Team Member
            </h2>
            <p className="text-gray-600 mb-4">
              Send an invitation to join your team. The invited member will see the invitation on their dashboard after logging in.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> The email you enter must match the GitHub email address the member uses to sign in.
              </p>
            </div>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="invite-email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Current members: {members.length}/{MAX_TEAM_MEMBERS}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteEmail('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!inviteEmail.trim() || isInviting}
                >
                  {isInviting ? 'Sending...' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Requests Modal */}
      {showJoinRequestsModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Join Requests ({pendingJoinRequests.length})
              </h2>
              <button
                onClick={() => setShowJoinRequestsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {pendingJoinRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No pending join requests</p>
                <p className="text-gray-500 text-sm mt-2">
                  When users request to join your team, they'll appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingJoinRequests.map((request: any) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {request.user?.avatar ? (
                          <img
                            src={request.user.avatar}
                            alt={request.user.fullname}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <span className="text-gray-500 text-xl">👤</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {request.user?.fullname || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.user?.email}
                          </p>
                          {request.message && (
                            <div className="mt-2 bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">
                                <strong>Message:</strong> {request.message}
                              </p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Requested {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => handleRespondToJoinRequest(request.id, 'approve')}
                          disabled={isResponding || members.length >= MAX_TEAM_MEMBERS}
                          className="px-4 py-2 text-sm"
                        >
                          ✓ Accept
                        </Button>
                        <Button
                          onClick={() => handleRespondToJoinRequest(request.id, 'reject')}
                          disabled={isResponding}
                          variant="secondary"
                          className="px-4 py-2 text-sm"
                        >
                          ✕ Reject
                        </Button>
                      </div>
                    </div>
                    {members.length >= MAX_TEAM_MEMBERS && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                        <p className="text-xs text-yellow-800">
                          Team is full ({MAX_TEAM_MEMBERS}/{MAX_TEAM_MEMBERS} members). Remove a member before accepting new requests.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboardPage;
