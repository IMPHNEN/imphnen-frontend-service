import { TPermissionItem } from '../permissions';

export type TRolesListItem = {
  id: string;
  name: string;
  permissions_count: number;
  created_at?: string;
  updated_at?: string;
};

export type TRoleDetailItem = {
  id: string;
  name: string;
  description?: string;
  is_system_role?: boolean;
  is_default?: boolean;
  is_deleted?: boolean;
  permissions: TPermissionItem[];
  created_at?: string;
  updated_at?: string;
};

export type TRoleCreateRequest = {
  name: string;
  permissions: string[];
};

export type TRoleUpdateRequest = {
  name?: string;
  permissions?: string[];
};
