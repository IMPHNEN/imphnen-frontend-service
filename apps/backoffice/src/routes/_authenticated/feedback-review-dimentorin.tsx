import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { Search, MessageSquare } from 'lucide-react';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
import { useMySessions, TSessionListItem } from '@imphnen-frontend-service/service';
import {
  SelectAllCheckbox,
  RowSelectCheckbox,
} from '../../components/list-helpers';

export const Route = createFileRoute(
  '/_authenticated/feedback-review-dimentorin'
)({
  component: FeedbackReviewDimentorinPage,
});

function FeedbackReviewDimentorinPage() {
  const [activeTab, setActiveTab] = React.useState<'mentoring' | 'platform'>(
    'mentoring'
  );
  const [ratingFilter, setRatingFilter] = React.useState<string>('all');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: sessionsData, isLoading } = useMySessions(
    activeTab === 'mentoring' ? { status: 'completed' } : undefined
  );

  const allSessions: TSessionListItem[] =
    activeTab === 'mentoring' ? (sessionsData?.sessions ?? []) : [];

  const sessions = React.useMemo(() => {
    return allSessions.filter((s) => {
      if (statusFilter !== 'all') {
        const hasRating = !!s.rating;
        if (statusFilter === 'done' && !hasRating) return false;
        if (statusFilter === 'todo' && hasRating) return false;
      }
      if (ratingFilter !== 'all' && String(s.rating ?? '') !== ratingFilter)
        return false;
      return true;
    });
  }, [allSessions, statusFilter, ratingFilter]);

  const totalItems =
    activeTab === 'mentoring' ? (sessionsData?.total ?? sessions.length) : 0;

  const columns: ColumnDef<TSessionListItem>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn('w-10') },
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => <RowSelectCheckbox row={row} />,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'mentee_fullname',
      cell: ({ row }) => <span>{row.original.mentee_fullname ?? '-'}</span>,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'mentee_email',
      cell: ({ row }) => <span>{row.original.mentee_email ?? '-'}</span>,
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
      cell: ({ row }) => <span>{row.original.rating ?? '-'}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const hasRating = !!row.original.rating;
        return (
          <Badge variant={hasRating ? 'success' : 'info'}>
            {hasRating ? 'Done' : 'To Do'}
          </Badge>
        );
      },
    },
    {
      header: 'Action',
      cell: () => (
        <Button variant="secondary" size="sm">
          <MessageSquare className="size-3.5" />
          Lihat Feedback
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
      title="Feedback & Review"
      description="Review feedback dari mentoring & platform"
    >
      <Card>
        <CardContent className="pt-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as 'mentoring' | 'platform');
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
                <TabsTrigger value="platform">Platform</TabsTrigger>
              </TabsList>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Cari nama mentor/mentee…"
                  />
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Rating</SelectItem>
                    <SelectItem value="4.5">4.5</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="mentoring" className="mt-4">
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
            </TabsContent>
            <TabsContent value="platform" className="mt-4">
              <div className="py-10 text-center text-sm text-muted-foreground">
                Platform feedback belum tersedia
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </BackofficeWrapper>
  );
}
