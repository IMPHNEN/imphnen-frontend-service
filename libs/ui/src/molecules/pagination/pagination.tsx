import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../atoms/button';
import { cn } from '@imphnen-frontend-service/utils';

interface PaginationProps<T> {
  table: Table<T>;
}

function PageButton({
  active,
  onClick,
  children,
  disabled,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-primary-500 text-white hover:bg-primary-600'
          : 'bg-transparent text-foreground hover:bg-primary-50 hover:text-primary-600'
      )}
    >
      {children}
    </button>
  );
}

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  if (pageCount <= 1) return null;

  const pages: Array<number | 'ellipsis'> = [];
  if (pageCount <= 7) {
    for (let i = 0; i < pageCount; i++) pages.push(i);
  } else {
    pages.push(0);
    if (pageIndex > 3) pages.push('ellipsis');
    const start = Math.max(1, pageIndex - 1);
    const end = Math.min(pageCount - 2, pageIndex + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (pageIndex < pageCount - 4) pages.push('ellipsis');
    pages.push(pageCount - 1);
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-between gap-2 pt-2"
    >
      <div className="text-xs text-muted-foreground">
        Page {pageIndex + 1} of {pageCount}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="text"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
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
            <PageButton
              key={p}
              active={pageIndex === p}
              onClick={() => table.setPageIndex(p)}
            >
              {p + 1}
            </PageButton>
          )
        )}
        <Button
          variant="text"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
};
