import { poppins } from '@/lib/fonts';
import '@/styles/globals.css';
import { type Metadata } from 'next';
import { Providers } from './_components/providers';

export const metadata: Metadata = {
  title: 'IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngonding',
  description:
    'Komunitas Ingin Menjadi Programmer Handal Namung Enggan Ngonding',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
