export type TRoadmapStatus = 'upcoming' | 'in_progress' | 'completed';

export type TRoadmapListItem = {
  id: string;
  title: string;
  description: string;
  status: TRoadmapStatus;
  votes: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};

export type TRoadmapDetailItem = {
  id: string;
  title: string;
  description: string;
  status: TRoadmapStatus;
  votes: number;
  created_at: string;
  updated_at: string;
};

export type TRoadmapCreateRequest = {
  title: string;
  description: string;
  status: TRoadmapStatus;
};

export type TRoadmapUpdateRequest = TRoadmapCreateRequest;
