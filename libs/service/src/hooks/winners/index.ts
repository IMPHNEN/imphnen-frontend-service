import { useQuery } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';

export const winnerKeys = {
  all: ['winners'] as const,
  lists: () => [...winnerKeys.all, 'list'] as const,
};

interface Team {
  id: string;
  name: string;
  description: string;
  city: string;
  visibility: string;
  logo: string;
  banner: string;
  leader_id: string;
  created_at: string;
  updated_at: string;
}

interface Winner {
  id: string;
  team_id: string;
  team: Team;
  rank: number;
  prize: string;
  announced_at: string;
  created_at: string;
  updated_at: string;
}

export const useWinners = () => {
  return useQuery<HackathonApiResponse<Winner[]>>({
    queryKey: winnerKeys.lists(),
    queryFn: async () => {
      const response = await hackathonApi.get('/winners');
      return response.data;
    },
  });
};
