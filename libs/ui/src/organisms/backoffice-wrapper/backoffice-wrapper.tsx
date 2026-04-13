import * as React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore, useSession } from '@imphnen-frontend-service/service';
import { cn } from '@imphnen-frontend-service/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../atoms/avatar';
import { Button } from '../../atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../atoms/dropdown-menu';
import { Separator } from '../../atoms/separator';
import { SidebarTrigger } from '../../atoms/sidebar';

export type TBackofficeWrapperProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  classHeader?: string;
  classTitle?: string;
};

export const BackofficeWrapper: React.FC<TBackofficeWrapperProps> = ({
  children,
  title,
  description,
  actions,
  className,
  classHeader,
  classTitle,
}) => {
  const { session } = useAuthStore();
  const { signOut } = useSession();
  const navigate = useNavigate();
  const user = session?.user;
  const initials = (user?.fullname ?? 'U')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={cn('flex flex-col', className)}>
      <header
        className={cn(
          'sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/75',
          classHeader
        )}
      >
        <SidebarTrigger className="-ml-1 md:hidden" />
        <Separator orientation="vertical" className="h-5 md:hidden" />
        <div className="flex flex-1 items-center gap-3">
          {title && (
            <div className="flex flex-col">
              <h1
                className={cn(
                  'text-base font-semibold leading-tight text-foreground',
                  classTitle
                )}
              >
                {title}
              </h1>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="User menu"
              >
                <div className="hidden text-right md:flex md:flex-col md:leading-tight">
                  <span className="text-sm font-medium text-foreground">
                    {user?.fullname ?? 'Admin'}
                  </span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <Avatar>
                  <AvatarImage
                    src={user?.avatar || '/images/asd687hwq6nds4dfjj2983.webp'}
                    alt={user?.fullname ?? 'User avatar'}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">
                  {user?.fullname ?? 'Admin'}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user?.email ?? 'admin@imphnen.dev'}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => {
                  signOut();
                  navigate({ to: '/auth/login' });
                }}
              >
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
    </div>
  );
};
