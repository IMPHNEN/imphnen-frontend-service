'use client';

import { QueryProvider } from '@utils/ui';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryProvider>
  );
}
