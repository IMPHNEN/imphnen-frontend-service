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
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import ModalAddPermission from './_components/modal-add-permission';
import ModalUpdatePermission from './_components/modal-update-permission';
import ModalDeletePermission from './_components/modal-delete-permission';
import { useQueryState } from '@imphnen-frontend-service/utils';
import React from 'react';

interface Permission {
  id: number;
  name: string;
}

const mockData: Permission[] = [
  { id: 1, name: 'Read' },
  { id: 2, name: 'Create' },
  { id: 3, name: 'Update' },
  { id: 4, name: 'Delete' },
];

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

  const columns: ColumnDef<Permission>[] = [
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
      header: 'Name',
      accessorKey: 'name',
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
          <h1 className="text-p2 font-semibold">Permissions</h1>
        </header>

        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama permissions"
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
                Tambah Permissionss
              </Button>
            </div>
          </div>

          <DataTable
            data={mockData}
            columns={columns}
            pageSize={9}
            table={table}
          />
        </section>
      </main>

      <ModalAddPermission
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
      <ModalUpdatePermission
        isOpen={showModalUpdateItem}
        onClose={() => setShowModalUpdateItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
      <ModalDeletePermission
        isOpen={showModalDeleteItem}
        onClose={() => setShowModalDeleteItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
      />
    </Fragment>
  );
};

export default Components;
