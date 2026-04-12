import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { Filter as FilterIcon, Search, ClipboardCheck } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import ModalValidate from './_components/transactions/modal-validate';
import {
  SelectAllCheckbox,
  RowSelectCheckbox,
} from '../../components/list-helpers';

type TransactionStatus = 'valid' | 'invalid' | 'unchecked';

interface Transaction {
  id: number;
  name: string;
  transactionNumber: string;
  status: TransactionStatus;
}

const mockTransactions: Transaction[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i + 1,
    name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
    transactionNumber: '25D2133Y9AFYBD',
    status: (i % 3 === 0
      ? 'invalid'
      : i % 5 === 0
        ? 'unchecked'
        : 'valid') as TransactionStatus,
  })
);

export const Route = createFileRoute('/_authenticated/transactions')({
  component: TransactionsPage,
});

function TransactionsPage() {
  const [showModalValidate, setShowModalValidate] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = React.useState(false);

  const validationOptions = [
    { id: 'unchecked', value: 'unchecked', label: 'Unchecked' },
    { id: 'valid', value: 'valid', label: 'Valid' },
    { id: 'invalid', value: 'invalid', label: 'Invalid' },
  ];

  const statusVariants: Record<
    TransactionStatus,
    'success' | 'destructive' | 'warning'
  > = {
    valid: 'success',
    invalid: 'destructive',
    unchecked: 'warning',
  };

  const statusText: Record<TransactionStatus, string> = {
    valid: 'Valid',
    invalid: 'Invalid',
    unchecked: 'Unchecked',
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      id: 'select',
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => <RowSelectCheckbox row={row} />,
    },
    { header: 'No', accessorKey: 'id' },
    { header: 'Nama Lengkap', accessorKey: 'name' },
    { header: 'Nomor Transaksi', accessorKey: 'transactionNumber' },
    {
      header: 'Order Valid?',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge variant={statusVariants[row.original.status]}>
          {statusText[row.original.status]}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: () => (
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowModalValidate(true);
          }}
        >
          <ClipboardCheck className="size-3.5" />
          Update
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: mockTransactions,
    columns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(mockTransactions.length / pagination.pageSize),
    manualPagination: false,
  });

  return (
    <BackofficeWrapper
      title="Validasi Transaksi"
      description="Verifikasi status transaksi pengguna"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari nama atau nomor order…"
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
                  options={validationOptions}
                  title="Status"
                  onClose={() => setShowFilter(false)}
                  onFilterChange={(value) => {
                    console.log('Selected filter:', value);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={mockTransactions} columns={columns} table={table} />
        </CardContent>
      </Card>

      <ModalValidate
        isOpen={showModalValidate}
        onClose={() => setShowModalValidate(false)}
        handleValid={() => {
          console.log('Action ketika user klik Valid');
        }}
        handleInvalid={() => {
          console.log('Action ketika user klik Tidak Valid');
        }}
      />
    </BackofficeWrapper>
  );
}
