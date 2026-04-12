import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { SessionToken } from '@imphnen-frontend-service/service';
import {
  SidebarInset,
  SidebarProvider,
} from '@imphnen-frontend-service/ui/atoms';
import { BackofficeSidebar } from '../components/sidebar';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const session = SessionToken.get();
    if (!session?.token?.access_token) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <BackofficeSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
