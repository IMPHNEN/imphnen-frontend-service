import * as React from 'react';

import { FC, ReactElement } from 'react';
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { DataTable } from '@imphnen-frontend-service/ui/organisms';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

// Define account interface
interface Account {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Mock data for demonstration
const mockData: Account[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
  email: 'fullname23@gmail.com',
  phone: '081904423804',
  address: 'Jl. Pantai Cibaduyut Indonesia',
}));

const columns: ColumnDef<any>[] = [
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
    cell: ({ row }) => {
      return (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // handleEdit(row.id);
          }}
          className="flex items-center gap-2"
        >
          <EditOutlined /> Edit
        </Button>
      );
    },
  },
];

export const Components: FC = (): ReactElement => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      {/* Header */}
      <header className="bg-white py-4 px-8 rounded-md shadow p-4">
        <h1 className="text-p2 font-semibold">Data Akun</h1>
      </header>

      {/* Account Table Section */}
      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        {/* Search and Filter */}
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

          <Button
            variant="primary"
            disabled
            size="md"
            className="flex items-center gap-3"
          >
            <FilterOutlined />
            Filters
          </Button>
        </div>

        {/* Table */}
        <DataTable data={mockData} columns={columns} />

        {/* Pagination */}
        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        /> */}
        <div className="flex items-center justify-center gap-[40px]">
          <button
            className="disabled:opacity-50 cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ArrowLeftOutlined className="text-[16px] text-neutral-800" />
          </button>

          <div className="flex gap-4 items-baseline">
            {table.getPageCount() <= 8 ? (
              Array.from({ length: table.getPageCount() }, (_, index) => (
                <button
                  className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer  ${
                    table.getState().pagination.pageIndex === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              // Render ellipsis jika total halaman lebih dari 8
              <>
                <button
                  onClick={() => table.setPageIndex(0)}
                  className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer ${
                    table.getState().pagination.pageIndex === 0
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                >
                  1
                </button>
                {table.getState().pagination.pageIndex > 3 && <span>...</span>}
                {Array.from(
                  { length: 5 },
                  (_, index) =>
                    table.getState().pagination.pageIndex - 2 + index
                )
                  .filter((page) => page > 0 && page < table.getPageCount() - 1)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => table.setPageIndex(page)}
                      className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer ${
                        table.getState().pagination.pageIndex === page
                          ? 'bg-primary-500 text-white'
                          : 'bg-primary-100 hover:bg-primary-200'
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 4 && <span>...</span>}
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer ${
                    table.getState().pagination.pageIndex ===
                    table.getPageCount() - 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                >
                  {table.getPageCount()}
                </button>
              </>
            )}
          </div>

          <button
            className="disabled:opacity-50 cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ArrowRightOutlined className="text-[16px] text-neutral-800" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Components;
