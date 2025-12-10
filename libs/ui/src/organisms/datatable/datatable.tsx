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
  // server-side pagination props
  manualPagination?: boolean;
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const DataTable = <T extends RowData>({
  table,
  data = [],
  columns = [],
  pageSize = 9,
  className,
  manualPagination = false,
  pageCount,
  currentPage = 1,
  onPageChange,
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
      // server-side pagination config
      manualPagination,
      pageCount: manualPagination ? pageCount : undefined,
    };

    return config;
  }, [
    memoizedData,
    memoizedColumns,
    pagination,
    sorting,
    manualPagination,
    pageCount,
  ]);

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
                        {!header.column.getIsSorted() && <span>⇅</span>}
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
      {manualPagination && onPageChange && pageCount ? (
        // Server-side pagination controls with numbered pages
        <div className="flex items-center justify-center gap-10">
          <button
            className="disabled:opacity-50 cursor-pointer"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg
              className="w-4 h-4 text-neutral-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-4 items-baseline">
            {pageCount <= 8 ? (
              // Show all pages if 8 or fewer
              Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  className={`size-[30px] py-2 flex items-center justify-center rounded-md cursor-pointer ${
                    currentPage === index + 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              // Show ellipsis for many pages
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className={`size-[30px] py-2 flex items-center justify-center rounded-md cursor-pointer ${
                    currentPage === 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                >
                  1
                </button>
                {currentPage > 3 && <span>...</span>}
                {Array.from(
                  { length: 5 },
                  (_, index) => currentPage - 2 + index
                )
                  .filter((page) => page > 1 && page < pageCount)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={`size-[30px] py-2 flex items-center justify-center rounded-md cursor-pointer ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'bg-primary-100 hover:bg-primary-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                {currentPage < pageCount - 2 && <span>...</span>}
                <button
                  onClick={() => onPageChange(pageCount)}
                  className={`size-[30px] py-2 flex items-center justify-center rounded-md cursor-pointer ${
                    currentPage === pageCount
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                >
                  {pageCount}
                </button>
              </>
            )}
          </div>

          <button
            className="disabled:opacity-50 cursor-pointer"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
            aria-label="Next page"
          >
            <svg
              className="w-4 h-4 text-neutral-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      ) : (
        // Client-side pagination (default)
        <Pagination table={t} />
      )}
    </div>
  );
};

export default DataTable;
