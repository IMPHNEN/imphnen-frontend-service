import * as React from 'react';

import { FC, Fragment, ReactElement, useState } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { DataTable } from '@imphnen-frontend-service/ui/organisms';

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table';
import ModalAddItem from './_components/modal-add-item';
import ModalUpdateItem from './_components/modal-update-item';
import ModalDeleteItem from './_components/modal-delete-item';
import { useQueryState } from '@imphnen-frontend-service/utils';

interface GachaItem {
  id: number;
  name: string;
  chanceRate: number;
  quantity: number;
}

const mockData: GachaItem[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: 'Hoodie IMPHNEN Official 2025',
  chanceRate: 0.1,
  quantity: 10,
}));

export const Components: FC = (): ReactElement => {
  const [showModalAddItem, setShowModalAddItem] = useState(false);
  const [showModalUpdateItem, setShowModalUpdateItem] = useState(false);
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false);

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

  const columns: ColumnDef<GachaItem>[] = [
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
      header: 'Nama Item',
      accessorKey: 'name',
    },
    {
      header: 'Chance Rate',
      accessorKey: 'chanceRate',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Action',
      cell: () => (
        <div className="flex gap-[8px]">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowModalUpdateItem(true);
            }}
            className="flex items-center gap-2"
          >
            <EditOutlined /> Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowModalDeleteItem(true);
            }}
            className="flex items-center gap-2"
          >
            <DeleteOutlined /> Delete
          </Button>
        </div>
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
          <h1 className="text-p2 font-semibold">Gacha Roll</h1>
        </header>

        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama item"
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
                className="flex gap-3 text-nowrap"
                onClick={() => {
                  setShowModalAddItem(true);
                }}
              >
                <PlusOutlined />
                Tambah Item
              </Button>
            </div>
          </div>

          <DataTable data={mockData} columns={columns} table={table} />
        </section>
      </main>

      <ModalAddItem
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        handleAddItem={() => {
          console.log('Item added');
        }}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
      <ModalUpdateItem
        currentStep={currentStep}
        isOpen={showModalUpdateItem}
        onClose={() => setShowModalUpdateItem(false)}
        handleUpdateItem={() => {
          console.log('Item updated');
        }}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
      <ModalDeleteItem
        isOpen={showModalDeleteItem}
        onClose={() => setShowModalDeleteItem(false)}
        handleDeleteItem={() => {
          console.log('Item deleted');
        }}
      />
    </Fragment>
  );
};

export default Components;
