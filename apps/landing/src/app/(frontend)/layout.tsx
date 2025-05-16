import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import Footer from './_components/footer';
import { Header } from './_components/header';
import { ThemeProvider } from './_components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
