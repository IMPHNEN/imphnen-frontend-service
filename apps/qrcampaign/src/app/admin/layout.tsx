import { Outlet } from 'react-router-dom';
import { RequireAdmin } from '../features/admin/components/RequireAdmin';

export default function AdminLayout() {
  return (
    <RequireAdmin>
      <Outlet />
    </RequireAdmin>
  );
}
