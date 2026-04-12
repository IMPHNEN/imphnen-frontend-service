import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Filter as FilterIcon, Search, Pencil } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from '@imphnen-frontend-service/ui/atoms';
import {
  DataTable,
  Filter,
  BackofficeWrapper,
} from '@imphnen-frontend-service/ui/organisms';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table';
import {
  useUserList,
  TUsersListItem,
} from '@imphnen-frontend-service/service';

export const Route = createFileRoute('/_authenticated/accounts')({
  component: AccountsPage,
});

function AccountsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = React.useState(false);

  const { data: usersData, isLoading } = useUserList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });

  const users: TUsersListItem[] = usersData?.data ?? [];
  const totalItems = usersData?.meta?.total ?? users.length;

  const columns: ColumnDef<TUsersListItem>[] = [
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
    { header: 'No', accessorKey: 'id' },
    { header: 'Nama Lengkap', accessorKey: 'fullname' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? 'success' : 'destructive'}>
          {row.original.is_active ? 'Aktif' : 'Tidak Aktif'}
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
            navigate({ to: '/accounts/$id', params: { id: row.original.id } });
          }}
        >
          <Pencil className="size-3.5" /> Edit
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
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
      title="Data Akun"
      description="Kelola akun pengguna yang terdaftar"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama lengkap atau email…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Popover open={showFilter} onOpenChange={setShowFilter}>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="md">
                  <FilterIcon className="size-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Filter
                  onClose={() => setShowFilter(false)}
                  options={[
                    { id: 'all', value: 'all', label: 'Semua' },
                    { id: 'active', value: 'active', label: 'Aktif' },
                    { id: 'inactive', value: 'inactive', label: 'Tidak Aktif' },
                  ]}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Memuat data…
            </div>
          ) : (
            <DataTable
              data={users}
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
