export type TSessionListItem = {
  id: string;
  mentor_id: string;
  mentee_id: string;
  mentee_fullname?: string;
  mentee_email?: string;
  topic: string;
  scheduled_at: string;
  duration_minutes: number;
  session_type: string;
  status: string;
  rating?: number;
  created_at: string;
};

export type TSessionListResponse = {
  sessions: TSessionListItem[];
  total: number;
};

export type TBookSessionRequest = {
  topic: string;
  description?: string;
  scheduled_at: string;
  duration_minutes?: number;
  session_type?: string;
};

export type TBookSessionResponse = {
  id: string;
  mentor_id: string;
  mentee_id: string;
  topic: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  session_type: string;
  status: string;
  created_at: string;
};

export type TUpdateSessionStatusRequest = {
  status: string;
  meeting_link?: string;
};

export type TUpdateSessionStatusResponse = {
  id: string;
  status: string;
  meeting_link?: string;
  updated_at: string;
};

export type TSessionFeedbackRequest = {
  feedback: string;
  rating: number;
};

export type TSessionFeedbackResponse = {
  id: string;
  feedback: string;
  rating: number;
  submitted_at: string;
};

export type TAvailabilitySlot = {
  date: string;
  time: string;
  available: boolean;
};

export type TMentorAvailability = {
  mentor_id: string;
  availability_commitment: string;
  preferred_formats: string[];
  slots: TAvailabilitySlot[];
  booked_dates: string[];
};
