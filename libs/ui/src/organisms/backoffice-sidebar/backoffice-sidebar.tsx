import {
  AppstoreOutlined,
  AuditOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button } from '../../atoms';
import { FC, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BackofficeSidebar: FC = (): ReactElement => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <aside className="w-[280px] bg-white min-h-screen py-[60px] px-[28px] shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-20 justify-between items-center">
        {/* Logo */}
        <img src="/logos/simple.svg" alt="IMPHNEN Logo" className="w-[150px]" />

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-4 w-full">
          <Link
            to="/dashboard"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/dashboard')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <AppstoreOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Dashboard & Set Gacha</span>
          </Link>

          <Link
            to="/accounts"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/accounts')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Data Akun</span>
          </Link>

          <Link
            to="/transactions"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/transactions')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <AuditOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Validasi Transaksi</span>
          </Link>
        </nav>
      </div>

      {/* Log Out Button */}
      <div className="w-full">
        <hr className="mb-5 border-primary-200" />
        <Button
          variant="text"
          className="items-start justify-start gap-3 px-[8px] py-[10px] text-gray-700 hover:text-red-500 transition-colors w-full"
        >
          <LogoutOutlined className="text-[20px]" />
          <span className="text-p3 font-medium">Log Out</span>
        </Button>
      </div>
    </aside>
  );
};
