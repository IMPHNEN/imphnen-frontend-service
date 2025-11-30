import { FC, ReactElement, useState } from 'react';
import ModalUserDetail from '../../../components/modal-user-detail';
import ModalSuspendOrBan from '../../../components/modal-suspend-or-ban';
import ModalDeleteUser from '../../../components/modal-delete-user';
import { DataTable } from '@imphnen-frontend-service/ui/organisms';
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

export const HackathonTeamsPage: FC = (): ReactElement => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const mockData: TeamType[] = Array.from({ length: 90 }, (_, i) => ({
    id: `team-${i + 1}`,
    name: `Team ${i + 1} - ${i % 3 === 0 ? 'Innovators' : 'Hackers'}`,
    city: i % 2 === 0 ? 'Jakarta' : 'Bandung',
    visibility: i % 4 === 0 ? 'private' : 'public',
    member_count: Math.floor(Math.random() * 4) + 1,
    has_submission: i % 3 !== 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    leader: {
      user: {
        fullname: `Leader User ${i}`,
        email: `leader${i}@example.com`,
      },
    },
  }));

  interface TeamType {
    id: string;
    name: string;
    city: string;
    visibility: 'public' | 'private';
    member_count: number;
    has_submission: boolean;
    created_at: string;
    updated_at: string;
    leader?: {
      user: {
        fullname: string;
        email: string;
      };
    };
  }

  const columns: ColumnDef<TeamType>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn('w-12') },
      header: ({ table }) => (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Team Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.name}</div>
          <div className="text-xs text-gray-500">{row.original.id}</div>
        </div>
      ),
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'visibility',
      header: 'Visibility',
      cell: ({ row }) => {
        const isPublic = row.original.visibility === 'public';
        return (
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              isPublic
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            )}
          >
            {isPublic ? 'Public' : 'Private'}
          </span>
        );
      },
    },
    {
      accessorKey: 'member_count',
      header: 'Members',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{row.getValue('member_count')}</span>
          <span className="text-gray-500 text-xs">members</span>
        </div>
      ),
    },
    {
      id: 'leader',
      header: 'Leader',
      cell: ({ row }) => {
        const leader = row.original.leader?.user;
        return leader ? (
          <div>
            <div className="text-sm font-medium text-gray-900">
              {leader.fullname}
            </div>
            <div className="text-xs text-gray-500">{leader.email}</div>
          </div>
        ) : (
          <span className="text-gray-400 italic">No leader</span>
        );
      },
    },
    {
      accessorKey: 'has_submission',
      header: 'Submission',
      cell: ({ row }) => {
        const hasSubmission = row.original.has_submission;
        return (
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              hasSubmission
                ? 'bg-blue-100 text-blue-700'
                : 'bg-orange-100 text-orange-700'
            )}
          >
            {hasSubmission ? 'Yes' : 'No'}
          </span>
        );
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Last Updated',
      cell: ({ row }) => {
        return (
          <span className="text-sm text-gray-500">
            {new Date(row.original.updated_at).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Action',
      meta: { cellClassName: cn('w-48') },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            size="sm"
            className="text-primary-600 hover:text-primary-700 p-0"
            onClick={() => {
              // View detail logic
            }}
          >
            View
          </Button>
          <span className="text-gray-300">|</span>
          <Button
            variant="text"
            size="sm"
            className="text-gray-600 hover:text-gray-700 p-0"
            onClick={() => {
              // Manage logic
            }}
          >
            Manage
          </Button>
        </div>
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
    <main className="w-full px-12 py-10 flex flex-col gap-8">
      <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
        <h1 className="text-p2 font-semibold">Hackathon Teams</h1>
      </header>

      {/* Filters and actions */}
      <section className="bg-white rounded-lg shadow p-8 flex flex-col gap-6">
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
    </main>
  );
};

export default HackathonTeamsPage;
