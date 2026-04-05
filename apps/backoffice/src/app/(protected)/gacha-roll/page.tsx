import * as React from 'react';

import { FC, Fragment, ReactElement, useRef, useState } from 'react';
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
import {
  useGachaItemList,
  useCreateGachaItem,
  useUpdateGachaItem,
  useDeleteGachaItem,
  TGachaItemDto,
} from '@imphnen-frontend-service/service';

export const Components: FC = (): ReactElement => {
  const [showModalAddItem, setShowModalAddItem] = useState(false);
  const [showModalUpdateItem, setShowModalUpdateItem] = useState(false);
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TGachaItemDto | null>(null);
  const [search, setSearch] = useState('');
  const pendingFormData = useRef<any>(null);

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

  const { data: itemsData, isLoading } = useGachaItemList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const createItem = useCreateGachaItem();
  const updateItem = useUpdateGachaItem();
  const deleteItem = useDeleteGachaItem();

  const items: TGachaItemDto[] = itemsData?.data ?? [];
  const totalItems = itemsData?.meta?.total ?? items.length;

  const handleAdd = async (): Promise<boolean> => {
    if (pendingFormData.current) {
      const { itemName, quantity, chanceRate } = pendingFormData.current;
      await createItem.mutateAsync({
        item_code: (itemName as string).toLowerCase().replace(/\s+/g, '-'),
        name: itemName,
        description: '',
        rarity: 'common',
        type_: 'physical',
        category: 'merchandise',
        value: 0,
        weight: chanceRate ?? 1,
        stock: quantity ?? 1,
        is_limited: false,
      });
    }
    return true;
  };

  const handleUpdate = async (): Promise<boolean> => {
    if (selectedItem && pendingFormData.current) {
      const { itemName, quantity, chanceRate } = pendingFormData.current;
      await updateItem.mutateAsync({
        id: selectedItem.id,
        data: {
          name: itemName,
          weight: chanceRate,
          stock: quantity,
        },
      });
    }
    return true;
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await deleteItem.mutateAsync(selectedItem.id);
    }
    setShowModalDeleteItem(false);
  };

  const columns: ColumnDef<TGachaItemDto>[] = [
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
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-[8px]">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(row.original);
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
              setSelectedItem(row.original);
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
    data: items,
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
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    manualPagination: true,
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                onClick={() => setShowModalAddItem(true)}
              >
                <PlusOutlined />
                Tambah Item
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading...</div>
          ) : (
            <DataTable data={items} columns={columns} table={table} />
          )}
        </section>
      </main>

      <ModalAddItem
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleAddItem={handleAdd}
        onDataCapture={(data) => { pendingFormData.current = data; }}
      />
      <ModalUpdateItem
        currentStep={currentStep}
        isOpen={showModalUpdateItem}
        onClose={() => setShowModalUpdateItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleUpdateItem={handleUpdate}
        initialValues={selectedItem ? { itemName: selectedItem.name } : undefined}
        onDataCapture={(data) => { pendingFormData.current = data; }}
      />
      <ModalDeleteItem
        isOpen={showModalDeleteItem}
        onClose={() => setShowModalDeleteItem(false)}
        handleDeleteItem={handleDelete}
      />
    </Fragment>
  );
};

export default Components;
