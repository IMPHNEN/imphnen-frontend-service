import * as React from 'react';
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
  Table as TanstackTable,
  RowData,
  TableOptions,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../atoms/table';
import { Button } from '../../atoms/button';
import { Pagination } from '../../molecules/pagination';
import { cn } from '@imphnen-frontend-service/utils';

interface DataTableProps<T extends RowData> {
  table?: TanstackTable<T>;
  data?: T[];
  columns?: ColumnDef<T, unknown>[];
  pageSize?: number;
  className?: string;
  manualPagination?: boolean;
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

function ManualPagination({
  currentPage,
  pageCount,
  onPageChange,
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages: Array<number | 'ellipsis'> = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < pageCount - 2) pages.push('ellipsis');
    pages.push(pageCount);
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-between gap-2 pt-2"
    >
      <div className="text-xs text-muted-foreground">
        Page {currentPage} of {pageCount}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="text"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <span
              key={`e-${idx}`}
              className="px-1 text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(
                'inline-flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                currentPage === p
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-transparent text-foreground hover:bg-primary-50 hover:text-primary-600'
              )}
            >
              {p}
            </button>
          )
        )}
        <Button
          variant="text"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}

export const DataTable = <T extends RowData>({
  table,
  data = [],
  columns = [],
  pageSize = 10,
  className,
  manualPagination = false,
  pageCount,
  currentPage = 1,
  onPageChange,
  emptyMessage = 'Tidak ada data',
}: DataTableProps<T>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize }));
  }, [pageSize]);

  React.useEffect(() => {
    if (data.length > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [data.length]);

  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const tableConfig = React.useMemo(() => {
    const config: TableOptions<T> = {
      data: memoizedData,
      columns: memoizedColumns,
      state: { pagination, sorting },
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination,
      pageCount: manualPagination ? pageCount : undefined,
    };
    return config;
  }, [memoizedData, memoizedColumns, pagination, sorting, manualPagination, pageCount]);

  const internalTable = useReactTable(tableConfig);
  const t = table ?? internalTable;

  const isEmpty = t.getRowModel().rows.length === 0;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="rounded-md border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-neutral-50">
            {t.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={cn(
                        canSort && 'cursor-pointer select-none hover:bg-neutral-100',
                        header?.column?.columnDef?.meta?.headerClassName
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <span className="text-muted-foreground">
                            {sorted === 'asc' ? (
                              <ArrowUp className="size-3" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown className="size-3" />
                            ) : (
                              <ArrowUpDown className="size-3 opacity-50" />
                            )}
                          </span>
                        )}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={t.getAllColumns().length}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              t.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell?.column?.columnDef?.meta?.cellClassName}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {manualPagination && onPageChange && pageCount ? (
        <ManualPagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      ) : (
        <Pagination table={t} />
      )}
    </div>
  );
};

export default DataTable;
