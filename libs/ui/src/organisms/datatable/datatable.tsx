import {
  PaginationState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  Table,
  RowData,
  TableOptions,
} from '@tanstack/react-table';
import { Pagination } from '../../molecules';

import React from 'react';
import { cn } from '@imphnen-frontend-service/utils';

interface DataTableProps<T extends RowData> {
  table?: Table<T>;
  data?: T[];
  columns?: ColumnDef<T, unknown>[];
  pageSize?: number;
  className?: string;
}

export const DataTable = <T extends RowData>({
  table,
  data = [],
  columns = [],
  pageSize = 9,
  className,
}: DataTableProps<T>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Update pagination state when pageSize prop changes
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
    }));
  }, [pageSize]);

  // Reset pagination when data changes to prevent out-of-bounds errors
  React.useEffect(() => {
    if (data.length > 0) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0, // Reset to first page when data changes
      }));
    }
  }, [data.length]);

  // Memoize data and columns to prevent unnecessary re-renders
  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  // Memoize table configuration to prevent recreation on every render
  const tableConfig = React.useMemo(() => {
    const config: TableOptions<T> = {
      data: memoizedData,
      columns: memoizedColumns,
      state: {
        pagination,
        sorting,
      },
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    };

    return config;
  }, [memoizedData, memoizedColumns, pagination, sorting]);

  // Prefer external table instance if provided; otherwise create an internal one
  const internalTable = useReactTable(tableConfig);
  const t = table ?? internalTable;

  // Handle empty data state
  const isEmpty = t.getRowModel().rows.length === 0;

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full text-base">
          <thead className="bg-primary-50 mb-3 text-left text-nowrap">
            {t.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={cn(
                      'py-4 px-5 font-normal first:rounded-l-lg last:rounded-r-lg',
                      header.column.getCanSort() &&
                        'cursor-pointer select-none hover:bg-primary-100 transition-colors',
                      header?.column?.columnDef?.meta?.headerClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <span className="ml-2 text-xs text-gray-500">
                        {header.column.getIsSorted() === 'asc' && '▲'}
                        {header.column.getIsSorted() === 'desc' && '▼'}
                        {!header.column.getIsSorted() && (
                          <span className="opacity-50">⇅</span>
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={t.getAllColumns().length}
                  className="py-8 px-5 text-center text-neutral-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              t.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-primary-50 transition-colors',
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-primary-100'
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'py-3 px-5 first:rounded-l-lg last:rounded-r-lg',
                        cell?.column?.columnDef?.meta?.cellClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination table={t} />
    </div>
  );
};

export default DataTable;
