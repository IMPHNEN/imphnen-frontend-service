import * as React from 'react';

import { FC, ReactElement, useState } from 'react';
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { Pagination } from '@imphnen-frontend-service/ui/molecules';
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

// const columnHelper = createColumnHelper<Account>();
// const columns = [
//   columnHelper.accessor('id', {
//     cell: (info) => info.column.id,
//   }),
//   columnHelper.accessor('name', {
//     header: 'Nama Lengkap',
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('name', {
//     header: 'Nama Lengkap',
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('name', {
//     header: 'Nama Lengkap',
//     cell: (info) => info.getValue(),
//   }),
// ];

export const Components: FC = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEdit = (id: number) => {
  //   console.log(`Edit item with id: ${id}`);
  //   // Implement edit functionality
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // setCurrentPage(1); // Reset to first page when searching
  };

  // const [data, _setData] = React.useState(() => [...mockData]);
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
              value={searchQuery}
              onChange={handleSearch}
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
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full text-base">
            <thead className="bg-primary-50 mb-3 text-left">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-5 font-normal first:rounded-l-lg last:rounded-r-lg"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="mt-3">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-primary-100 odd:bg-white">
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={index}
                      className="py-3 px-5 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <DataTable
          data={currentItems}
          headers={[
            {
              label: 'No.',
              render: (_, index) => index + 1 + indexOfFirstItem,
            },
            { label: 'Nama Lengkap', key: 'name' },
            { label: 'Email', key: 'email' },
            { label: 'Nomor Telp', key: 'phone' },
            { label: 'Alamat Pengiriman', key: 'address' },
            {
              label: 'Action',
              render: (item: Account) => (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item.id);
                  }}
                  className="flex items-center gap-2"
                >
                  <EditOutlined /> Edit
                </Button>
              ),
            },
          ]}
        /> */}

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

          <button
            className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer bg-primary-500 text-white`}
          >
            {table.getState().pagination.pageIndex + 1}
          </button>
          {/* {table.getPageCount().map((page, index) => (
            <button
              key={index}
              className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer bg-primary-500 text-white ${
                table.getState().pagination.pageIndex === page
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-100 hover:bg-primary-200'
              }`}
            >
              {table.getState().pagination.pageIndex + 1}
            </button>
          ))} */}
          {/* <div className="flex gap-4 items-baseline">
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-1">
                  {page}
                </span>
              )
            )}
          </div> */}

          <button
            className="disabled:opacity-50 cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ArrowRightOutlined className="text-[16px] text-neutral-800" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* <button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button> */}
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </section>
    </main>
  );
};

export default Components;
