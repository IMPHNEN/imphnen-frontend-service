import { FC, ReactElement } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}): ReactElement => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    // const maxPagesToShow = 5;

    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push('...');
      }
    }

    // Calculate range of pages to show around current page
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-[40px]">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 cursor-pointer"
        aria-label="Previous page"
      >
        <ArrowLeftOutlined className="text-[16px] text-neutral-800" />
      </button>

      <div className="flex gap-4 items-baseline">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`size-[30px] py-[8px] flex items-center justify-center rounded-md cursor-pointer ${
                currentPage === page
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-200 hover:bg-gray-50'
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
      </div>

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 cursor-pointer"
        aria-label="Next page"
      >
        <ArrowRightOutlined className="text-[16px] text-neutral-800" />
      </button>
    </div>
  );
};

export default Pagination;
