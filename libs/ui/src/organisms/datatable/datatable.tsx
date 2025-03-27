import { FC, ReactElement } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from '../../atoms'; // Use relative import for Button

interface DataTableProps {
  data: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  }>;
  onEdit: (id: number) => void;
}

export const DataTable: FC<DataTableProps> = ({
  // Exporting DataTableProps for use in stories

  data,
  onEdit,
}): ReactElement => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-4 text-left">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="p-4 text-left">No.</th>
            <th className="p-4 text-left">Nama Lengkap</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Nomor Telp</th>
            <th className="p-4 text-left">Alamat Pengiriman</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="p-4">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.email}</td>
              <td className="p-4">{item.phone}</td>
              <td className="p-4">{item.address}</td>
              <td className="p-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(item.id)}
                  className="flex items-center gap-1"
                >
                  <EditOutlined /> Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; // Default export of DataTable component
