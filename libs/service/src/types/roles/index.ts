import { TPermissionItem } from '../permissions';

export type TRoleDetailItem = {
  id: string;
  name: string;
  permissions: TPermissionItem[];
  created_at: string;
  updated_at: string;
};

export type TRolesListItem = {
  id: string;
  name: string;
  permissions_count: number;
  created_at: string;
  updated_at: string;
};
