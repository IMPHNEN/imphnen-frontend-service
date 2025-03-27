import { FC, ReactElement, useState } from 'react';
import {
  FilterOutlined,
  SearchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { Pagination } from '@imphnen-frontend-service/ui/molecules';
import { DataTable } from '@imphnen-frontend-service/ui/organisms';

// Define status type for better type safety
type TransactionStatus = 'valid' | 'invalid' | 'unchecked';

// Define transaction interface
interface Transaction {
  id: number;
  name: string;
  transactionNumber: string;
  status: TransactionStatus;
}

// Mock data for transactions
const mockTransactions: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
  transactionNumber: '25D2133Y9AFYBD',
  status: (i % 3 === 0
    ? 'invalid'
    : i % 5 === 0
    ? 'unchecked'
    : 'valid') as TransactionStatus,
}));

export const Components: FC = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter data based on search query
  const filteredData = mockTransactions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleValidate = (id: number) => {
    console.log(`Validate transaction with id: ${id}`);
    // Implement validation functionality
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      {/* Header */}
      <header className="bg-white py-4 px-8 rounded-md shadow p-4">
        <h1 className="text-p2 font-semibold">Validasi Transaksi</h1>
      </header>

      {/* Account Table Section */}
      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        {/* Search and Filter */}
        <div className="flex justify-between items-center gap-8 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan nama lengkap, nomor order Shopee"
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
            size="md"
            className="flex items-center gap-3"
          >
            <FilterOutlined />
            Filters
          </Button>
        </div>

        {/* Table */}
        <DataTable
          data={currentItems}
          headers={[
            {
              label: 'No.',
              render: (_, index) => index + 1 + indexOfFirstItem,
            },
            { label: 'Nama Lengkap', key: 'name' },
            { label: 'Nomor Transaksi', key: 'transactionNumber' },
            {
              label: 'Order Valid?',
              render: (item: Transaction) => {
                const statusColors: Record<TransactionStatus, string> = {
                  valid: 'bg-success-500 text-white',
                  invalid: 'bg-danger-500 text-white',
                  unchecked: 'bg-yellow-400 text-black',
                };
                const statusText: Record<TransactionStatus, string> = {
                  valid: 'Valid',
                  invalid: 'Invalid',
                  unchecked: 'Unchecked',
                };
                return (
                  <div
                    className={`py-1 px-3 rounded-md text-center ${
                      statusColors[item.status]
                    }`}
                  >
                    {statusText[item.status]}
                  </div>
                );
              },
            },
            {
              label: 'Action',
              render: (item: Transaction) => (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValidate(item.id);
                  }}
                  className="flex items-center gap-2"
                >
                  <FileTextOutlined /> Validate
                </Button>
              ),
            },
          ]}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default Components;
