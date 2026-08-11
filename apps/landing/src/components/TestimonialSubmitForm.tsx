import { useState, useEffect, type FormEvent } from 'react';
import { getApiUrl } from '../utils/api';

const TOKEN_KEY = 'token';

function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  // Try localStorage first (faster)
  const ls = localStorage.getItem('access_token');
  if (ls) return ls;
  // Fallback to cookie
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

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function TestimonialSubmitForm() {
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      // Redirect to login with return URL
      window.location.href = '/login?redirect=/testimonials/submit';
    } else {
      setAuthed(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedRole = role.trim();
    const trimmedContent = content.trim();

    if (!trimmedRole) { setErrorMsg('Role / jabatan tidak boleh kosong.'); return; }
    if (trimmedContent.length < 20) { setErrorMsg('Testimoni minimal 20 karakter.'); return; }

    setErrorMsg('');
    setSubmitState('loading');

    try {
      const token = getAccessToken();
      if (!token) {
        window.location.href = '/login?redirect=/testimonials/submit';
        return;
      }

      const res = await fetch(getApiUrl('/v1/landing/cms/testimonials/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: trimmedRole, content: trimmedContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Gagal mengirim testimoni.');
      }

      setSubmitState('success');
      setRole('');
      setContent('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan. Coba lagi.');
      setSubmitState('error');
    }
  };

  // Checking auth
  if (authed === null) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (submitState === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Testimoni Terkirim!</h2>
        <p className="text-gray-500 mb-8">
          Terima kasih telah berbagi ceritamu. Testimonimu akan segera ditampilkan setelah direview.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Lihat Semua Testimoni
          </a>
          <button
            onClick={() => setSubmitState('idle')}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Tulis Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h.5a.5.5 0 0 1 0 1H4a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3h.5V2H2zM9 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h.5a.5.5 0 0 1 0 1H13a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3h.5V2H11z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bagikan Pengalamanmu</h1>
        <p className="text-gray-500 text-sm">
          Ceritakan pengalamanmu bergabung di komunitas IMPHNEN
        </p>
      </div>

      {/* Error Banner */}
      {(submitState === 'error' || errorMsg) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-700">{errorMsg || 'Terjadi kesalahan. Silakan coba lagi.'}</p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5"
      >
        {/* Role field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="testimonial-role" className="text-sm font-semibold text-gray-700">
            Role / Jabatan <span className="text-red-500">*</span>
          </label>
          <input
            id="testimonial-role"
            type="text"
            required
            maxLength={100}
            placeholder="Contoh: Frontend Developer, Mahasiswa Informatika, dsb."
            value={role}
            onChange={(e) => { setRole(e.target.value); setErrorMsg(''); }}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
          <p className="text-xs text-gray-400">{role.length}/100 karakter</p>
        </div>

        {/* Content field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="testimonial-content" className="text-sm font-semibold text-gray-700">
            Testimoni <span className="text-red-500">*</span>
          </label>
          <textarea
            id="testimonial-content"
            required
            minLength={20}
            maxLength={1000}
            rows={6}
            placeholder="Ceritakan pengalamanmu bergabung di IMPHNEN, apa yang kamu pelajari, dan bagaimana komunitas ini membantumu..."
            value={content}
            onChange={(e) => { setContent(e.target.value); setErrorMsg(''); }}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Minimal 20 karakter</span>
            <span className={content.length > 900 ? 'text-orange-500' : ''}>{content.length}/1000</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={submitState === 'loading'}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitState === 'loading' ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kirim Testimoni
              </>
            )}
          </button>
          <a
            href="/testimonials"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </a>
        </div>
      </form>
    </div>
  );
}
