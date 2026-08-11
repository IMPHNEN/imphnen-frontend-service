/**
 * Central helper to get the API base URL or construct full API endpoint URLs.
 * Reads environment variables in order of precedence:
 * 1. PUBLIC_API_URL
 * 2. NEXT_PUBLIC_API_URL
 * 3. VITE_API_URL
 * Fallback: 'https://api.imphnen.dev'
 */
export const getApiUrl = (path: string = ''): string => {
  const baseUrl = (
    import.meta.env.PUBLIC_API_URL ||
    import.meta.env.NEXT_PUBLIC_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://api.imphnen.dev'
  ).replace(/\/+$/, '');

  if (!path) return baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
