import { poppinsFont } from '@/lib/fonts';
import '@/styles/globals.css';
import { cn } from '@utils';
import { type Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from './_components/providers';
import { Toaster } from './_components/toaster';

export const metadata: Metadata = {
  title: 'IMPHNEN - Ingin Menjadi Programmer Handal?',
  description: 'Komunitas belajar programming untuk semua level',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={cn(poppinsFont.className, 'antialiased')}>
        <NextTopLoader
          color="#6366f1"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #6366f1,0 0 5px #6366f1"
        />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
