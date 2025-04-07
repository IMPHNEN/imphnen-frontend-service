import {
  AppstoreOutlined,
  AuditOutlined,
  InboxOutlined,
  LogoutOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button } from '../../atoms';
import { FC, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '@imphnen-frontend-service/utils';

export const BackofficeSidebar: FC = (): ReactElement => {
  const { signOut } = useSession();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <aside className="sticky top-0 left-0 w-[280px] bg-white min-h-screen py-[60px] px-[28px] shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-20 justify-between items-center">
        <img src="/logos/simple.svg" alt="IMPHNEN Logo" className="w-[150px]" />

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
            to="/gacha-roll"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/gacha-roll')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ReloadOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Gacha Roll</span>
          </Link>

          <Link
            to="/permissions"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/permissions')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserSwitchOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Permissions</span>
          </Link>

          <Link
            to="/roles"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/roles')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UsergroupAddOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Roles</span>
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

          <Link
            to="/prizes"
            className={`flex items-center justify-items-start gap-3 px-[8px] py-[10px] ${
              isActive('/prizes')
                ? 'bg-primary-500 text-white rounded-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <InboxOutlined className="text-[20px]" />
            <span className="text-p3 font-medium">Data Pengiriman Hadiah</span>
          </Link>
        </nav>
      </div>

      <div className="w-full">
        <hr className="mb-5 border-primary-200" />
        <Button
          onClick={signOut}
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
