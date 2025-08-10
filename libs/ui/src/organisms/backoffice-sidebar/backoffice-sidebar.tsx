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
import { cn, For, useSession } from '@imphnen-frontend-service/utils';

const MENUS = [
  { label: 'Dashboard & Set Gacha', href: '/dashboard', icon: <AppstoreOutlined className="text-[20px]" /> },
  { label: 'Dashboard - Dimentorin', href: '/dashboard-dimentorin', icon: <AppstoreOutlined className="text-[20px]" /> },
  { label: 'Gacha Roll', href: '/gacha-roll', icon: <ReloadOutlined className="text-[20px]" /> },
  { label: 'Permissions', href: '/permissions', icon: <UserSwitchOutlined className="text-[20px]" /> },
  { label: 'Roles', href: '/roles', icon: <UsergroupAddOutlined className="text-[20px]" /> },
  { label: 'Data Akun', href: '/accounts', icon: <UserOutlined className="text-[20px]" /> },
  { label: 'Validasi Transaksi', href: '/transactions', icon: <AuditOutlined className="text-[20px]" /> },
  { label: 'Data Pengiriman Hadiah', href: '/prizes', icon: <InboxOutlined className="text-[20px]" /> },
]

export const BackofficeSidebar: FC = (): ReactElement => {
  const { signOut } = useSession();
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard-dimentorin') return false
    return location.pathname.includes(path)
  };

  return (
    <aside className="sticky top-0 left-0 w-[280px] bg-white min-h-screen py-[60px] px-[28px] shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-20 justify-between items-center">
        <img src="/logos/simple.svg" alt="IMPHNEN Logo" className="w-[150px]" />

        <nav className="flex flex-col gap-4 w-full">
          <For data={MENUS}>
            {({ label, href, icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center justify-items-start gap-3 px-[8px] py-[10px]",
                  isActive(href) ? "bg-primary-500 text-white rounded-md" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {icon}
                <span className="text-p3 font-medium">{label}</span>
              </Link>
            )}
          </For>
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
