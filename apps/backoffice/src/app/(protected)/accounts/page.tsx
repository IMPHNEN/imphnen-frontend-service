import * as React from 'react';

import { FC, Fragment, ReactElement, useState } from 'react';
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
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
import ModalEditAccount from './_components/modal-edit-account';
import { useQueryState } from '@imphnen-frontend-service/utils';

interface Account {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const mockData: Account[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
  email: 'fullname23@gmail.com',
  phone: '081904423804',
  address: 'Jl. Pantai Cibaduyut Indah',
}));

export const Components: FC = (): ReactElement => {
  const [showModalEditAccount, setShowModalEditAccount] = useState(false);

  const {
    step: currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useQueryState('step', {
    defaultValue: 1,
    maxValue: 2,
    minValue: 1,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [showFilter, setShowFilter] = useState(false);

  const columns: ColumnDef<Account>[] = [
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
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Nomor Telp',
      accessorKey: 'phone',
    },
    {
      header: 'Alamat Pengiriman',
      accessorKey: 'address',
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowModalEditAccount(true);
          }}
          className="flex items-center gap-2"
        >
          <EditOutlined /> Edit
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
          <h1 className="text-p2 font-semibold">Data Akun</h1>
        </header>
        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama lengkap, email"
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
                disabled
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterOutlined />
                Filters
              </Button>
              {showFilter && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-10 shadow-lg">
                  <Filter onClose={() => setShowFilter(false)} options={[]} />
                </div>
              )}
            </div>
          </div>
          <DataTable data={mockData} columns={columns} table={table} />
        </section>
      </main>

      <ModalEditAccount
        currentStep={currentStep}
        isOpen={showModalEditAccount}
        onClose={() => setShowModalEditAccount(false)}
        handleEditAccount={() => {
          console.log('Account updated');
        }}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
    </Fragment>
  );
};

export default Components;
