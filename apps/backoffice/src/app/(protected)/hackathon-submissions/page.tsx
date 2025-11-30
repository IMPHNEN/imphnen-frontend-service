import { FC, ReactElement, useState } from 'react';
import ModalUserDetail from '../../../components/modal-user-detail';
import ModalSuspendOrBan from '../../../components/modal-suspend-or-ban';
import ModalDeleteUser from '../../../components/modal-delete-user';
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
import { SearchOutlined } from '@ant-design/icons';

export const HackathonUsersPage: FC = (): ReactElement => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const mockData: any[] = Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    name: i % 3 === 0 ? 'Ahmad Wijuana' : 'Sofia Wijuana',
    email: 'fullname23@gmail.com',
    rating: 4.5,
    status: i % 2 === 0 ? 'active' : 'inactive',
  }));

  type UserStatus = 'active' | 'inactive';

  interface UserType {
    id: number;
    name: string;
    email: string;
    rating: number;
    status: UserStatus;
  }

  const columns: ColumnDef<UserType>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn('w-20') },
      header: ({ table }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<UserStatus, string> = {
          active: 'bg-success-200 text-success-500',
          inactive: 'bg-danger-200 text-danger-500',
        };
        const statusText: Record<UserStatus, string> = {
          active: 'Active',
          inactive: 'Inactive',
        };
        return (
          <div
            className={`py-2 px-4 rounded-md text-center ${statusColors[status]}`}
          >
            {statusText[status]}
          </div>
        );
      },
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-72') },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={
            (e) => {}
            //   {
            //   e.stopPropagation();
            //   setSelectedUserId(row.original.id);
            //   setShowDetail(true);
            // }
          }
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Lihat Detail & Action
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
        Project Submission
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
            <option value="suspended">Suspended</option>
          </select>
          <select className="border border-neutral-200 rounded-md px-3 py-2 text-label1 w-full sm:w-40">
            <option value="all">All City</option>
            <option value="jakarta">Jakarta</option>
            <option value="bandung">Bandung</option>
          </select>
        </div>

        {/* Table */}
        <DataTable data={mockData} columns={columns} table={table} />
      </section>

      {/* Modals extracted into shared backoffice components */}
      <ModalUserDetail
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
      <ModalSuspendOrBan
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
      />
      <ModalDeleteUser
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </BackofficeWrapper>
  );
};

export default HackathonUsersPage;
