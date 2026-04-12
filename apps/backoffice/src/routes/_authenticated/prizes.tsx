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
import ModalProcessDelivery from './_components/prizes/modal-process-item';
import {
  SelectAllCheckbox,
  RowSelectCheckbox,
} from '../../components/list-helpers';

type OrderValid = 'valid' | 'invalid' | 'unchecked';
type Status = 'undelivered' | 'delivered';

interface Prize {
  id: number;
  name: string;
  orderValid: OrderValid;
  items: string;
  address: string;
  status: Status;
}

const items = [
  'Sertifikat + Laminating',
  'Lanyard + ID Card',
  'Pin',
  'Sticker Isi 3',
  'Sticker Isi 5',
  'Gelang Karet',
];

const mockData: Prize[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: 'Nama Lengkap',
  orderValid: (i % 3 === 0
    ? 'invalid'
    : i % 5 === 0
      ? 'unchecked'
      : 'valid') as OrderValid,
  items: items[i % items.length],
  address: 'Jl. Pantai Cibaduyut Indah',
  status: (i % 3 === 0 ? 'undelivered' : 'delivered') as Status,
}));

export const Route = createFileRoute('/_authenticated/prizes')({
  component: PrizesPage,
});

function PrizesPage() {
  const [showModalProcessDelivery, setShowModalProcessDelivery] =
    React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = React.useState(false);

  const deliveryOptions = [
    { id: 'undelivered', value: 'undelivered', label: 'Undelivered' },
    { id: 'delivered', value: 'delivered', label: 'Delivered' },
  ];

  const orderValidVariants: Record<
    OrderValid,
    'success' | 'destructive' | 'warning'
  > = {
    valid: 'success',
    invalid: 'destructive',
    unchecked: 'warning',
  };

  const orderValidText: Record<OrderValid, string> = {
    valid: 'Valid',
    invalid: 'Invalid',
    unchecked: 'Unchecked',
  };

  const statusVariants: Record<Status, 'success' | 'destructive'> = {
    delivered: 'success',
    undelivered: 'destructive',
  };

  const statusText: Record<Status, string> = {
    delivered: 'Delivered',
    undelivered: 'Undelivered',
  };

  const columns: ColumnDef<Prize>[] = [
    {
      id: 'select',
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => <RowSelectCheckbox row={row} />,
    },
    { header: 'No', accessorKey: 'id' },
    { header: 'Nama Lengkap', accessorKey: 'name' },
    {
      header: 'Order Valid?',
      accessorKey: 'orderValid',
      cell: ({ row }) => (
        <Badge variant={orderValidVariants[row.original.orderValid]}>
          {orderValidText[row.original.orderValid]}
        </Badge>
      ),
    },
    { header: 'Items', accessorKey: 'items' },
    { header: 'Alamat Pengiriman', accessorKey: 'address' },
    {
      header: 'Status',
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
            setShowModalProcessDelivery(true);
          }}
        >
          <ClipboardCheck className="size-3.5" />
          Process
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: mockData,
    columns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(mockData.length / pagination.pageSize),
    manualPagination: false,
  });

  return (
    <BackofficeWrapper
      title="Data Pengiriman Hadiah"
      description="Proses pengiriman hadiah ke pemenang"
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
                  options={deliveryOptions}
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
          <DataTable data={mockData} columns={columns} table={table} />
        </CardContent>
      </Card>

      <ModalProcessDelivery
        isOpen={showModalProcessDelivery}
        onClose={() => setShowModalProcessDelivery(false)}
        handleProcessDelivery={() => {
          console.log('Action proses pengiriman');
        }}
      />
    </BackofficeWrapper>
  );
}
