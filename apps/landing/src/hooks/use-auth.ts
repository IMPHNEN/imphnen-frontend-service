'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cookie, setCookie] =  useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('__imphnen_access_token__='))
        ?.split('=')[1];

      setIsAuthenticated(!!accessToken);
      setCookie(accessToken || null)
    };

    checkAuth();
  }, []);

  function getToken (){
    if(isAuthenticated) return cookie
  }

  return { isAuthenticated, getToken };
}
