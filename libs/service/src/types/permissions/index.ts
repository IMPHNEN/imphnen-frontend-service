export type TPermissionItem = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type TPermissionCreateRequest = {
  name: string;
};

export type TPermissionUpdateRequest = {
  name?: string;
};
