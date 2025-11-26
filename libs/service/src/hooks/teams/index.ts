import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as teamsApi from '../../api/teams';
import { supabase, getAuthenticatedClient } from '../../supabase';
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
      try {
        // Supabase client now has auth context from setSession()
        let query = supabase.from('teams').select(`
          *,
          members:team_members(id)
        `);

        // Filter by visibility
        if (params?.visibility) {
          query = query.eq('visibility', params.visibility);
        }

        // Filter by city
        if (params?.city) {
          query = query.eq('city', params.city);
        }

        // Search by name
        if (params?.search) {
          query = query.ilike('name', `%${params.search}%`);
        }

        // Pagination
        if (params?.page && params?.limit) {
          const from = (params.page - 1) * params.limit;
          const to = from + params.limit - 1;
          query = query.range(from, to);
        }

        const { data, error } = await query;

        if (error) {
          // If error is 401/403, it means RLS policies need to be set up
          // Return empty array for now
          console.warn('Teams query error (RLS policies may need to be configured):', error);
          return { data: [] };
        }

        return { data: data || [] };
      } catch (err) {
        console.error('Failed to fetch teams:', err);
        return { data: [] };
      }
    },
  });
};

export const useTeamById = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.detail(teamId),
    queryFn: async () => {
      // Supabase client now has auth context from setSession()
      const { data: team, error } = await supabase
        .from('teams')
        .select(`
          *,
          leader:users!leader_id(id, email, fullname, avatar),
          members:team_members(
            id,
            role,
            status,
            joined_at,
            user:users(id, email, fullname, avatar)
          )
        `)
        .eq('id', teamId)
        .single();

      if (error) {
        console.error('Failed to fetch team:', error);
        throw new Error(error.message || 'Failed to fetch team');
      }

      // Count active members
      const activeMemberCount = team?.members?.filter((m: any) => m.status === 'active').length || 0;

      // Check if team has a submission
      const { data: submission } = await supabase
        .from('project_submissions')
        .select('id')
        .eq('team_id', teamId)
        .maybeSingle();

      return {
        data: {
          ...team,
          member_count: activeMemberCount,
          has_submission: !!submission,
        },
      };
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

      // Supabase client now has auth context from setSession()
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: data.name,
          logo: data.logo,
          banner: data.banner,
          description: data.description,
          city: data.city,
          visibility: data.visibility,
          leader_id: session.user.id,
        })
        .select()
        .single();

      if (teamError) {
        console.error('Failed to create team:', teamError);
        throw new Error(teamError.message || 'Failed to create team');
      }

      // Insert team creator as leader in team_members table
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: team.id,
          user_id: session.user.id,
          role: 'leader',
          status: 'active',
        });

      if (memberError) {
        // If duplicate key error (23505), it means leader is already a member (possibly by trigger)
        // This is acceptable, so we can ignore it
        if (memberError.code === '23505') {
          console.log('Team leader already exists in team_members (likely added by trigger)');
        } else {
          // For other errors, clean up and throw
          console.error('Failed to add team leader as member:', memberError);
          await supabase.from('teams').delete().eq('id', team.id);
          throw new Error('Failed to set up team membership');
        }
      }

      return { data: team };
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

      // Supabase client now has auth context from setSession()
      const { data: team, error } = await supabase
        .from('teams')
        .update({
          name: data.name,
          logo: data.logo,
          banner: data.banner,
          description: data.description,
          city: data.city,
          visibility: data.visibility,
        })
        .eq('id', teamId)
        .select()
        .single();

      if (error) {
        console.error('Failed to update team:', error);
        throw new Error(error.message || 'Failed to update team');
      }

      return { data: team };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Team Members Hooks
