import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { useAuthStore } from '../auth';
import type {
  TCreateTeamRequest,
  TUpdateTeamRequest,
  TInviteMemberRequest,
  TJoinTeamRequest,
  TSubmitProjectRequest,
} from '../../types/teams';

// Query keys
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

// API response types
interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  status: string;
  joined_at: string;
  user?: {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
  };
}

interface Team {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  description?: string;
  city?: string;
  visibility: string;
  leader_id: string;
  created_at: string;
  leader?: {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
  };
  members?: TeamMember[];
  member_count?: number;
  has_submission?: boolean;
}

interface JoinRequest {
  id: string;
  team_id: string;
  user_id: string;
  message?: string;
  status: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
    fullname: string;
    avatar: string;
  };
}

interface Invitation {
  id: string;
  team_id: string;
  inviter_id: string;
  invitee_email: string;
  invitee_id?: string;
  status: string;
  created_at: string;
  team?: Team;
  inviter?: {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
  };
}

interface Submission {
  id: string;
  team_id: string;
  project_name: string;
  description?: string;
  repository_url?: string;
  demo_url?: string;
  video_url?: string;
  presentation_url?: string;
  status: string;
  submitted_at?: string;
  created_at: string;
}

// Pagination response type
interface PaginatedTeamsResponse {
  teams: Team[];
  total: number;
  page: number;
  per_page: number;
}

