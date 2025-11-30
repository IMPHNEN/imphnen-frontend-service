import { FC, ReactElement, useState } from 'react';
import ModalUserDetail from './_components/modal-user-detail';
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';
import { EditOutlined } from '@ant-design/icons';
// Removed unused SearchOutlined icon after schema revision

export const HackathonUsersPage: FC = (): ReactElement => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  // Mock data aligned to API user schema
  interface UserType {
    id: string;
    fullname: string;
    email: string;
    is_active: boolean;
    location: string;
    created_at: string;
    updated_at: string;
    avatar?: string;
    phone_number?: string;
  }

  const mockData: UserType[] = Array.from({ length: 50 }, (_, i) => ({
    id: `24db9e4d-ca4c-46aa-ac36-8ef04bbe015f`,
    fullname: i % 3 === 0 ? 'Ahmad Wijuana' : 'Sofia Wijuana',
    email: `user${i + 1}@example.com`,
    is_active: i % 5 !== 0,
    location: i % 2 === 0 ? 'Jakarta' : 'Bandung',
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    avatar: undefined,
    phone_number: '+62-812-0000-000',
  }));

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'fullname',
      header: 'Full Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={cn(
            'py-2 px-4 text-sm rounded-2xl text-center',
            row.original.is_active
              ? 'bg-success-200 text-success-700'
              : 'bg-danger-200 text-danger-700'
          )}
        >
          {row.original.is_active ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-72') },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          className="flex items-center gap-2 w-max"
          onClick={() => {
            // View detail logic
          }}
        >
          <EditOutlined className="text-base" /> View & Manage
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      pagination,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(mockData.length / pagination.pageSize),
    manualPagination: false,
  });

  return (
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">
        User Management
      </h1>
      {/* Filters and actions */}
      <section className="bg-white rounded-md shadow p-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            className="border border-neutral-200 rounded-md px-3 py-2 text-label1 w-full sm:w-64"
            placeholder="Search name or email"
          />
          <select className="border border-neutral-200 rounded-md px-3 py-2 text-label1 w-full sm:w-40">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select className="border border-neutral-200 rounded-md px-3 py-2 text-label1 w-full sm:w-40">
            <option value="all">All Location</option>
            <option value="jakarta">Jakarta</option>
            <option value="bandung">Bandung</option>
          </select>
        </div>

        {/* Table */}
        <DataTable data={mockData} columns={columns} table={table} />
      </section>

      {/* Modals component */}
      <ModalUserDetail
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </BackofficeWrapper>
  );
};

export default HackathonUsersPage;
