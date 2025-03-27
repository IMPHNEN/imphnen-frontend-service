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
  data,
  onEdit,
}): ReactElement => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full text-base">
        <thead className="bg-primary-50 mb-3">
          <tr>
            <th className="py-3 px-5 text-left font-normal rounded-l-lg">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="py-3 px-5 text-left font-normal">No.</th>
            <th className="py-3 px-5 text-left font-normal">Nama Lengkap</th>
            <th className="py-3 px-5 text-left font-normal">Email</th>
            <th className="py-3 px-5 text-left font-normal">Nomor Telp</th>
            <th className="py-3 px-5 text-left font-normal">
              Alamat Pengiriman
            </th>
            <th className="py-3 px-5 text-left font-normal rounded-r-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="mt-3">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-primary-100'}
            >
              <td className="py-3 px-5 rounded-l-lg">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="py-3 px-5">{index + 1}</td>
              <td className="py-3 px-5">{item.name}</td>
              <td className="py-3 px-5 truncate">{item.email}</td>
              <td className="py-3 px-5">{item.phone}</td>
              <td className="py-3 px-5 truncate">{item.address}</td>
              <td className="py-3 px-5 rounded-r-lg">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(item.id)}
                  className="flex items-center gap-2"
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

export default DataTable;
