'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ThemeProviderProps } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: ThemeProviderProps) {
  return <QueryProvider>{children}</QueryProvider>;
}

export const queryClient = new QueryClient();

function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
