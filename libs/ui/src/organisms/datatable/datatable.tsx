import { FC, ReactElement, ReactNode } from 'react';

interface DataTableProps<T> {
  data: T[];
  headers: {
    label: string;
    key?: keyof T;
    render?: (item: T, index: number) => ReactNode;
    className?: string;
  }[];
  showCheckbox?: boolean;
  onRowClick?: (item: T) => void;
}

export const DataTable = <T extends Record<string, any>>({
  data,
  headers,
  showCheckbox = true,
  onRowClick,
}: DataTableProps<T>): ReactElement => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full text-base">
        <thead className="bg-primary-50 mb-3">
          <tr>
            {showCheckbox && (
              <th className="py-3 px-5 text-left font-normal rounded-l-lg">
                <input type="checkbox" className="rounded" />
              </th>
            )}
            {headers.map((header, index) => {
              const isFirst = index === 0 && !showCheckbox;
              const isLast = index === headers.length - 1;
              return (
                <th
                  key={index}
                  className={`py-3 px-5 text-left font-normal ${
                    isFirst ? 'rounded-l-lg' : ''
                  } ${isLast ? 'rounded-r-lg' : ''} ${header.className || ''}`}
                >
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="mt-3">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-primary-100'}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {showCheckbox && (
                <td className="py-3 px-5 rounded-l-lg">
                  <input type="checkbox" className="rounded" />
                </td>
              )}
              {headers.map((header, colIndex) => {
                const isFirst = colIndex === 0 && !showCheckbox;
                const isLast = colIndex === headers.length - 1;

                return (
                  <td
                    key={colIndex}
                    className={`py-3 px-5 ${isFirst ? 'rounded-l-lg' : ''} ${
                      isLast ? 'rounded-r-lg' : ''
                    }`}
                  >
                    {header.render
                      ? header.render(item, rowIndex)
                      : header.key
                      ? item[header.key]
                      : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