export const useTeamMembers = (teamId: string, enabled = true) => {
  return useQuery({
    queryKey: teamKeys.members(teamId),
    queryFn: async () => {
      // Supabase client now has auth context from setSession()
      const { data: members, error } = await supabase
        .from('team_members')
        .select(`
          id,
          team_id,
          user_id,
          role,
          status,
          joined_at,
          user:users(id, email, fullname, avatar)
        `)
        .eq('team_id', teamId)
        .order('joined_at', { ascending: true });

      if (error) {
        console.error('Failed to fetch team members:', error);
        throw new Error(error.message || 'Failed to fetch team members');
      }

      return { data: members || [] };
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

      // Insert invitation into team_invitations table
      const { data: invitation, error } = await supabase
        .from('team_invitations')
        .insert({
          team_id: teamId,
          inviter_id: session.user.id,
          invitee_email: data.email,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to create invitation:', error);
        throw new Error(error.message || 'Failed to send invitation');
      }

      return { data: invitation };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
    },
  });
};

export const useManageMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) =>
      teamsApi.manageMember(teamId, userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
};

export const useRemoveMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => teamsApi.removeMember(teamId, userId),
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

      // Insert join request into team_join_requests table
      const { data: joinRequest, error } = await supabase
        .from('team_join_requests')
        .insert({
          team_id: teamId,
          user_id: session.user.id,
          message: data.message,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to create join request:', error);
        throw new Error(error.message || 'Failed to send join request');
      }

      return { data: joinRequest };
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
      // Fetch join requests with user information
      const { data: requests, error } = await supabase
        .from('team_join_requests')
        .select(`
          id,
          team_id,
          user_id,
          message,
          status,
          created_at,
          user:users(id, email, fullname, avatar)
        `)
        .eq('team_id', teamId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch join requests:', error);
        throw new Error(error.message || 'Failed to fetch join requests');
      }

      return { data: requests || [] };
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

      // First, get the join request details
      const { data: joinRequest, error: fetchError } = await supabase
        .from('team_join_requests')
        .select('id, team_id, user_id, status')
        .eq('id', requestId)
        .single();

      if (fetchError || !joinRequest) {
        throw new Error('Join request not found');
      }

      if (joinRequest.status !== 'pending') {
        throw new Error('Join request has already been processed');
      }

      if (action === 'approve') {
        // Update join request status
        const { error: updateError } = await supabase
          .from('team_join_requests')
          .update({ status: 'accepted' })
          .eq('id', requestId);

        if (updateError) {
          throw new Error('Failed to update join request: ' + updateError.message);
        }

        // Add user as team member
        const { error: memberError } = await supabase
          .from('team_members')
          .insert({
            team_id: joinRequest.team_id,
            user_id: joinRequest.user_id,
            role: 'member',
            status: 'active',
          });

        if (memberError) {
          // If member creation fails, rollback join request update
          await supabase
            .from('team_join_requests')
            .update({ status: 'pending' })
            .eq('id', requestId);

          // Parse Supabase error for user-friendly message
          let errorMsg = memberError.message;
          if (errorMsg.includes('Team already has 5 members') || errorMsg.includes('Team cannot have more than 5 members')) {
            errorMsg = 'Team is full! Maximum 5 members allowed.';
          } else if (errorMsg.includes('already in a team') || errorMsg.includes('User is already in a team')) {
            errorMsg = 'This user is already in another team.';
          } else if (errorMsg.includes('Bulk insert')) {
            errorMsg = 'Invalid operation detected.';
          }

          throw new Error(errorMsg);
        }

        return { success: true, action: 'accepted' };
      } else {
        // Reject join request
        const { error: updateError } = await supabase
          .from('team_join_requests')
          .update({ status: 'rejected' })
          .eq('id', requestId);

        if (updateError) {
          throw new Error('Failed to update join request: ' + updateError.message);
        }

        return { success: true, action: 'rejected' };
      }
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
      if (!session?.user?.email) {
        return { data: [] };
      }

      // Query team_invitations where invitee_email matches current user's email
      const { data: invitations, error } = await supabase
        .from('team_invitations')
        .select(`
          id,
          team_id,
          inviter_id,
          invitee_email,
          invitee_id,
          status,
          created_at,
          team:teams(
            id,
            name,
            logo,
            banner,
            description,
            city,
            visibility,
            leader_id
          ),
          inviter:users!team_invitations_inviter_id_fkey(
            id,
            fullname,
            email,
            avatar
          )
        `)
        .eq('invitee_email', session.user.email)
        .eq('status', 'pending');

      if (error) {
        console.error('Failed to fetch invitations:', error);
        return { data: [] };
      }

      return { data: invitations || [] };
    },
    enabled: !!session?.user?.email,
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

      // First, get the invitation details
      const { data: invitation, error: fetchError } = await supabase
        .from('team_invitations')
        .select('id, team_id, invitee_email, status')
        .eq('id', invitationId)
        .single();

      if (fetchError || !invitation) {
        throw new Error('Invitation not found');
      }

      if (invitation.status !== 'pending') {
        throw new Error('Invitation has already been responded to');
      }

      if (action === 'accept') {
        // Update invitation status and set invitee_id
        const { error: updateError } = await supabase
          .from('team_invitations')
          .update({
            status: 'accepted',
            invitee_id: session.user.id,
          })
          .eq('id', invitationId);

        if (updateError) {
          throw new Error('Failed to update invitation: ' + updateError.message);
        }

        // Create team_members record
        const { error: memberError } = await supabase
          .from('team_members')
          .insert({
            team_id: invitation.team_id,
            user_id: session.user.id,
            role: 'member',
            status: 'active',
          });

        if (memberError) {
          // If member creation fails, rollback invitation update
          await supabase
            .from('team_invitations')
            .update({
              status: 'pending',
              invitee_id: null,
            })
            .eq('id', invitationId);

          throw new Error('Failed to add member to team: ' + memberError.message);
        }

        return { success: true, action: 'accepted' };
      } else {
        // Reject invitation
        const { error: updateError } = await supabase
          .from('team_invitations')
          .update({
            status: 'rejected',
            invitee_id: session.user.id,
          })
          .eq('id', invitationId);

        if (updateError) {
          throw new Error('Failed to update invitation: ' + updateError.message);
        }

        return { success: true, action: 'rejected' };
      }
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
      if (!session?.user?.id) {
        return { data: [] };
      }

      // Query team_members to find teams where user is a member
      const { data: memberships, error: membershipsError } = await supabase
        .from('team_members')
        .select(`
          team_id,
          team:teams(
            id,
            name,
            logo,
            banner,
            description,
            city,
            visibility,
            leader_id,
            created_at
          )
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (membershipsError) {
        console.error('Failed to fetch user teams:', membershipsError);
        return { data: [] };
      }

      // Extract teams from memberships
      const teams = memberships?.map((m: any) => m.team).filter(Boolean) || [];

      return { data: teams };
    },
    enabled: !!session?.user?.id,
  });
};

// Project Submission Hooks
export const useSubmitProject = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TSubmitProjectRequest) => {
      return await teamsApi.submitProject(teamId, data);
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
      const submission = await teamsApi.getTeamSubmission(teamId);
      return { data: submission };
    },
    enabled: enabled && !!teamId,
  });
};

// Leave Team Hook
export const useLeaveTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId: string) => {
      return await teamsApi.leaveTeam(teamId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.myTeams() });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Get Teams by User ID
export const useTeamsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['teams-by-user', userId],
    queryFn: async () => {
      if (!userId) {
        return { data: [] };
      }

      // Query team_members to find teams where user is a member
      const { data: memberships, error: membershipsError } = await supabase
        .from('team_members')
        .select(`
          team_id,
          team:teams(
            id,
            name,
            logo,
            banner,
            description,
            city,
            visibility,
            leader_id,
            created_at
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'active');

      if (membershipsError) {
        console.error('Failed to fetch user teams:', membershipsError);
        return { data: [] };
      }

      // Extract teams from memberships
      const teams = memberships?.map((m: any) => m.team).filter(Boolean) || [];

      return { data: teams };
    },
    enabled: !!userId,
  });
};
