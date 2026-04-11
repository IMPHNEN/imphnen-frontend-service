import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from './_site/_components/header'
import { Footer } from './_site/_components/footer'

export const Route = createFileRoute('/_site')({
  component: SiteLayout,
})

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
