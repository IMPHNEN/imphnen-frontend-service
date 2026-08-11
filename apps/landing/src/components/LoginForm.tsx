import { useState, type FormEvent } from 'react';
import { getApiUrl } from '../utils/api';

const ICON_MAIL = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ICON_LOCK = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ICON_EYE = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ICON_EYE_OFF = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ICON_ALERT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ICON_CHECK = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(getApiUrl('/v1/iam/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login gagal. Periksa kembali email dan password Anda.');
      }

      const payload = data.data ?? data;
      const tokenObj = payload.token ?? payload;
      const accessToken: string = tokenObj.access_token ?? tokenObj;

      if (accessToken) {
        const expires = new Date();
        expires.setDate(expires.getDate() + (rememberMe ? 30 : 1));
        const cookieValue = encodeURIComponent(JSON.stringify(tokenObj));
        document.cookie = `token=${cookieValue}; expires=${expires.toUTCString()}; path=/; samesite=strict`;
        localStorage.setItem('access_token', accessToken);
      }

      setSuccess('Login berhasil! Mengalihkan...');
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get('redirect') || '/';
        window.location.href = redirectTo;
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    paddingLeft: '44px',
    paddingRight: field === 'password' ? '44px' : '16px',
    paddingTop: '13px',
    paddingBottom: '13px',
    borderRadius: '12px',
    border: `1.5px solid ${focusedField === field ? '#23a1eb' : '#e7e7e7'}`,
    background: focusedField === field ? '#f0f8ff' : '#ffffff',
    fontSize: '14px',
    color: '#0a2b47',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(35,161,235,0.15)' : 'none',
  });

  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div style={{
          marginBottom: '20px',
          padding: '14px 16px',
          borderRadius: '12px',
          background: '#fff5f5',
          border: '1.5px solid #ffcdd2',
          color: '#c62828',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{ flexShrink: 0, marginTop: '1px', color: '#e53935' }}>{ICON_ALERT}</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{
          marginBottom: '20px',
          padding: '14px 16px',
          borderRadius: '12px',
          background: '#f0fff4',
          border: '1.5px solid #a7f3d0',
          color: '#065f46',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{ flexShrink: 0, marginTop: '1px', color: '#059669' }}>{ICON_CHECK}</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#454545', marginBottom: '8px' }}>
            Email atau Username
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? '#23a1eb' : '#b0b0b0', pointerEvents: 'none', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              {ICON_MAIL}
            </span>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="nama@email.com atau username"
              style={inputStyle('email')}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#454545', marginBottom: '8px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'password' ? '#23a1eb' : '#b0b0b0', pointerEvents: 'none', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              {ICON_LOCK}
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              style={inputStyle('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#b0b0b0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#23a1eb')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#b0b0b0')}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? ICON_EYE_OFF : ICON_EYE}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#6d6d6d', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: '15px', height: '15px', accentColor: '#23a1eb', cursor: 'pointer' }}
            />
            <span>Ingat saya</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            background: loading ? '#81cbf8' : 'linear-gradient(135deg, #0877c1 0%, #23a1eb 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '15px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(35,161,235,0.4)',
            transition: 'all 0.2s ease',
            letterSpacing: '0.01em',
          }}
          onMouseOver={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {loading ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <circle style={{ opacity: 0.3 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{ opacity: 0.8 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk Sekarang</span>
          )}
        </button>
      </form>
    </div>
  );
}

