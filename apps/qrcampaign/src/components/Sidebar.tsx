import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  QrcodeOutlined,
  LogoutOutlined,
  DownOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC, ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn, For } from '@imphnen-frontend-service/utils';
import { useAuthStore } from '../app/features/auth/store/auth.store';

type MenuItem = {
  label: string;
  href?: string;
  icon?: ReactElement;
  children?: Array<{ label: string; href: string; icon?: ReactElement }>;
  roles?: string[]; // Roles that can see this menu
};

const MENUS: MenuItem[] = [
  {
    label: 'QR Generator',
    href: '/',
    icon: <QrcodeOutlined className="text-[20px]" />,
    roles: ['User', 'Admin', 'Super Admin'],
  },
  {
    label: 'Campaign Management',
    href: '/admin/campaigns',
    icon: <AppstoreOutlined className="text-[20px]" />,
    roles: ['Admin', 'Super Admin'],
  },
  {
    label: 'User Management',
    href: '/admin/users',
    icon: <UsergroupAddOutlined className="text-[20px]" />,
    roles: ['Admin', 'Super Admin'],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  isOpen = false,
  onClose,
}): ReactElement => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const userRole = user?.role?.name || 'User';

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupLabel]: !prev[groupLabel] }));
  };

  // Filter menus based on role
  const filteredMenus = MENUS.filter((menu) => {
    if (!menu.roles) return true;
    return menu.roles.includes(userRole);
  });

  const sidebarContent = (
    <div className="w-[280px] bg-white h-dvh px-7 shadow-xl flex flex-col border-r border-gray-100">
      <div className="shrink-0 py-10 lg:py-[60px]">
        <div className="flex justify-between lg:justify-center items-center w-full">
          <img
            src="/images/imphnen-logo.svg"
            alt="IMPHNEN Logo"
            className="w-[150px]"
          />
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable area */}
      <nav className="flex-1 flex flex-col gap-4 w-full overflow-y-auto min-h-0 pb-4">
        <For data={filteredMenus}>
          {(menu) =>
            menu.children && menu.children.length > 0 ? (
              <div key={menu.label} className="w-full">
                <button
                  type="button"
                  onClick={() => toggleGroup(menu.label)}
                  className={cn(
                    'flex items-center justify-between w-full gap-3 px-2 py-2.5 rounded-md cursor-pointer',
                    openGroups[menu.label]
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {menu.icon}
                    <span className="text-sm font-medium">{menu.label}</span>
                  </div>
                  <span className="text-xs">
                    {openGroups[menu.label] ? (
                      <DownOutlined />
                    ) : (
                      <RightOutlined />
                    )}
                  </span>
                </button>

                {openGroups[menu.label] && (
                  <div className="mt-2 ml-6 flex flex-col gap-2">
                    {menu.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'flex items-center gap-3 px-2 py-2.5 rounded-md',
                          isActive(child.href)
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {child.icon}
                        <span className="text-sm font-medium">
                          {child.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={menu.href ?? menu.label}
                to={menu.href ?? '#'}
                className={cn(
                  'flex items-center justify-start gap-3 px-2 py-2.5 rounded-md transition-colors',
                  menu.href && isActive(menu.href)
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {menu.icon}
                <span className="text-sm font-medium">{menu.label}</span>
              </Link>
            )
          }
        </For>
      </nav>

      {/* Footer - Fixed at bottom */}
      <div className="shrink-0 w-full pb-10 lg:pb-[60px]">
        <hr className="mb-5 border-gray-100" />
        <div className="px-2 mb-4">
          <div className="text-xs text-gray-500 font-medium uppercase mb-2 select-none">
            Signed in as
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs ring-2 ring-white">
              {user?.fullname?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate text-gray-900">
                {user?.fullname}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {user?.role?.name}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="text"
          className="items-center justify-start gap-3 px-2 py-2.5 text-gray-600 hover:text-red-600 dark:hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-50 transition-colors w-full rounded-md"
        >
          <LogoutOutlined className="text-lg" />
          <span className="text-sm font-medium">Log Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto border-r border-gray-200">
        {sidebarContent}
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
