import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Search, Pencil, Trash2, Plus } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
  useRoleList,
  useDeleteRole,
  TRolesListItem,
} from '@imphnen-frontend-service/service';
import { toast } from 'sonner';
import {
  SelectAllCheckbox,
  RowSelectCheckbox,
  DeleteConfirmDialog,
} from '../../components/list-helpers';

export const Route = createFileRoute('/_authenticated/roles')({
  component: RolesPage,
});

function RolesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});

  const { data: rolesData, isLoading } = useRoleList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const deleteRole = useDeleteRole();

  const roles: TRolesListItem[] = rolesData?.data ?? [];
  const totalItems = rolesData?.meta?.total ?? roles.length;

  const handleDelete = async (id: string) => {
    try {
      await deleteRole.mutateAsync(id);
      toast.success('Data role berhasil dihapus');
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error('Data role gagal dihapus');
    }
  };

  const columns: ColumnDef<TRolesListItem>[] = [
    {
      id: 'select',
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => <RowSelectCheckbox row={row} />,
    },
    { header: 'ID', accessorKey: 'id' },
    { header: 'Roles Name', accessorKey: 'name' },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: '/roles/$id', params: { id: row.original.id } });
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
    data: roles,
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
    <BackofficeWrapper title="Roles" description="Kelola role dan akses">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama role…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate({ to: '/roles/create' })}
              size="md"
            >
              <Plus className="size-4" />
              Tambah Role
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
              data={roles}
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

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Hapus role ini?"
      />
    </BackofficeWrapper>
  );
}
