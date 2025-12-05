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
import { EditOutlined } from '@ant-design/icons';

export const HackathonUsersPage: FC = (): ReactElement => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const mockData: any[] = Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    project_name: `Project ${i + 1}`,
    repository_url: `https://github.com/user/repo${i + 1}`,
    demo_url: `https://demo.example.com/project${i + 1}`,
    presentation_url: `https://slides.example.com/project${i + 1}`,
  }));

  type UserStatus = 'active' | 'inactive';

  interface SubmissionType {
    id: number;
    project_name: string;
    repository_url: string;
    demo_url: string;
    presentation_url: string;
  }

  const columns: ColumnDef<SubmissionType>[] = [
    {
      header: 'Project Name',
      accessorKey: 'project_name',
    },
    {
      header: 'Repository URL',
      accessorKey: 'repository_url',
    },
    {
      header: 'Demo URL',
      accessorKey: 'demo_url',
    },
    {
      header: 'Presentation URL',
      accessorKey: 'presentation_url',
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
    </BackofficeWrapper>
  );
};

export default HackathonUsersPage;
