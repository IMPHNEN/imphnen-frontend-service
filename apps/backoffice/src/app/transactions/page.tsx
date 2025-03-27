import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC, ReactElement } from 'react';

export const Components: FC = (): ReactElement => {
  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      {/* Dashboard Header */}
      <header className="bg-white py-4 px-8 rounded-md shadow p-4">
        <h1 className="text-p2 font-semibold">Validasi Transaksi</h1>
      </header>

      {/* Accounts Table Section */}
      <div className="flex justify-between gap-[40px] p-8 bg-white rounded-md"></div>
    </main>
  );
};

export default Components;
