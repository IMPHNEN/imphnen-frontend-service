import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../../api/index';
import { useAuthStore } from '../auth';
import type {
  TCreateTeamRequest,
  TUpdateTeamRequest,
  TInviteMemberRequest,
  TJoinTeamRequest,
  TSubmitProjectRequest,
} from '../../types/teams';

export const teamKeys = {
  all: ['teams'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...teamKeys.lists(), filters] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: string) => [...teamKeys.details(), id] as const,
  members: (id: string) => [...teamKeys.detail(id), 'members'] as const,
  joinRequests: (id: string) => [...teamKeys.detail(id), 'join-requests'] as const,
  submission: (id: string) => [...teamKeys.detail(id), 'submission'] as const,
  myTeams: () => [...teamKeys.all, 'my-teams'] as const,
  myInvitations: () => [...teamKeys.all, 'my-invitations'] as const,
};

interface TeamMember {
  id: string; team_id: string; user_id: string; role: string; status: string;
  joined_at: string; user?: { id: string; email: string; fullname: string; avatar: string };
}
interface Team {
  id: string; name: string; logo?: string; banner?: string; description?: string;
  city?: string; visibility: string; leader_id: string; created_at: string;
  leader?: { id: string; email: string; fullname: string; avatar: string };
  members?: TeamMember[]; member_count?: number; has_submission?: boolean;
}
interface JoinRequest {
  id: string; team_id: string; user_id: string; message?: string; status: string;
  created_at: string; user?: { id: string; email: string; fullname: string; avatar: string };
}
interface Invitation {
  id: string; team_id: string; inviter_id: string; invitee_email: string;
  invitee_id?: string; status: string; created_at: string; team?: Team;
  inviter?: { id: string; fullname: string; email: string; avatar: string };
}
interface Submission {
  id: string; team_id: string; project_name: string; description?: string;
  repository_url?: string; demo_url?: string; video_url?: string;
  presentation_url?: string; status: string; submitted_at?: string; created_at: string;
}
interface ListMeta { page: number; per_page: number; total_page: number; total_data: number; }
interface ListResponse<T> { message: string; data: T[]; meta: ListMeta; }
interface ApiResp<T> { data: T; message?: string; }

const TEAMS_PAGE_SIZE = 12;

export const useTeams = (params?: {
  page?: number; limit?: number; city?: string; visibility?: string; search?: string;
  minMembers?: number; maxMembers?: number; hasSubmission?: boolean;
}) => {
  return useQuery({
    queryKey: teamKeys.list(params as Record<string, unknown>),
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('per_page', String(params.limit));
      if (params?.search) queryParams.append('search', params.search);
      if (params?.city) queryParams.append('city', params.city);
      if (params?.visibility) queryParams.append('visibility', params.visibility);
      if (params?.minMembers) queryParams.append('min_members', String(params.minMembers));
      if (params?.maxMembers) queryParams.append('max_members', String(params.maxMembers));
      if (params?.hasSubmission !== undefined) queryParams.append('has_submission', String(params.hasSubmission));
      const qs = queryParams.toString();
      const response = await api.get<ListResponse<Team>>(
        `/v1/hackathon/teams/browse${qs ? `?${qs}` : ''}`
      );
      const { data, meta } = response.data;
      return {
        teams: data || [],
        total: meta?.total_data || 0,
        page: meta?.page || 1,
        perPage: meta?.per_page || 12,
        totalPages: meta?.total_page || 1,
      };
    },
  });
};

export const useInfiniteTeams = (params?: { city?: string; visibility?: string; search?: string }) => {
  return useInfiniteQuery({
    queryKey: [...teamKeys.lists(), 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', String(pageParam));
      queryParams.append('limit', String(TEAMS_PAGE_SIZE));
      if (params?.search) queryParams.append('search', params.search);
      if (params?.city) queryParams.append('city', params.city);
      if (params?.visibility) queryParams.append('visibility', params.visibility);
      const response = await api.get<ApiResp<Team[]>>(`/v1/hackathon/teams/browse?${queryParams}`);
      const teams = response.data.data || [];
      return { data: teams, nextPage: teams.length === TEAMS_PAGE_SIZE ? pageParam + 1 : undefined };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: { nextPage?: number }) => lastPage.nextPage,
  });
};

export const useTeamById = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.detail(teamId),
    queryFn: async () => {
      const response = await api.get<ApiResp<Team>>(`/v1/hackathon/teams/${teamId}`);
      return { data: response.data.data };
    },
    enabled: enabled && !!teamId,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (data: TCreateTeamRequest) => {
      if (!session?.user?.id) throw new Error('You must be logged in to create a team');
      const response = await api.post<ApiResp<Team>>('/v1/hackathon/teams', data);
      return { data: response.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
    },
  });
};

export const useUpdateTeam = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (data: TUpdateTeamRequest) => {
      if (!session?.user?.id) throw new Error('You must be logged in to update a team');
      const response = await api.put<ApiResp<Team>>(`/v1/hackathon/teams/${teamId}`, data);
      return { data: response.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

export const useTeamMembers = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.members(teamId),
    queryFn: async () => {
      const response = await api.get<ApiResp<Team>>(`/v1/hackathon/teams/${teamId}`);
      return { data: response.data.data?.members || [] };
    },
    enabled: enabled && !!teamId,
  });
};

