import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@imphnen-frontend-service/ui/organisms';
import { userService, User } from '../../features/admin/api/user.service';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId: string, currentRole: string) => {
    if (editingUserId === userId) {
      // Save the role
      try {
        await userService.updateUserRole(userId, selectedRole);
        setEditingUserId(null);
        setSelectedRole('');
        await fetchUsers();
      } catch (err) {
        console.error('Error updating user role:', err);
        alert('Failed to update user role');
      }
    } else {
      // Start editing
      setEditingUserId(userId);
      setSelectedRole(currentRole);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }
    try {
      await userService.deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-600">{row.original.email}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const isEditing = editingUserId === row.original.id;
        return (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            ) : (
              <span
                className={`px-2 py-1 rounded-2xl text-xs font-medium ${
                  row.original.role === 'admin'
                    ? 'bg-danger-100 text-danger-800'
                    : 'bg-primary-100 text-primary-800'
                }`}
              >
                {row.original.role.charAt(0).toUpperCase() +
                  row.original.role.slice(1)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => (
        <span className="text-gray-600">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isEditing = editingUserId === row.original.id;
        return (
          <div className="flex gap-2">
            <button
              onClick={() =>
                handleUpdateRole(row.original.id, row.original.role)
              }
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                isEditing
                  ? 'text-success-600 hover:bg-success-50'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
              title={isEditing ? 'Save Role' : 'Change Role'}
            >
              <EditOutlined />
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setEditingUserId(null);
                  setSelectedRole('');
                }}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                title="Cancel"
              >
                ✕
              </button>
            )}
            {!isEditing && (
              <button
                onClick={() =>
                  handleDeleteUser(row.original.id, row.original.name)
                }
                className="p-2 text-danger-600 hover:bg-danger-50 rounded-md transition-colors cursor-pointer"
                title="Delete User"
              >
                <DeleteOutlined />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage users and their roles</p>
      </div>

      {!users || users.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadown-sm">
          <div className="max-w-sm mx-auto">
            <div className="text-gray-400 mb-4">
              <UserOutlined className="text-[48px]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              There are currently no users in the system.
            </p>
          </div>
        </div>
      ) : (
        <DataTable data={users} columns={columns} pageSize={10} />
      )}
    </div>
  );
}
