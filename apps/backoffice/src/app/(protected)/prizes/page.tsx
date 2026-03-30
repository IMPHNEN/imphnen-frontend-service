import * as React from 'react';

import { FC, Fragment, ReactElement, useState } from 'react';
import {
  FilterOutlined,
  SearchOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { DataTable, Filter } from '@imphnen-frontend-service/ui/organisms';

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table';
import ModalProcessDelivery from './_components/modal-process-item';

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

export const Components: FC = (): ReactElement => {
  const [showModalProcessDelivery, setShowModalProcessDelivery] =
    useState(false);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = useState(false);

  const deliveryOptions = [
    { id: 'option1', value: 'undelivered', label: 'Undelivered' },
    { id: 'option1', value: 'delivered', label: 'Delivered' },
  ];

  const columns: ColumnDef<Prize>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      header: 'No',
      accessorKey: 'id',
    },
    {
      header: 'Nama Lengkap',
      accessorKey: 'name',
    },
    {
      header: 'Order Valid?',
      accessorKey: 'orderValid',
      cell: ({ row }) => {
        const status = row.original.orderValid;
        const statusColors: Record<OrderValid, string> = {
          valid: 'bg-success-200 text-success-500',
          invalid: 'bg-danger-200 text-danger-500',
          unchecked: 'bg-warning-200 text-warning-900',
        };
        const statusText: Record<OrderValid, string> = {
          valid: 'Valid',
          invalid: 'Invalid',
          unchecked: 'Unchecked',
        };
        return (
          <div
            className={`py-2 px-4 rounded-md text-center ${statusColors[status]}`}
          >
            {statusText[status]}
          </div>
        );
      },
    },
    {
      header: 'Items',
      accessorKey: 'items',
    },
    {
      header: 'Alamat Pengiriman',
      accessorKey: 'address',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<Status, string> = {
          delivered: 'bg-success-200 text-success-500',
          undelivered: 'bg-danger-200 text-danger-500',
        };
        const statusText: Record<Status, string> = {
          delivered: 'Delivered',
          undelivered: 'Undelivered',
        };
        return (
          <div
            className={`py-2 px-4 rounded-md text-center ${statusColors[status]}`}
          >
            {statusText[status]}
          </div>
        );
      },
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowModalProcessDelivery(true);
          }}
          className="flex items-center gap-2 w-full"
        >
          <AuditOutlined className="text-[16px]" /> Process
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
    <Fragment>
      <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
        <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
          <h1 className="text-p2 font-semibold">Data Pengiriman Hadiah</h1>
        </header>
        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama lengkap, nomor order Shopee"
                className="pl-12 w-full max-h-full"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
                <SearchOutlined />
              </div>
            </div>
            <div className="relative">
              <Button
                variant="primary"
                size="md"
                className="flex items-center gap-3"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterOutlined />
                Filters
              </Button>
              {showFilter && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-10 shadow-lg">
                  <Filter
                    options={deliveryOptions}
                    onClose={() => setShowFilter(false)}
                    onFilterChange={(value) => {
                      console.log('Selected filter:', value);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <DataTable data={mockData} columns={columns} table={table} />
        </section>
      </main>

      <ModalProcessDelivery
        isOpen={showModalProcessDelivery}
        onClose={() => setShowModalProcessDelivery(false)}
        handleProcessDelivery={() => {
          console.log('Action ketika user menekan tombol Proses Pengiriman');
        }}
      />
    </Fragment>
  );
};

export default Components;
