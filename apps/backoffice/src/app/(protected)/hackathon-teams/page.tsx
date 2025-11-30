import { FC, ReactElement, useState } from 'react';
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
import { useTeams } from '@imphnen-frontend-service/service';
import { EditOutlined } from '@ant-design/icons';

export const HackathonTeamsPage: FC = (): ReactElement => {
  const { data: teamsData } = useTeams();

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
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Team Name',
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
              'py-2 px-4 text-sm rounded-2xl text-center',
              isPublic
                ? 'bg-info-200 text-info-700'
                : 'bg-gray-200 text-gray-700'
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
          <span className="text-gray-400 italic">-</span>
        );
      },
    },
    {
      accessorKey: 'has_submission',
      header: 'Submitted',
      cell: ({ row }) => {
        const hasSubmission = row.original.has_submission;
        return (
          <span
            className={cn(
              'py-2 px-4 text-sm rounded-2xl text-center',
              hasSubmission
                ? 'bg-success-200 text-success-700'
                : 'bg-danger-200 text-danger-700'
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
        return new Date(row.original.updated_at).toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: 'Action',
      meta: { cellClassName: cn('w-48') },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
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
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">
        Team Management
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
    </BackofficeWrapper>
  );
};

export default HackathonTeamsPage;