export const useInviteMember = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (data: TInviteMemberRequest) => {
      if (!session?.user?.id) throw new Error('You must be logged in to invite a member');
      const response = await api.post<ApiResp<Invitation>>(
        `/v1/hackathon/invitations/teams/${teamId}/invite`,
        { invitee_email: data.email }
      );
      return { data: response.data.data };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) }),
  });
};

export const useManageMember = (teamId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: { role?: string; status?: string } }) => {
      // Remove member is the available operation; role management not exposed by backend
      await api.delete(`/v1/hackathon/teams/${teamId}/members/${userId}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

export const useRemoveMember = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!session?.user?.id) throw new Error('You must be logged in to remove a member');
      await api.delete(`/v1/hackathon/teams/${teamId}/members/${userId}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

export const useJoinTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: TJoinTeamRequest }) => {
      if (!session?.user?.id) throw new Error('You must be logged in to join a team');
      const response = await api.post<ApiResp<JoinRequest>>(
        `/v1/hackathon/join-requests/teams/${teamId}`,
        { message: data.message }
      );
      return { data: response.data.data };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: teamKeys.lists() }),
  });
};

export const useTeamJoinRequests = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.joinRequests(teamId),
    queryFn: async () => {
      const response = await api.get<ApiResp<JoinRequest[]>>(
        `/v1/hackathon/join-requests/teams/${teamId}/pending`
      );
      return { data: response.data.data || [] };
    },
    enabled: enabled && !!teamId,
  });
};

export const useRespondToJoinRequest = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: 'approve' | 'reject' }) => {
      if (!session?.user?.id) throw new Error('You must be logged in to respond to join requests');
      const backendAction = action === 'approve' ? 'accept' : 'reject';
      await api.post(`/v1/hackathon/join-requests/${requestId}/respond`, { action: backendAction });
      return { success: true, action };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.joinRequests(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

export const useMyInvitations = () => {
  const { session } = useAuthStore();
  return useQuery({
    queryKey: teamKeys.myInvitations(),
    queryFn: async () => {
      const response = await api.get<ApiResp<Invitation[]>>('/v1/hackathon/invitations/my');
      return { data: response.data.data || [] };
    },
    enabled: !!session?.user?.id,
  });
};

export const useRespondToInvitation = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async ({ invitationId, action }: { invitationId: string; action: 'accept' | 'reject' }) => {
      if (!session?.user?.id) throw new Error('User not authenticated');
      await api.post(`/v1/hackathon/invitations/${invitationId}/respond`, { action });
      return { success: true, action };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myInvitations() });
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

export const useMyTeams = () => {
  const { session } = useAuthStore();
  return useQuery({
    queryKey: teamKeys.myTeams(),
    queryFn: async () => {
      const response = await api.get<ApiResp<unknown[]>>('/v1/hackathon/teams/my');
      const rawData = response.data.data || [];
      const teams = rawData.map((item: unknown) => (item as Record<string, unknown>).team ?? item);
      return { data: teams };
    },
    enabled: !!session?.user?.id,
  });
};

export const useSubmitProject = (teamId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TSubmitProjectRequest) => {
      let submissionId: string;
      try {
        const existing = await api.get<ApiResp<Submission | null>>(`/v1/hackathon/submissions/teams/${teamId}`);
        if (existing.data.data?.id) {
          const res = await api.put<ApiResp<Submission>>(`/v1/hackathon/submissions/${existing.data.data.id}`, data);
          submissionId = res.data.data.id;
        } else throw new Error('No existing submission');
      } catch {
        const res = await api.post<ApiResp<Submission>>(`/v1/hackathon/submissions/teams/${teamId}`, data);
        submissionId = res.data.data.id;
      }
      await api.post<ApiResp<Submission>>(`/v1/hackathon/submissions/${submissionId}/submit`);
      const final = await api.post<ApiResp<Submission>>(`/v1/hackathon/submissions/${submissionId}/confirm`);
      return { data: final.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.submission(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

export const useTeamSubmission = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.submission(teamId),
    queryFn: async () => {
      const response = await api.get<ApiResp<Submission | null>>(`/v1/hackathon/submissions/teams/${teamId}`);
      return { data: response.data.data };
    },
    enabled: enabled && !!teamId,
  });
};

export const useLeaveTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (teamId: string) => {
      if (!session?.user?.id) throw new Error('You must be logged in to leave a team');
      await api.post(`/v1/hackathon/teams/${teamId}/leave`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  return useMutation({
    mutationFn: async (teamId: string) => {
      if (!session?.user?.id) throw new Error('You must be logged in to delete a team');
      await api.delete(`/v1/hackathon/teams/${teamId}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

export const useTeamsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['teams-by-user', userId],
    queryFn: async () => {
      const response = await api.get<ApiResp<unknown[]>>(`/v1/hackathon/users/${userId}/teams`);
      const rawData = response.data.data || [];
      const teams = rawData.map((item: unknown) => (item as Record<string, unknown>).team ?? item);
      return { data: teams };
    },
    enabled: !!userId,
  });
};
