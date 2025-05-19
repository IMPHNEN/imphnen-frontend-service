import { poppins } from '@/lib/fonts';
import '@/styles/globals.css';
import { type Metadata } from 'next';
import { ThemeProvider } from './_components/theme-provider';

export const metadata: Metadata = {
  title: 'IMPHNEN - Ingin Menjadi Programmer Handal Namung Enggan Ngonding',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
