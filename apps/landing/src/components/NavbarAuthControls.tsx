import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const TOKEN_KEY = 'token';

function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const found = cookies.find((c) => c.trim().startsWith(`${TOKEN_KEY}=`));
  if (!found) return null;
  try {
    const raw = found.split('=').slice(1).join('=');
    const parsed = JSON.parse(decodeURIComponent(raw));
    return parsed?.access_token || parsed?.token?.access_token || null;
  } catch {
    return null;
  }
}

function clearToken() {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  localStorage.removeItem('access_token');
}

export default function NavbarAuthControls() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const token = getTokenFromCookie() || localStorage.getItem('access_token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const token = getTokenFromCookie() || localStorage.getItem('access_token');
      if (token) {
        await fetch(getApiUrl('/v1/iam/auth/logout'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).catch(() => {/* ignore logout API error, clear anyway */});
      }
    } finally {
      clearToken();
      setLoggedIn(false);
      setLoggingOut(false);
      window.location.href = '/';
    }
  };

  if (!loggedIn) {
    return (
      <a
        href="/login"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
        Masuk
      </a>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loggingOut ? (
        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      )}
      {loggingOut ? 'Keluar...' : 'Logout'}
    </button>
  );
}
