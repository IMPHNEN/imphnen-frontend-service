import { type Metadata } from 'next';
import { description, title } from '../data/metadata.json';
import '../styles/globals.css';

export const metadata: Metadata = { title, description };

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
