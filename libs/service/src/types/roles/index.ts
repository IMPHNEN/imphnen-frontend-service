import { TPermissionItem } from '../permissions';

export type TRoleItem = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: TPermissionItem[];
};
