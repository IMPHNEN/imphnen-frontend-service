import { FC, ReactElement, useState } from 'react';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from '@imphnen-frontend-service/ui/atoms';
import { DataTable, Pagination } from './components';

// Mock data for demonstration
const mockData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Nama Lengkap',
  email: 'Fullname23@gmail.com',
  phone: '081904423804',
  address: 'Jl. Pantai Cibaduyut Indonesia',
}));

export const Components: FC = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter data based on search query
  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`);
    // Implement edit functionality
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
      {/* Dashboard Header */}
      <header className="bg-white py-4 px-8 rounded-md shadow p-4">
        <h1 className="text-p2 font-semibold">Data Akun</h1>
      </header>

      {/* Account Table Section */}
      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        {/* Search and Filter */}
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-[400px]">
            <Input
              placeholder="Cari berdasarkan nama lengkap, email"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchOutlined />
            </div>
          </div>

          <Button variant="secondary" className="flex items-center gap-2">
            <FilterOutlined />
            Filters
          </Button>
        </div>

        {/* Table */}
        <DataTable data={currentItems} onEdit={handleEdit} />

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
