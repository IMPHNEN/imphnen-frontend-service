import { Outlet } from "react-router-dom";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
