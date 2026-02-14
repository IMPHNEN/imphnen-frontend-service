import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export const UserManagement = () => {
  const queryClient = useQueryClient();

  // Fetch Users
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8080/api/v1/users');
      return res.data.data as User[];
    },
  });

  // Update Role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      await axios.put(`http://localhost:8080/api/v1/users/${id}/role`, {
        role,
      });
    },
    onSuccess: () => {
      toast.success('User role updated');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Failed to update user role'),
  });

  // Delete User
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
    },
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Failed to delete user'),
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Users</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRoleMutation.mutate({
                        id: user.id,
                        role: e.target.value,
                      })
                    }
                    disabled={user.email === 'admin@demo.com'} // Prevent changing main admin role for safety in demo
                    className="bg-transparent border border-slate-300 rounded text-sm px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this user?'
                        )
                      ) {
                        deleteMutation.mutate(user.id);
                      }
                    }}
                    disabled={user.email === 'admin@demo.com'}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