// Team CRUD Hooks
export const useTeams = (params?: {
  page?: number;
  limit?: number;
  city?: string;
  visibility?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));
      if (params?.search) queryParams.append('search', params.search);
      if (params?.city) queryParams.append('city', params.city);
      if (params?.visibility) queryParams.append('visibility', params.visibility);

      const response = await hackathonApi.get<HackathonApiResponse<PaginatedTeamsResponse>>(
        `/teams/browse${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      );

      const data = response.data.data;
      return {
        teams: data?.teams || [],
        total: data?.total || 0,
        page: data?.page || 1,
        perPage: data?.per_page || 12,
        totalPages: Math.ceil((data?.total || 0) / (data?.per_page || 12)),
      };
    },
  });
};

// Infinite scroll teams hook
const TEAMS_PAGE_SIZE = 12;

export const useInfiniteTeams = (params?: {
  city?: string;
  visibility?: string;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [...teamKeys.lists(), 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', String(pageParam));
      queryParams.append('limit', String(TEAMS_PAGE_SIZE));
      if (params?.search) queryParams.append('search', params.search);
      if (params?.city) queryParams.append('city', params.city);
      if (params?.visibility) queryParams.append('visibility', params.visibility);

      const response = await hackathonApi.get<HackathonApiResponse<Team[]>>(
        `/teams/browse?${queryParams.toString()}`
      );

      const teams = response.data.data || [];
      return {
        data: teams,
        nextPage: teams.length === TEAMS_PAGE_SIZE ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useTeamById = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.detail(teamId),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Team>>(`/teams/${teamId}`);
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
      if (!session?.user?.id) {
        throw new Error('You must be logged in to create a team');
      }

      const response = await hackathonApi.post<HackathonApiResponse<Team>>('/teams', {
        name: data.name,
        logo: data.logo,
        banner: data.banner,
        description: data.description,
        city: data.city,
        visibility: data.visibility,
      });

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
      if (!session?.user?.id) {
        throw new Error('You must be logged in to update a team');
      }

      const response = await hackathonApi.put<HackathonApiResponse<Team>>(`/teams/${teamId}`, {
        name: data.name,
        logo: data.logo,
        banner: data.banner,
        description: data.description,
        city: data.city,
        visibility: data.visibility,
      });

      return { data: response.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Team Members Hooks - using team detail endpoint which includes members
export const useTeamMembers = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.members(teamId),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Team>>(`/teams/${teamId}`);
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
      if (!session?.user?.id) {
        throw new Error('You must be logged in to invite a member');
      }

      const response = await hackathonApi.post<HackathonApiResponse<Invitation>>(
        `/teams/${teamId}/invite`,
        { invitee_email: data.email }
      );

      return { data: response.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
    },
  });
};

export const useManageMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: { role?: string; status?: string } }) => {
      // This endpoint may not exist in the backend yet
      // For now, we'll throw an error indicating it's not implemented
      throw new Error('Manage member functionality not yet implemented in backend');
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
      if (!session?.user?.id) {
        throw new Error('You must be logged in to remove a member');
      }

      await hackathonApi.delete(`/teams/${teamId}/members/${userId}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

// Join Requests Hooks
export const useJoinTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: TJoinTeamRequest }) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to join a team');
      }

      const response = await hackathonApi.post<HackathonApiResponse<JoinRequest>>(
        `/join-requests/teams/${teamId}`,
        { message: data.message }
      );

      return { data: response.data.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

export const useTeamJoinRequests = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.joinRequests(teamId),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<JoinRequest[]>>(
        `/join-requests/teams/${teamId}/pending`
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
      if (!session?.user?.id) {
        throw new Error('You must be logged in to respond to join requests');
      }

      // Backend uses 'accept' instead of 'approve'
      const backendAction = action === 'approve' ? 'accept' : 'reject';

      await hackathonApi.post(`/join-requests/${requestId}/respond`, {
        action: backendAction,
      });

      return { success: true, action };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.joinRequests(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

// Invitations Hooks
export const useMyInvitations = () => {
  const { session } = useAuthStore();

  return useQuery({
    queryKey: teamKeys.myInvitations(),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Invitation[]>>('/invitations/my');
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
      if (!session?.user?.id) {
        throw new Error('User not authenticated');
      }

      await hackathonApi.post(`/invitations/${invitationId}/respond`, { action });

      return { success: true, action };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myInvitations() });
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// User's Teams
export const useMyTeams = () => {
  const { session } = useAuthStore();

  return useQuery({
    queryKey: teamKeys.myTeams(),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Team[]>>('/teams/my');
      return { data: response.data.data || [] };
    },
    enabled: !!session?.user?.id,
  });
};

// Project Submission Hooks
export const useSubmitProject = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TSubmitProjectRequest) => {
      // First, check if submission exists
      try {
        const existingResponse = await hackathonApi.get<HackathonApiResponse<Submission | null>>(
          `/submissions/teams/${teamId}`
        );

        if (existingResponse.data.data?.id) {
          // Update existing submission
          const response = await hackathonApi.put<HackathonApiResponse<Submission>>(
            `/submissions/${existingResponse.data.data.id}`,
            {
              project_name: data.project_name,
              description: data.description,
              repository_url: data.repository_url,
              demo_url: data.demo_url,
              video_url: data.video_url,
              presentation_url: data.presentation_url,
            }
          );
          return { data: response.data.data };
        }
      } catch {
        // No existing submission, create new one
      }

      // Create new submission
      const response = await hackathonApi.post<HackathonApiResponse<Submission>>(
        `/submissions/teams/${teamId}`,
        {
          project_name: data.project_name,
          description: data.description,
          repository_url: data.repository_url,
          demo_url: data.demo_url,
          video_url: data.video_url,
          presentation_url: data.presentation_url,
        }
      );

      return { data: response.data.data };
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
      const response = await hackathonApi.get<HackathonApiResponse<Submission | null>>(
        `/submissions/teams/${teamId}`
      );
      return { data: response.data.data };
    },
    enabled: enabled && !!teamId,
  });
};

// Leave Team Hook
export const useLeaveTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async (teamId: string) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to leave a team');
      }

      // Use the dedicated leave team endpoint
      await hackathonApi.post(`/teams/${teamId}/leave`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Delete Team Hook (Leader only)
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async (teamId: string) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to delete a team');
      }

      await hackathonApi.delete(`/teams/${teamId}`);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Get Teams by User ID - uses /users/{user_id}/teams
export const useTeamsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['teams-by-user', userId],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Team[]>>(`/users/${userId}/teams`);
      return { data: response.data.data || [] };
    },
    enabled: !!userId,
  });
};
