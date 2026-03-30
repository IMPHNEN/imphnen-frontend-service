import { useTeamById, useTeamMembers, useUserMe, useTeamSubmission } from '@imphnen-frontend-service/service';

export const useTeamMembership = (teamId: string) => {
  const { data: userData } = useUserMe();
  const { data: membersData } = useTeamMembers(teamId);

  const currentUser = userData?.data;
  const members = membersData?.data || [];

  const isMember = members.some(m => m.user_id === currentUser?.id);
  const currentMember = members.find(m => m.user_id === currentUser?.id);

  return {
    isMember,
    currentMember,
    memberRole: currentMember?.role,
    memberStatus: currentMember?.status,
  };
};

export const useIsTeamLeader = (teamId: string) => {
  const { data: teamData } = useTeamById(teamId);
  const { data: userData } = useUserMe();

  const team = teamData?.data;
  const currentUser = userData?.data;

  const isLeader = currentUser?.id === team?.leader_id;

  return {
    isLeader,
    leaderId: team?.leader_id,
  };
};

export const useTeamSubmissionStatus = (teamId: string) => {
  const { data: submissionData, isLoading } = useTeamSubmission(teamId, !!teamId);

  const hasSubmission = !!submissionData?.data;
  const submission = submissionData?.data;
  const isSubmitted = submission?.status === 'submitted';

  return {
    hasSubmission,
    isSubmitted,
    submission,
    isLoading,
  };
};

export const useTeamPermissions = (teamId: string) => {
  const { isLeader } = useIsTeamLeader(teamId);
  const { isMember } = useTeamMembership(teamId);
  const { hasSubmission } = useTeamSubmissionStatus(teamId);

  return {
    canEditTeam: isLeader,
    canManageMembers: isLeader,
    canSubmitProject: isLeader && !hasSubmission,
    canViewTeam: isMember,
    canViewSubmission: isMember,
    canAccessChat: isMember,
  };
};
