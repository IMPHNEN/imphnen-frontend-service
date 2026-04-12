'use client';

import { FC, ReactElement, useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  UsersRound,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  MessageCircle,
  Calendar,
  CalendarClock,
  Settings,
  BarChart3,
  RefreshCcw,
  Inbox,
  UserCog,
  UserPlus,
  ShieldCheck,
  KeyRound,
  User,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';

type MenuLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MenuGroup = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: MenuLink[];
};

type MenuItem = MenuLink | MenuGroup;

const MENUS: MenuItem[] = [
  {
    label: 'Hackathon',
    icon: BarChart3,
    children: [
      { label: 'Dashboard', href: '/hackathon-dashboard', icon: LayoutDashboard },
      { label: 'Users', href: '/hackathon-users', icon: Users },
      { label: 'Teams', href: '/hackathon-teams', icon: UsersRound },
      { label: 'Submissions', href: '/hackathon-submissions', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Dimentorin',
    icon: BookOpen,
    children: [
      { label: 'Dashboard', href: '/dashboard-dimentorin', icon: LayoutDashboard },
      { label: 'Users', href: '/users-dimentorin', icon: UserCog },
      { label: 'Session', href: '/session-dimentorin', icon: CalendarClock },
      { label: 'Content & Roadmap', href: '/roadmap-dimentorin', icon: BookOpen },
      { label: 'Feedback & Review', href: '/feedback-review-dimentorin', icon: MessageSquare },
      { label: 'Settings', href: '/settings-dimentorin', icon: Settings },
    ],
  },
  {
    label: 'Gacha',
    icon: RefreshCcw,
    children: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Gacha Roll', href: '/gacha-roll', icon: RefreshCcw },
      { label: 'Validasi Transaksi', href: '/transactions', icon: ClipboardCheck },
      { label: 'Data Pengiriman', href: '/prizes', icon: Inbox },
    ],
  },
  {
    label: 'CMS',
    icon: BookOpen,
    children: [
      { label: 'Events', href: '/cms-events', icon: Calendar },
      { label: 'Testimonials', href: '/cms-testimonials', icon: MessageCircle },
    ],
  },
];

const FLAT_MENUS: MenuLink[] = [
  { label: 'Permissions', href: '/permissions', icon: ShieldCheck },
  { label: 'Roles', href: '/roles', icon: KeyRound },
  { label: 'Data Akun', href: '/accounts', icon: User },
];

const isMenuGroup = (item: MenuItem): item is MenuGroup =>
  (item as MenuGroup).children !== undefined;

export const BackofficeSidebar: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard-dimentorin') {
      return false;
    }
    return location.pathname.includes(path);
  };

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENUS.forEach((menu) => {
      if (
        isMenuGroup(menu) &&
        menu.children.some((child) => isActive(child.href))
      ) {
        initial[menu.label] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <div className="flex items-center justify-center px-2 py-3">
          <img
            src="/logos/simple.svg"
            alt="IMPHNEN Logo"
            className="h-10 w-auto"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENUS.map((menu) => {
                const GroupIcon = menu.icon;
                const open = !!openGroups[menu.label];
                const groupHasActive =
                  isMenuGroup(menu) &&
                  menu.children.some((c) => isActive(c.href));
                return (
                  <SidebarMenuItem key={menu.label}>
                    <SidebarMenuButton
                      onClick={() => toggleGroup(menu.label)}
                      isActive={groupHasActive && !open}
                      className="justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <GroupIcon className="size-4" />
                        <span>{menu.label}</span>
                      </span>
                      {open ? (
                        <ChevronDown className="size-3.5 opacity-60" />
                      ) : (
                        <ChevronRight className="size-3.5 opacity-60" />
                      )}
                    </SidebarMenuButton>
                    {isMenuGroup(menu) && open && (
                      <SidebarMenuSub>
                        {menu.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(child.href)}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate({ to: child.href })
                                  }
                                  className={cn(
                                    'w-full text-left',
                                  )}
                                >
                                  <ChildIcon className="size-4" />
                                  <span>{child.label}</span>
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {FLAT_MENUS.map((menu) => {
                const Icon = menu.icon;
                return (
                  <SidebarMenuItem key={menu.href}>
                    <SidebarMenuButton
                      isActive={isActive(menu.href)}
                      onClick={() => navigate({ to: menu.href })}
                    >
                      <Icon className="size-4" />
                      <span>{menu.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
