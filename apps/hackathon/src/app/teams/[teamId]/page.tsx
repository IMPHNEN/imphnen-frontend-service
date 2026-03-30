import { FC, ReactElement, useState, useEffect } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Link, useParams, useNavigate } from 'react-router';
import {
  useTeamById,
  useTeamMembers,
  useInviteMember,
  useTeamJoinRequests,
  useRespondToJoinRequest,
  useLeaveTeam,
  useDeleteTeam,
  ETeamMemberRole,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

const MAX_TEAM_MEMBERS = 5;

const TEAM_FEATURES_DEADLINE = new Date('2025-11-30T16:59:00Z');

const ImageWithLoader: FC<{
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}> = ({ src, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </div>
  );
};

const TeamDashboardPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();

  const isTeamFeaturesClosed = new Date() >= TEAM_FEATURES_DEADLINE;
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);

  const totalImagesToLoad = 0;

  const handleImageLoad = () => {
    setImageLoadCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImagesToLoad) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };

  const handleImageError = () => {
    handleImageLoad();
  };

  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  const { data: teamData, isLoading: isLoadingTeam } = useTeamById(
    teamId || ''
  );
  const { data: membersData, isLoading: isLoadingMembers } = useTeamMembers(
    teamId || ''
  );

  const team = teamData?.data;
  const members = membersData?.data || [];
  const currentUserId = session?.user?.id;
  const isLeader = currentUserId === team?.leader_id;

  const { data: joinRequestsData } = useTeamJoinRequests(
    teamId || '',
    !!teamId && isLeader
  );
  const { mutateAsync: inviteMember, isPending: isInviting } = useInviteMember(
    teamId || ''
  );
  const { mutateAsync: respondToJoinRequest, isPending: isResponding } =
    useRespondToJoinRequest(teamId || '');
  const { mutateAsync: leaveTeam, isPending: isLeaving } = useLeaveTeam();
  const { mutateAsync: deleteTeam, isPending: isDeleting } = useDeleteTeam();

  const joinRequests = joinRequestsData?.data || [];
  const pendingJoinRequests = joinRequests.filter(
    (req: any) => req.status === 'pending'
  );
  const isMember = members.some(
    (member: any) => member.user_id === currentUserId
  );
  const canInvite = isLeader && members.length < MAX_TEAM_MEMBERS;

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

  const handleRespondToJoinRequest = async (
    requestId: string,
    action: 'approve' | 'reject'
  ) => {
    try {
      await respondToJoinRequest({ requestId, action });
      toast.success(
        action === 'approve' ? 'Request approved!' : 'Request rejected'
      );
    } catch (error) {
      console.error('Failed to respond to join request:', error);
      toast.error('Failed to process request');
    }
  };

  const handleLeaveTeam = async () => {
    if (!teamId) return;

    try {
      await leaveTeam(teamId);
      toast.success('You have left the team');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to leave team:', error);
      toast.error('Failed to leave team');
    }
  };

  const handleDeleteTeam = async () => {
    if (!teamId) return;

    try {
      await deleteTeam(teamId);
      toast.success('Team deleted successfully');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Failed to delete team:', error);
      toast.error(error?.message || 'Failed to delete team');
    }
  };

  if (isLoadingTeam || isLoadingMembers) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-950 border-b">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse -mt-10" />
                <div>
                  <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                      <div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-white/60 dark:bg-black/50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-white">
              Loading team data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Team not found
        </h2>
        <Button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative dark:bg-gray-950">
      {!imagesLoaded && totalImagesToLoad > 0 && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading images...</p>
            <p className="text-sm text-gray-400 mt-1">
              {imageLoadCount} / {totalImagesToLoad}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        {team.banner && (
          <div className="relative w-full aspect-3/1 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gray-200 animate-pulse ${
                imagesLoaded ? 'hidden' : ''
              }`}
            />
            <img
              src={team.banner}
              alt={team.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                imagesLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              {team.logo && (
                <div className="relative shrink-0">
                  {!imagesLoaded && (
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse -mt-10" />
                  )}
                  <img
                    src={team.logo}
                    alt={team.name}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg -mt-8 md:-mt-10 transition-opacity duration-300 shrink-0 ${
                      imagesLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white line-clamp-2">
                  {team.name}
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 font-sans flex items-center">
                  <Icon icon="mdi:map-marker" className="inline-block mr-1" />
                  <span>{team.city}</span>
                </p>
                <div className="flex flex-wrap items-center gap-2 md:space-x-4 mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Icon
                      icon="mdi:account-multiple"
                      className="inline-block mr-1"
                    />
                    {members.length}{' '}
                    {members.length === 1 ? 'Member' : 'Members'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Icon
                      icon={
                        team.visibility === 'public' ? 'mdi:web' : 'mdi:lock'
                      }
                      className="inline-block mr-1"
                    />
                    {team.visibility === 'public' ? 'Public' : 'Private'}
                  </span>
                  {isLeader && (
                    <span className="hidden md:inline-flex px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-semibold shadow-sm items-center">
                      <Icon icon="mdi:crown" className="inline-block mr-1" />
                      <span>Team Leader</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                About Team
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all font-sans">
                {team.description}
              </p>
            </div>

            {isLeader && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Team Management
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {!team.has_submission && !isTeamFeaturesClosed && (
                    <>
                      <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => setShowInviteModal(true)}
                        disabled={!canInvite}
                      >
                        <Icon icon="mdi:plus" className="inline-block mr-2" />
                        Invite Member{' '}
                        {!canInvite && `(${members.length}/${MAX_TEAM_MEMBERS})`}
                      </Button>
                      <Button
                        className="w-full relative"
                        variant="secondary"
                        onClick={() => setShowJoinRequestsModal(true)}
                      >
                        <Icon icon="mdi:email" className="inline-block mr-2" /> Join
                        Requests
                        {pendingJoinRequests.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {pendingJoinRequests.length}
                          </span>
                        )}
                      </Button>
                    </>
                  )}
                  {!team.has_submission && !isTeamFeaturesClosed && (
                    <Link to={`/teams/${teamId}/edit`}>
                      <Button className="w-full" variant="secondary">
                        <Icon icon="mdi:pencil" className="inline-block mr-2" />
                        Edit Team Info
                      </Button>
                    </Link>
                  )}
                  <Link to={`/teams/${teamId}/members`}>
                    <Button className="w-full" variant="secondary">
                      <Icon
                        icon="mdi:account-group"
                        className="inline-block mr-2"
                      />
                      View Members
                    </Button>
                  </Link>
                  <Link to={`/teams/${teamId}/chat`}>
                    <Button className="w-full" variant="secondary">
                      <Icon icon="mdi:chat" className="inline-block mr-2" />
                      Team Chat
                    </Button>
                  </Link>
                  {team.has_submission ? (
                    <Link to={`/teams/${teamId}/submission`}>
                      <Button className="w-full" variant="secondary">
                        <Icon icon="mdi:file-document" className="inline-block mr-2" />
                        View Submission
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/teams/${teamId}/submit`}>
                      <Button className="w-full" disabled={members.length < 2}>
                        <Icon icon="mdi:rocket" className="inline-block mr-2" />
                        Submit Project
                      </Button>
                    </Link>
                  )}
                </div>
                {!team.has_submission && !canInvite && members.length >= MAX_TEAM_MEMBERS && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                    Maximum team size reached ({MAX_TEAM_MEMBERS} members)
                  </p>
                )}
                {members.length === 1 && !team.has_submission && !isTeamFeaturesClosed && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-3">
                      Danger Zone
                    </h3>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <Icon icon="mdi:delete" className="inline-block mr-2" />
                      Delete Team
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!isLeader && isMember && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Quick Actions
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link to={`/teams/${teamId}/chat`}>
                    <Button className="w-full" variant="secondary">
                      <Icon icon="mdi:chat" className="inline-block mr-2" />
                      Team Chat
                    </Button>
                  </Link>
                  {team.has_submission && (
                    <Link to={`/teams/${teamId}/submission`}>
                      <Button className="w-full" variant="secondary">
                        <Icon icon="mdi:file-document" className="inline-block mr-2" />
                        View Submission
                      </Button>
                    </Link>
                  )}
                  {!team.has_submission && !isTeamFeaturesClosed && (
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => setShowLeaveModal(true)}
                    >
                      <Icon icon="mdi:exit-run" className="inline-block mr-2" />
                      Leave Team
                    </Button>
                  )}
                </div>
              </div>
            )}

            {members.length === 1 && !team.has_submission && isMember && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-400">
                      Team Needs More Members
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      Your team needs at least 2 members to submit a project. Invite someone or wait for join requests!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {team.has_submission && isMember && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h3 className="font-bold text-green-900 dark:text-green-400">
                      Project Submitted
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
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

          <div className="space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Team Leader
              </h3>
              {team.leader && (
                <button
                  onClick={() => navigate(`/users/${team.leader.id}`)}
                  className="w-full flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors text-left cursor-pointer"
                >
                  {team.leader.avatar ? (
                    <img
                      src={team.leader.avatar}
                      alt={team.leader.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        👤
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {team.leader.fullname}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {team.leader.email}
                    </p>
                  </div>
                </button>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Members ({members.length})
              </h3>
              <div className="space-y-3">
                {members.map((member: any) => (
                  <button
                    key={member.id}
                    onClick={() => navigate(`/users/${member.user.id}`)}
                    className="w-full flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors text-left cursor-pointer"
                  >
                    {member.user?.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt={member.user.fullname || 'Member'}
                        className="w-10 h-10 rounded-full object-cover"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          👤
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {member.user?.fullname || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.role === ETeamMemberRole.LEADER
                          ? 'Leader'
                          : 'Member'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Invite Team Member
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 font-sans">
              Send an invitation to join your team. The invited member will see
              the invitation on their dashboard after logging in.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800 dark:text-yellow-300 font-sans">
                <strong>Important:</strong> The email you enter must match the
                GitHub email address the member uses to sign in.
              </p>
            </div>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label
                  htmlFor="invite-email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="invite-email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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

      {showJoinRequestsModal && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Join Requests ({pendingJoinRequests.length})
              </h2>
              <button
                onClick={() => setShowJoinRequestsModal(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {pendingJoinRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No pending join requests
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 font-sans">
                  When users request to join your team, they'll appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingJoinRequests.map((request: any) => (
                  <div
                    key={request.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {request.user?.avatar ? (
                          <img
                            src={request.user.avatar}
                            alt={request.user.fullname}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                            <span className="text-gray-500 dark:text-gray-400 text-xl">
                              <Icon
                                icon="mdi:account-circle"
                                className="text-3xl"
                              />
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {request.user?.fullname || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {request.user?.email}
                          </p>
                          {request.message && (
                            <div className="mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Message:</strong> {request.message}
                              </p>
                            </div>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-sans">
                            Requested{' '}
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 justify-end">
                      <Button
                        onClick={() =>
                          handleRespondToJoinRequest(request.id, 'approve')
                        }
                        disabled={
                          isResponding || members.length >= MAX_TEAM_MEMBERS
                        }
                        className="px-4 py-2 text-sm"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          handleRespondToJoinRequest(request.id, 'reject')
                        }
                        disabled={isResponding}
                        variant="secondary"
                        className="px-4 py-2 text-sm"
                      >
                        Reject
                      </Button>
                    </div>

                    {members.length >= MAX_TEAM_MEMBERS && (
                      <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                        <p className="text-sm text-yellow-800 dark:text-yellow-300 font-sans">
                          Team is full ({MAX_TEAM_MEMBERS}/{MAX_TEAM_MEMBERS}{' '}
                          members). Remove a member before accepting new
                          requests.
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

      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:exit-run"
                  className="text-3xl text-red-600 dark:text-red-400"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Leave Team?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to leave <strong>{team?.name}</strong>?
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800 dark:text-amber-300 font-sans">
                <strong>Warning:</strong> If you leave, you will need to request to join again or be re-invited by the team leader.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setShowLeaveModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleLeaveTeam}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isLeaving}
              >
                {isLeaving ? 'Leaving...' : 'Leave Team'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:delete-alert"
                  className="text-3xl text-red-600 dark:text-red-400"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Team?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This action is <strong className="text-red-600 dark:text-red-400">permanent</strong> and cannot be undone.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 dark:text-red-300 font-sans">
                <strong>Warning:</strong> All team data, chat messages, and submissions will be permanently deleted.
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <span className="font-bold text-red-600 dark:text-red-400">{team?.name}</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type team name here"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                autoComplete="off"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteTeam}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isDeleting || deleteConfirmText !== team?.name}
              >
                {isDeleting ? 'Deleting...' : 'Delete Team'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboardPage;
