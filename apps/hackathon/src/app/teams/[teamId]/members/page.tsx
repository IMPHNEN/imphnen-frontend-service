import { FC, ReactElement, useState } from 'react';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import {
  useTeamById,
  useTeamMembers,
  useTeamJoinRequests,
  useInviteMember,
  useRemoveMember,
  useRespondToJoinRequest,
  ETeamMemberStatus,
  inviteMemberSchema,
  TInviteMemberForm,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ManageMembersPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const { data: teamData } = useTeamById(teamId || '');
  const { data: membersData, isLoading: isLoadingMembers } = useTeamMembers(teamId || '');
  const { data: joinRequestsData } = useTeamJoinRequests(teamId || '');

  const { mutateAsync: inviteMember, isPending: isInviting } = useInviteMember(teamId || '');
  const { mutateAsync: removeMember, isPending: isRemoving } = useRemoveMember(teamId || '');
  const { mutateAsync: respondToRequest, isPending: isResponding } = useRespondToJoinRequest(teamId || '');

  const team = teamData?.data;
  const members = membersData?.data || [];
  const joinRequests = Array.isArray(joinRequestsData?.data) ? joinRequestsData.data : [];
  const currentUserId = session?.user?.id;
  const isLeader = currentUserId === team?.leader_id;

  const form = useForm<TInviteMemberForm>({
    resolver: zodResolver(inviteMemberSchema),
    mode: 'all',
  });

  if (!isLeader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">Only the team leader can manage members</p>
        <Button onClick={() => navigate(`/teams/${teamId}`)}>Back to Team</Button>
      </div>
    );
  }

  const handleInvite = form.handleSubmit(async (data) => {
    try {
      await inviteMember(data);
      setShowInviteModal(false);
      form.reset();
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  });

  const handleRemove = async (userId: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to remove this member?')) {
      try {
        await removeMember(userId);
      } catch (error) {
        console.error('Failed to remove member:', error);
      }
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await respondToRequest({ requestId, action: 'approve' });
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await respondToRequest({ requestId, action: 'reject' });
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Members</h1>
              <p className="text-gray-600 mt-1">{team?.name}</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setShowInviteModal(true)}>
                Invite Member
              </Button>
              <Button variant="secondary" onClick={() => navigate(`/teams/${teamId}`)}>
                Back to Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Join Requests */}
        {joinRequests.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Join Requests ({joinRequests.length})
            </h2>
            <div className="space-y-3">
              {joinRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {request.user.avatar ? (
                        <img
                          src={request.user.avatar}
                          alt={request.user.fullname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">👤</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{request.user.fullname}</p>
                        <p className="text-sm text-gray-600">{request.user.email}</p>
                        {request.user.location && (
                          <p className="text-sm text-gray-500">📍 {request.user.location}</p>
                        )}
                        <p className="text-sm text-gray-700 mt-2 italic">"{request.message}"</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleApproveRequest(request.id)}
                        disabled={isResponding}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleRejectRequest(request.id)}
                        disabled={isResponding}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Members */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Current Members ({members.length})
          </h2>
          {isLoadingMembers ? (
            <p className="text-gray-600">Loading members...</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {member.user.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt={member.user.fullname}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">👤</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{member.user.fullname}</p>
                      <p className="text-sm text-gray-600">{member.user.email}</p>
                      {member.user.location && (
                        <p className="text-sm text-gray-500">📍 {member.user.location}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {member.role === 'leader' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            Leader
                          </span>
                        )}
                        {member.status === ETeamMemberStatus.PENDING && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                            Pending Invitation
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {member.role !== 'leader' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleRemove(member.user_id)}
                      disabled={isRemoving}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Members cannot leave the team without your approval. Only you can remove members from the team.
          </p>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Invite Member
            </h2>
            <p className="text-gray-600 mb-4">
              Send an invitation to join your team. The invited member will see the invitation on their dashboard after logging in.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> The email you enter must match the GitHub email address the member uses to sign in.
              </p>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="member@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setShowInviteModal(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!form.formState.isValid || isInviting}
                >
                  {isInviting ? 'Sending...' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembersPage;
