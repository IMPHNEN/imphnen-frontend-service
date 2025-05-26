import { baiJamjureeFont } from '@/lib/fonts';
import '@/styles/globals.css';
import { cn } from '@utils';
import { type Metadata } from 'next';
import { Providers } from './_components/providers';

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
      <body className={cn(baiJamjureeFont.className, 'antialiased')}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
