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
import ModalValidate from './_components/modal-validate';

type TransactionStatus = 'valid' | 'invalid' | 'unchecked';

interface Transaction {
  id: number;
  name: string;
  transactionNumber: string;
  status: TransactionStatus;
}

// Mock data for transactions
const mockTransactions: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
  transactionNumber: '25D2133Y9AFYBD',
  status: (i % 3 === 0
    ? 'invalid'
    : i % 5 === 0
    ? 'unchecked'
    : 'valid') as TransactionStatus,
}));

export const Components: FC = (): ReactElement => {
  const [showModalValidate, setShowModalValidate] = useState(false);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = useState(false);

  const validationOptions = [
    { id: 'option1', value: 'unchecked', label: 'Unchecked' },
    { id: 'option2', value: 'valid', label: 'Valid' },
    { id: 'option3', value: 'invalid', label: 'Invalid' },
  ];

  const columns: ColumnDef<Transaction>[] = [
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
      header: 'Nomor Transaksi',
      accessorKey: 'transactionNumber',
    },
    {
      header: 'Order Valid?',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<TransactionStatus, string> = {
          valid: 'bg-success-200 text-success-500',
          invalid: 'bg-danger-200 text-danger-500',
          unchecked: 'bg-warning-200 text-warning-900',
        };
        const statusText: Record<TransactionStatus, string> = {
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
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowModalValidate(true);
          }}
          className="flex items-center gap-2 w-full"
        >
          <AuditOutlined className="text-[16px]" /> Update
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: mockTransactions,
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
    pageCount: Math.ceil(mockTransactions.length / pagination.pageSize),
    manualPagination: false,
  });

  return (
    <Fragment>
      <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
        {/* Header */}
        <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
          <h1 className="text-p2 font-semibold">Validasi Transaksi</h1>
        </header>

        {/* Account Table Section */}
        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          {/* Search and Filter */}
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
                    options={validationOptions}
                    onClose={() => setShowFilter(false)}
                    onFilterChange={(value) => {
                      console.log('Selected filter:', value);
                      // Filter logic di sini
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <DataTable data={mockTransactions} columns={columns} table={table} />
        </section>
      </main>
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
    </Fragment>
  );
};

export default Components;
