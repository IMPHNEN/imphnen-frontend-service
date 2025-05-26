import '@/styles/globals.css';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './_components/providers';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
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
