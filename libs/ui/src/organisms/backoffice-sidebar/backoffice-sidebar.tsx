import {
  AppstoreOutlined,
  AuditOutlined,
  BookOutlined,
  CalendarOutlined,
  CommentOutlined,
  DownOutlined,
  InboxOutlined,
  LogoutOutlined,
  MessageOutlined,
  ReadOutlined,
  ReloadOutlined,
  RightOutlined,
  ScheduleOutlined,
  SettingOutlined,
  StockOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button } from '../../atoms';
import { FC, ReactElement, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { cn, For } from '@imphnen-frontend-service/utils';
import { useSession } from '@imphnen-frontend-service/service';

type MenuItem = {
  label: string;
  href?: string;
  icon?: ReactElement;
  children?: Array<{ label: string; href: string; icon?: ReactElement }>;
};

const MENUS: MenuItem[] = [
  {
    label: 'Hackathon',
    icon: <StockOutlined className="text-p3" />,
    children: [
      {
        label: 'Dashboard',
        href: '/hackathon-dashboard',
        icon: <AppstoreOutlined className="text-p3" />,
      },
      {
        label: 'Users',
        href: '/hackathon-users',
        icon: <UserOutlined className="text-p3" />,
      },
      {
        label: 'Teams',
        href: '/hackathon-teams',
        icon: <UsergroupAddOutlined className="text-p3" />,
      },
      {
        label: 'Submissions',
        href: '/hackathon-submissions',
        icon: <AuditOutlined className="text-p3" />,
      },
    ],
  },
  {
    label: 'Dimentorin',
    icon: <ReadOutlined className="text-p3" />,
    children: [
      {
        label: 'Dashboard - Dimentorin',
        href: '/dashboard-dimentorin',
        icon: <AppstoreOutlined className="text-[20px]" />,
      },
      {
        label: 'User - Dimentorin',
        href: '/users-dimentorin',
        icon: <UserSwitchOutlined className="text-[20px]" />,
      },
      {
        label: 'Session - Dimentorin',
        href: '/session-dimentorin',
        icon: <ScheduleOutlined className="text-[20px]" />,
      },
      {
        label: 'Content & Roadmap',
        href: '/roadmap-dimentorin',
        icon: <BookOutlined className="text-[20px]" />,
      },
      {
        label: 'Feedback & Review',
        href: '/feedback-review-dimentorin',
        icon: <CommentOutlined className="text-[20px]" />,
      },
      {
        label: 'Settings - Dimentorin',
        href: '/settings-dimentorin',
        icon: <SettingOutlined className="text-[20px]" />,
      },
    ],
  },
  {
    label: 'Gacha',
    icon: <ReloadOutlined className="text-[20px]" />,
    children: [
      {
        label: 'Dashboard & Set Gacha',
        href: '/dashboard',
        icon: <AppstoreOutlined className="text-[20px]" />,
      },
      {
        label: 'Gacha Roll',
        href: '/gacha-roll',
        icon: <ReloadOutlined className="text-[20px]" />,
      },
      {
        label: 'Validasi Transaksi',
        href: '/transactions',
        icon: <AuditOutlined className="text-[20px]" />,
      },
      {
        label: 'Data Pengiriman Hadiah',
        href: '/prizes',
        icon: <InboxOutlined className="text-[20px]" />,
      },
    ],
  },
  {
    label: 'CMS',
    icon: <BookOutlined className="text-[20px]" />,
    children: [
      {
        label: 'Events',
        href: '/cms-events',
        icon: <CalendarOutlined className="text-[20px]" />,
      },
      {
        label: 'Testimonials',
        href: '/cms-testimonials',
        icon: <MessageOutlined className="text-[20px]" />,
      },
    ],
  },
  {
    label: 'Permissions',
    href: '/permissions',
    icon: <UserSwitchOutlined className="text-[20px]" />,
  },
  {
    label: 'Roles',
    href: '/roles',
    icon: <UsergroupAddOutlined className="text-[20px]" />,
  },
  {
    label: 'Data Akun',
    href: '/accounts',
    icon: <UserOutlined className="text-[20px]" />,
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const BackofficeSidebar: FC<SidebarProps> = ({
  isOpen = false,
  onClose,
}): ReactElement => {
  const { signOut } = useSession();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENUS.forEach((menu) => {
      if (menu.children?.some((child) => child.href && location.pathname.includes(child.href))) {
        initial[menu.label] = true;
      }
    });
    return initial;
  });
  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard-dimentorin')
      return false;
    return location.pathname.includes(path);
  };

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupLabel]: !prev[groupLabel] }));
  };

  const sidebarContent = (
    <div className="w-[280px] bg-white h-svh py-10 lg:py-[60px] px-7 shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-10 lg:gap-20 justify-between items-center">
        <div className="flex justify-around lg:justify-center items-center w-full">
          <img
            src="/logos/simple.svg"
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

        <nav className="flex flex-col gap-4 w-full h-[calc(100svh-20rem)] overflow-y-auto">
          <For data={MENUS}>
            {(menu) =>
              menu.children && menu.children.length > 0 ? (
                <div key={menu.label} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggleGroup(menu.label)}
                    className={cn(
                      'flex items-center justify-between w-full gap-3 px-2 py-2.5 rounded-md cursor-pointer',
                      openGroups[menu.label]
                        ? 'bg-primary-400 hover:bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {menu.icon}
                      <span className="text-p3 font-medium">{menu.label}</span>
                    </div>
                    <span className="text-label2">
                      {openGroups[menu.label] ? (
                        <DownOutlined className="text-label1" />
                      ) : (
                        <RightOutlined className="text-label1" />
                      )}
                    </span>
                  </button>

                  {openGroups[menu.label] && (
                    <div className="mt-2 ml-6 flex flex-col gap-2">
                      {menu.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-3 px-2 py-2.5 rounded-md',
                            isActive(child.href)
                              ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                              : 'text-gray-700 hover:bg-gray-100'
                          )}
                        >
                          {child.icon}
                          <span className="text-label1 font-medium">
                            {child.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={menu.href ?? menu.label}
                  href={menu.href ?? '#'}
                  className={cn(
                    'flex items-center justify-items-start gap-3 px-2 py-2.5',
                    menu.href && isActive(menu.href)
                      ? 'bg-primary-500 text-white rounded-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {menu.icon}
                  <span className="text-p3 font-medium">{menu.label}</span>
                </a>
              )
            }
          </For>
        </nav>
      </div>

      <div className="w-full">
        <hr className="mb-5 border-primary-200" />
        <Button
          onClick={signOut}
          variant="text"
          className="items-start justify-start gap-3 px-2 py-2.5 text-gray-700 hover:text-red-500 transition-colors w-full"
        >
          <LogoutOutlined className="text-p3" />
          <span className="text-p3 font-medium">Log Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto shadow">
        {sidebarContent}
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
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
