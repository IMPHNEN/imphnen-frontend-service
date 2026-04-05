export type TEventsListItem = {
  id: string;
  name: string;
  description: string;
  detail_link: string;
  price: number;
  is_online: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  location?: string;
  is_deleted: boolean;
};

export type TEventsDetailItem = {
  id: string;
  name: string;
  description: string;
  detail_link: string;
  price: number;
  is_online: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  location?: string;
};

export type TEventCreateRequest = {
  name: string;
  description: string;
  detail_link: string;
  price: number;
  start_date: string;
  end_date: string;
  location?: string;
  is_online: boolean;
};

export type TEventUpdateRequest = TEventCreateRequest;
