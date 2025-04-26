import { type Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'IMPHNEN',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
