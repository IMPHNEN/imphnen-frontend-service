import { poppinsFont } from '@/lib/fonts';
import '@/styles/globals.css';
import { cn } from '@utils';
import { type Metadata } from 'next';
import { Providers } from './_components/providers';
import { Toaster } from './_components/toaster';

export const metadata: Metadata = {
  title: 'IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngoding',
  description: 'Komunitas belajar programming untuk semua level',
  openGraph: {
    title: 'IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngoding',
    description: 'Komunitas belajar programming untuk semua level',
    url: 'https://imphnen.dev',
    images: [
      {
        url: 'https://imphnen.dev/imphnen-group-cover.webp',
        alt: 'IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngoding',
        width: 2550,
        height: 945,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan Ngoding',
    description: 'Komunitas belajar programming untuk semua level',
    images: ['https://imphnen.dev/imphnen-group-cover.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={cn(poppinsFont.className, 'antialiased')}>
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
