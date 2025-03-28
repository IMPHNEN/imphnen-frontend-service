import { Table } from '@tanstack/react-table';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface PaginationProps<T> {
  table: Table<T>;
}

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  return (
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
              key={index}
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
              (_, index) => table.getState().pagination.pageIndex - 2 + index
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
  );
};
