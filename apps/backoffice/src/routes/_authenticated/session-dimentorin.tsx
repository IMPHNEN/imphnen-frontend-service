import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Search, Eye } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@imphnen-frontend-service/ui/atoms';
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms';
import { cn } from '@imphnen-frontend-service/utils';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import {
  useMySessions,
  TSessionListItem,
} from '@imphnen-frontend-service/service';
import {
  SelectAllCheckbox,
  RowSelectCheckbox,
} from '../../components/list-helpers';

export const Route = createFileRoute('/_authenticated/session-dimentorin')({
  component: SessionDimentorinPage,
});

function SessionDimentorinPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: sessionsData, isLoading } = useMySessions(
    statusFilter !== 'all' ? { status: statusFilter } : undefined
  );

  const sessions: TSessionListItem[] = sessionsData?.sessions ?? [];
  const totalItems = sessionsData?.total ?? sessions.length;

  const statusVariants: Record<
    string,
    'warning' | 'info' | 'success' | 'destructive' | 'secondary'
  > = {
    pending: 'warning',
    confirmed: 'info',
    ongoing: 'warning',
    completed: 'success',
    cancelled: 'destructive',
  };

  const columns: ColumnDef<TSessionListItem>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn('w-10') },
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => <RowSelectCheckbox row={row} />,
    },
    { id: 'id', header: 'ID Sesi', accessorKey: 'id' },
    { id: 'mentorId', header: 'Nama Mentor', accessorKey: 'mentor_id' },
    {
      id: 'menteeName',
      header: 'Nama Mentee',
      accessorKey: 'mentee_fullname',
    },
    {
      id: 'datetime',
      header: 'Waktu',
      accessorKey: 'scheduled_at',
      cell: ({ row }) => (
        <span>
          {new Date(row.original.scheduled_at).toLocaleString('id-ID')}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge
          variant={statusVariants[row.original.status] ?? 'secondary'}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate({
              to: '/session-dimentorin/$id',
              params: { id: row.original.id },
            });
          }}
        >
          <Eye className="size-3.5" />
          Detail
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: sessions,
    columns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    manualPagination: true,
  });

  return (
    <BackofficeWrapper
      title="Session Management"
      description="Kelola sesi mentoring aktif"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Cari nama lengkap…" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="ongoing">On Going</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Memuat data…
            </div>
          ) : (
            <DataTable
              data={sessions}
              columns={columns}
              table={table}
              manualPagination
              pageCount={Math.ceil(totalItems / pagination.pageSize)}
              currentPage={pagination.pageIndex + 1}
              onPageChange={(p) =>
                setPagination((prev) => ({ ...prev, pageIndex: p - 1 }))
              }
            />
          )}
        </CardContent>
      </Card>
    </BackofficeWrapper>
  );
}
