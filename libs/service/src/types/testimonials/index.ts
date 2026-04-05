export type TTestimonialsListItem = {
  id: string;
  user_id: string;
  user_fullname: string;
  role: string;
  content: string;
  created_at: string;
  is_deleted: boolean;
};

export type TTestimonialsDetailItem = {
  id: string;
  user_id: string;
  user_fullname: string;
  role: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TTestimonialCreateRequest = {
  role: string;
  content: string;
};

export type TTestimonialUpdateRequest = TTestimonialCreateRequest;
