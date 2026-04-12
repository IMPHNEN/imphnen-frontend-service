import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Search, Pencil, Trash2, Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Input,
} from '@imphnen-frontend-service/ui/atoms';
import {
  DataTable,
  BackofficeWrapper,
} from '@imphnen-frontend-service/ui/organisms';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import {
  useEventList,
  useDeleteEvent,
  TEventsListItem,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/cms-events')({
  component: CmsEventsPage,
});

function CmsEventsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});

  const { data: eventsData, isLoading } = useEventList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const deleteEvent = useDeleteEvent();

  const events: TEventsListItem[] = eventsData?.data ?? [];
  const totalItems = eventsData?.meta?.total ?? events.length;

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast.success('Data event berhasil dihapus');
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error('Data event gagal dihapus');
    }
  };

  const columns: ColumnDef<TEventsListItem>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? 'indeterminate'
                : false
          }
          onCheckedChange={(v) =>
            table.toggleAllRowsSelected(!!v && v !== 'indeterminate')
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
    },
    { header: 'Name', accessorKey: 'name' },
    {
      header: 'Location',
      accessorKey: 'location',
      cell: ({ row }) => row.original.location || '-',
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) =>
        row.original.price === 0
          ? 'Free'
          : `Rp ${row.original.price.toLocaleString('id-ID')}`,
    },
    {
      header: 'Start Date',
      accessorKey: 'start_date',
      cell: ({ row }) =>
        new Date(row.original.start_date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      header: 'Online',
      accessorKey: 'is_online',
      cell: ({ row }) => (
        <Badge variant={row.original.is_online ? 'success' : 'secondary'}>
          {row.original.is_online ? 'Online' : 'Offline'}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate({
                to: '/cms-events/$id',
                params: { id: row.original.id },
              });
            }}
          >
            <Pencil className="size-3.5" />
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(row.original.id);
            }}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: events,
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
    <BackofficeWrapper title="CMS Events" description="Kelola event komunitas">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama event…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate({ to: '/cms-events/create' })}
              size="md"
            >
              <Plus className="size-4" />
              Tambah Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Memuat data…
            </div>
          ) : (
            <DataTable
              data={events}
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

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus event ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Event akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </BackofficeWrapper>
  );
}
