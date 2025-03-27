import { ReactElement, ReactNode } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

interface DataTableProps<T> {
  data: T[];
  headers: {
    accessorKey?: keyof T;
    header: string;
    cell?: (info: any) => ReactNode;
  }[];
  onRowClick?: (item: T) => void;
}

export const DataTable = <T extends Record<string, any>>({
  data,
  headers,
  onRowClick,
}: DataTableProps<T>): ReactElement => {
  const table = useReactTable({
    data,
    columns: headers.map((header) => ({
      accessorKey: header.accessorKey,
      header: header.header,
      cell: header.cell,
    })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full text-base">
        <thead className="bg-primary-50 mb-3">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="mt-3">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick && onRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue() as ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default DataTable;
