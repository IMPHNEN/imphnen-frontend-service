'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  // 1) Always default to `false`—this guarantees SSR and the very first client render match.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // 2) On mount, immediately set to the real match value (true or false).
    setMatches(mediaQueryList.matches);

    // 3) Subscribe to changes.
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
