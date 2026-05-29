import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from './_components/Header';
import Footer from './_components/Footer';

export const Route = createFileRoute('/_site')({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
