import { FC, PropsWithChildren, ReactNode } from 'react';

type TProps = PropsWithChildren<{
  permissions?: Array<string>;
  fallback?: ReactNode;
}>;

export const Guard: FC<TProps> = (props): ReactNode => {
  // Permission checking removed - always allow access
  return props.children;
};
