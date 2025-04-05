import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  Table,
} from '@tanstack/react-table';
import { Pagination } from '../../molecules';

import React from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  table: Table<T>;
  pageSize?: number;
}

export const DataTable = <T,>({
  data,
  columns,
  pageSize = 9,
}: DataTableProps<T>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full text-base">
          <thead className="bg-primary-50 mb-3 text-left text-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-5 font-normal first:rounded-l-lg last:rounded-r-lg"
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-primary-100 odd:bg-white">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className="py-3 px-5 first:rounded-l-lg last:rounded-r-lg"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default DataTable;
