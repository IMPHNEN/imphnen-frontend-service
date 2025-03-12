import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { queryClient } from './client';

export const QueryProvider: FC<PropsWithChildren> = (props): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
