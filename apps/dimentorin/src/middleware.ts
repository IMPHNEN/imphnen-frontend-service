import { LoaderFunctionArgs } from 'react-router-dom';

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const pathname = url.pathname;

  if (pathname) return null;

  return null;
};
