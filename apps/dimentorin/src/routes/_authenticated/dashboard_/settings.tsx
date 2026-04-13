import { createFileRoute, Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  useAuthStore,
  useSessionQuery,
} from '@imphnen-frontend-service/service'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import { resolvePersona } from '../dashboard/_data/persona-resolver'

type SettingsSection = 'account' | 'privacy' | 'preferences' | 'faq' | 'report' | 'feedback'

export const Route = createFileRoute('/_authenticated/dashboard_/settings')({
  component: SettingsPage,
})

/**
 * Header component for the dashboard, containing the app brand and user profile.
 * Replicated from dashboard.tsx for consistency.
 */
function HeaderDashboard({ persona, user, onLogout }: { persona: 'user' | 'mentor', user: any, onLogout: () => void }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, title: 'Mentoring Sesi Baru', message: 'Kamu punya sesi mentoring besok jam 20:00 WIB', time: '2 jam yang lalu', unread: true },
    { id: 2, title: 'Artikel Disetujui', message: 'Artikel "How to install linux" kamu telah disetujui mentor', time: '5 jam yang lalu', unread: false },
    { id: 3, title: 'Roadmap Selesai', message: 'Selamat! Kamu telah menyelesaikan roadmap Front-end Basic', time: '1 hari yang lalu', unread: false },
  ]

  return (
    <header className="h-[58px] w-[972px] mx-auto mt-[52px] mb-[62px] bg-white rounded-sm shadow-sm flex items-center justify-between px-5 relative">
      <Link to="/dashboard" className="text-[19px] font-semibold text-primary-accent">
        Dimentorin.dev
      </Link>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer transition-colors ${
              isNotificationsOpen ? 'bg-primary-50 text-primary-accent' : 'bg-white text-neutral-600'
            }`}
          >
            <Icon icon="lucide:bell" width="16" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Notifikasi</h3>
                <button className="text-xs text-primary-600 font-medium hover:underline cursor-pointer">Tandai semua dibaca</button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${n.unread ? 'bg-primary-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-sm font-bold ${n.unread ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-xs font-bold text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Lihat Semua Notifikasi</button>
              </div>
            </div>
          )}
        </div>
        <Link 
          to="/dashboard/settings"
          className="w-7 h-7 rounded-sm bg-white text-neutral-600 flex items-center justify-center cursor-pointer"
        >
          <Icon icon="lucide:settings" width="16" />
        </Link>
        
        <Link 
          to="/profile" 
          className="h-[42px] flex items-center gap-3 pl-2.5 cursor-pointer border-none bg-transparent"
        >
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-medium text-neutral-600">{user?.fullname || 'User'}</span>
            <span className="text-[10px] font-medium text-neutral-600">{persona === 'mentor' ? 'Mentor' : 'Mentee'}</span>
          </div>
          <div 
            className="w-7 h-7 rounded-full bg-bg-placeholder bg-cover bg-center" 
            style={user?.avatar ? { backgroundImage: `url(${user.avatar})` } : {}}
          />
        </Link>
      </div>
    </header>
  );
}

function SettingsPage() {
  const { session, clearSession } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { data: meData } = useSessionQuery()
  const [activeSection, setActiveSection] = useState<SettingsSection>('account')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [twoStepAuthStep, setTwoStepAuthStep] = useState<'off' | 'input-email' | 'input-otp' | 'done'>('off')

  const user = session?.user
  const searchParams = new URLSearchParams(location.search);
  const persona = resolvePersona(user, searchParams);

  const sections = [
    { id: 'account' as const, label: 'Detail Akun', icon: 'mdi:account-outline', category: 'Account' },
    { id: 'privacy' as const, label: 'Privasi & Keamanan', icon: 'mdi:shield-lock-outline', category: 'Account' },
    { id: 'preferences' as const, label: 'Preferences', icon: 'mdi:tune-variant', category: 'Account' },
    { id: 'faq' as const, label: 'FAQ', icon: 'mdi:help-circle-outline', category: 'Help & Feedback' },
    { id: 'report' as const, label: 'Laporkan Kendala', icon: 'mdi:alert-circle-outline', category: 'Help & Feedback' },
    { id: 'feedback' as const, label: 'Umpan Balik', icon: 'mdi:message-draw', category: 'Help & Feedback' },
  ]

  const handleLogout = () => {
    clearSession();
    navigate({ to: '/auth/login' });
  }

  return (
    <div className="min-h-screen bg-bg-light-blue flex">
      {/* Sidebar Navigation */}
      <aside className="w-[228px] bg-white flex flex-col sticky top-0 h-screen z-100">
        {/* Logo */}
        <div className="pt-[60px] px-6 pb-8">
          <div className="h-12 flex items-center justify-center">
            <img
              src="/logos/logo.svg"
              alt="Dimentorin"
              style={{ width: '128px', height: '48px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-6 space-y-8 overflow-y-auto">
          <div>
            <p className="px-3 text-[10px] font-medium text-[#888888] uppercase tracking-wider mb-2">Account</p>
            <div className="space-y-1">
              {sections.filter(s => s.category === 'Account').map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-primary-accent text-white'
                      : 'text-text-muted hover:bg-bg-hover hover:text-primary-accent'
                  }`}
                >
                  <Icon icon={s.icon} width="16" className={activeSection === s.id ? 'text-white' : 'text-text-muted'} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-medium text-[#888888] uppercase tracking-wider mb-2">Help & Feedback</p>
            <div className="space-y-1">
              {sections.filter(s => s.category === 'Help & Feedback').map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-primary-accent text-white'
                      : 'text-text-muted hover:bg-bg-hover hover:text-primary-accent'
                  }`}
                >
                  <Icon icon={s.icon} width="16" className={activeSection === s.id ? 'text-white' : 'text-text-muted'} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="flex flex-col pt-4 px-6 pb-[34px]">
          <div className="h-px bg-border-light mb-4" />
          <button
            onClick={handleLogout}
            className="h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium leading-[1.3] text-text-muted transition-all duration-200 hover:bg-bg-hover"
          >
            <Icon icon="mdi:logout" width="16" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <HeaderDashboard 
          persona={persona} 
          user={session?.user} 
          onLogout={handleLogout} 
        />
        
        <main className="w-[1052px] mx-auto px-10 pt-6 pb-10">
          <h1 className="text-[23px] font-semibold text-[#454545] mb-8">
            {sections.find(s => s.id === activeSection)?.label}
          </h1>

          <div className="bg-white rounded-sm shadow-sm p-10">
            {activeSection === 'account' && (
              <div className="max-w-[732px]">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-[120px] h-[120px] rounded-full bg-bg-placeholder overflow-hidden border-2 border-neutral-50">
                    <img src={user?.avatar || "/image/mascot-character.webp"} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <button className="h-[34px] px-5 border border-primary-accent text-primary-accent rounded-sm text-[15px] font-semibold hover:bg-primary-50 transition-all cursor-pointer mb-2">
                      Upload Foto
                    </button>
                    <p className="text-[10px] text-[#888888] leading-relaxed">
                      Setidaknya rekomendasi ukuran 240x240 px.<br />
                      .jpg, .jpeg, .png diperbolehkan
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-[19px] font-semibold text-[#454545]">Informasi Pribadi</h2>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[15px] font-medium text-[#454545]">Nama Depan</label>
                      <input
                        type="text"
                        placeholder="Rizal"
                        defaultValue={user?.fullname?.split(' ')[0] || ""}
                        className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none focus:border-primary-accent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[15px] font-medium text-[#454545]">Nama Belakang</label>
                      <input
                        type="text"
                        placeholder="Syaepulloh"
                        defaultValue={user?.fullname?.split(' ').slice(1).join(' ') || ""}
                        className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none focus:border-primary-accent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[15px] font-medium text-[#454545]">Email</label>
                      <input
                        type="email"
                        placeholder="ahmduncl@yahoo.com"
                        defaultValue={user?.email || ""}
                        className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none focus:border-primary-accent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[15px] font-medium text-[#454545]">Nomor Telepon</label>
                      <input
                        type="text"
                        placeholder="+62 823-2321-8888"
                        className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none focus:border-primary-accent transition-all"
                      />
                    </div>
                  </div>

                  <button className="h-[43px] px-8 bg-neutral-100 text-[#888888] rounded-sm text-[15px] font-semibold cursor-not-allowed mt-4">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-12">
                <div className="w-full p-6 border border-neutral-100 rounded-sm space-y-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-1">
                      <h3 className="text-[19px] font-semibold text-[#454545]">Two Step Authentication</h3>
                      <p className="text-[15px] text-[#888888]">
                        Tambahkan lapisan keamanan ekstra ke akun kamu.
                      </p>
                    </div>
                    <button
                      onClick={() => setTwoStepAuthStep('input-email')}
                      className="h-[34px] px-6 bg-primary-accent text-white rounded-sm text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                    >
                      Aktifkan 2FA
                    </button>
                  </div>
                </div>

                <div className="w-full p-6 border border-neutral-100 rounded-sm space-y-6">
                  <h3 className="text-[19px] font-semibold text-[#454545]">Notifikasi Email</h3>
                  <div className="space-y-4">
                    {[
                      'Informasi roadmap, mentoring, dan artikel.',
                      'Pembaruan sistem/update fitur/fixing/patch notes.',
                      'Informasi penawaran/promosi program.'
                    ].map((label, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 rounded border-neutral-200 text-primary-accent focus:ring-primary-accent" />
                        <span className="text-[15px] text-[#6d6d6d] group-hover:text-[#454545] transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="w-full p-6 border border-neutral-100 rounded-sm space-y-8">
                  <h3 className="text-[19px] font-semibold text-[#454545]">Rubah Password</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[15px] font-medium text-[#454545]">Password Lama</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[15px] font-medium text-[#454545]">Password Baru</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[15px] font-medium text-[#454545]">Konfirmasi Password Baru</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent"
                        />
                      </div>
                    </div>
                    <button className="h-[43px] px-8 bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer">
                      Reset Password
                    </button>
                  </div>
                </div>

                <div className="w-full p-6 border border-red-100 bg-red-50/30 rounded-sm flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-[19px] font-semibold text-red-600">Penghapusan Akun?</h3>
                    <p className="text-[15px] text-[#888888]">
                      Tindakan ini tidak dapat dibatalkan. Semua data kamu akan dihapus secara permanen.
                    </p>
                  </div>
                  <button className="h-[34px] px-6 bg-red-500 text-white rounded-sm text-xs font-semibold hover:bg-red-600 transition-all cursor-pointer">
                    Hapus Akun
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 border border-neutral-100 rounded-sm space-y-8">
                  <h3 className="text-[23px] font-semibold text-[#454545]">Learning Roadmap</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Preferensi Belajar/Materi Roadmap</p>
                      <div className="flex gap-4">
                        {['Visual', 'Audio', 'Kinestetik'].map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-neutral-200 text-primary-accent" />
                            <span className="text-[15px] text-[#6d6d6d]">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Tujuan Belajar</p>
                      <div className="space-y-3">
                        {['Mempelajari skillset baru', 'Rencana perpindahan karir', 'Persiapan Karir'].map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-neutral-200 text-primary-accent" />
                            <span className="text-[15px] text-[#6d6d6d]">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Rata - rata waktu belajar</p>
                      <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none bg-white">
                        <option>Waktu Belajar</option>
                        <option>1-2 jam / hari</option>
                        <option>3-5 jam / hari</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Fitur platform yang disukai</p>
                      <div className="space-y-3">
                        {['Video Interaktif', 'Text + Quiz', 'Project Based Learning', 'Guided Daily Task'].map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-neutral-200 text-primary-accent" />
                            <span className="text-[15px] text-[#6d6d6d]">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full h-[43px] bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer">
                      Kirim Preferensi
                    </button>
                  </div>
                </div>

                <div className="p-8 border border-neutral-100 rounded-sm space-y-8">
                  <h3 className="text-[23px] font-semibold text-[#454545]">Mentoring</h3>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Gaya Mentoring</p>
                      <div className="space-y-3">
                        {['Santai & Friendly', 'To The Point', 'Menjelaskan dengan praktik', 'Mulai dari fundamental'].map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-neutral-200 text-primary-accent" />
                            <span className="text-[15px] text-[#6d6d6d]">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Waktu Mentoring</p>
                      <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#6d6d6d] outline-none bg-white">
                        <option>Waktu Mentoring</option>
                        <option>Pagi (08:00 - 12:00)</option>
                        <option>Sore (13:00 - 17:00)</option>
                        <option>Malam (19:00 - 22:00)</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[15px] font-medium text-[#454545]">Metode Komunikasi</p>
                      <div className="space-y-3">
                        {['Chat', 'Online Meeting', 'Offline(Jika Memungkinkan)', 'Asynchronous', 'Option 5'].map(label => (
                          <label key={label} className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="comm" className="w-4 h-4 border-neutral-200 text-primary-accent focus:ring-primary-accent" />
                            <span className="text-[15px] text-[#6d6d6d] group-hover:text-[#454545] transition-colors">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full h-[43px] bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer">
                      Kirim Preferensi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'faq' && (
              <div className="space-y-8">
                <div className="w-full aspect-[732/240] bg-primary-50 rounded-sm relative overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-2 z-10">
                    <h2 className="text-[23px] font-bold text-primary-accent">Frequently Asked Questions</h2>
                    <p className="text-[15px] text-primary-800 max-w-[460px] mx-auto">
                      Kamu lagi nyari info penting? Ini tempatnya. Bahkan<br />
                      Main Character pun butuh FAQ kadang-kadang... :v
                    </p>
                  </div>
                  <img src="/image/mascot-character.webp" alt="" className="absolute -left-10 bottom-0 w-[200px] h-auto opacity-20" />
                  <img src="/image/mascot-character.webp" alt="" className="absolute -right-10 bottom-0 w-[200px] h-auto opacity-20 scale-x-[-1]" />
                </div>

                <div className="space-y-4">
                  {[
                    { q: 'Bagaimana cara AI menyesuaikan roadmap belajar saya?', a: 'AI kami menggunakan data preferensi pembelajaran Anda (seperti topik favorit, gaya belajar, dan ketersediaan waktu) untuk membuat roadmap yang personal. Anda bisa mengedit preferensi ini di Settings > Preferensi Pembelajaran agar rekomendasi lebih akurat.' },
                    { q: 'Apakah roadmap belajar diperbarui secara otomatis saat saya menyelesaikan materi?', a: 'Ya, sistem kami akan melacak progres Anda dan memberikan materi selanjutnya secara otomatis.' },
                    { q: 'Bisakah saya memberikan umpan balik untuk platform ini', a: 'Tentu saja! Kami sangat menghargai feedback Anda melalui menu Umpan Balik.' },
                    { q: 'Bisakah saya mengganti mentor atau membatalkan sesi mentoring?', a: 'Anda dapat membatalkan sesi minimal 24 jam sebelumnya melalui dashboard mentoring.' },
                    { q: 'Apa yang harus saya lakukan jika mentor tidak hadir dalam sesi yang dijadwalkan?', a: 'Silakan laporkan kendala melalui menu Laporkan Kendala agar tim kami bisa segera menindaklanjuti.' }
                  ].map((item, i) => (
                    <div key={i} className="border-b border-neutral-100 pb-4">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between text-left py-4 group cursor-pointer"
                      >
                        <span className="text-[15px] font-semibold text-[#454545] group-hover:text-primary-accent transition-colors">{item.q}</span>
                        <Icon
                          icon={expandedFaq === i ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                          className={`text-[#888888] transition-transform ${expandedFaq === i ? 'text-primary-accent' : ''}`}
                          width="24"
                        />
                      </button>
                      {expandedFaq === i && (
                        <div className="pb-4 animate-in fade-in slide-in-from-top-2">
                          <p className="text-[15px] text-[#888888] leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'report' && (
              <div className="max-w-[732px] space-y-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Kode Laporan</label>
                    <input readOnly value="IMP-00001" className="w-full h-[43px] px-5 bg-bg-light-blue border border-neutral-100 rounded-sm text-[15px] text-[#888888]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Waktu Terjadi Kendala</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Kendala yang dialami</label>
                    <input placeholder="Tulis kendala kamu" className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent" />
                    <p className="text-[10px] text-[#888888]">Jelaskan secara singkat masalah yang kamu alami</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Menu/Fitur yang bermasalah</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Device Yang Digunakan</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Deskripsi Kendala</label>
                    <textarea
                      placeholder="Deskripsi Detail Kendala"
                      className="w-full h-[200px] p-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent resize-none"
                    />
                    <p className="text-[10px] text-[#888888]">Deskripsikan kendala yang kamu alami secara detail dan kronologisnya</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Lampirkan Bukti</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                </div>

                <button className="h-[43px] px-8 bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer">
                  Laporkan Kendala
                </button>
              </div>
            )}

            {activeSection === 'feedback' && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <p className="text-[15px] font-medium text-[#454545] text-center">Seberapa puas anda dengan platform ini?</p>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        className="w-[128px] h-[43px] rounded-sm bg-primary-50 text-primary-accent font-semibold hover:bg-primary-accent hover:text-white transition-all cursor-pointer"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#888888] text-center tracking-wider uppercase">1 = Sangat Tidak Puas, 5 = Sangat Puas</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-medium text-[#454545]">Apa hal yang paling kamu sukai dari platform ini</label>
                  <textarea
                    placeholder="Deskripsi Detail Kendala"
                    className="w-full h-[120px] p-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent resize-none"
                  />
                  <p className="text-[10px] text-[#888888]">Deskripsikan kendala yang kamu alami secara detail dan kronologisnya</p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Seberapa mudah Anda menggunakan platform ini ?</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Platform ini membantu perkembangan karier atau pembelajaran Anda?</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Bagian apa yang perlu kami ditingkatkan?</label>
                    <select className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white">
                      <option>Placeholder</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-medium text-[#454545]">Menurut pengalaman kamu, apa yang harus ditingkatkan dari platform ini?</label>
                  <textarea
                    placeholder="Deskripsi Detail Kendala"
                    className="w-full h-[120px] p-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent resize-none"
                  />
                  <p className="text-[10px] text-[#888888]">Deskripsikan kendala yang kamu alami secara detail dan kronologisnya</p>
                </div>

                <button className="h-[43px] px-8 bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer">
                  Kirim Feedback
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Two Step Auth Modals */}
      {twoStepAuthStep !== 'off' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setTwoStepAuthStep('off')}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <Icon icon="mdi:close" width="24" />
            </button>

            {twoStepAuthStep === 'input-email' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:email-outline" width="32" className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verifikasi Email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  Masukkan email kamu untuk menerima kode verifikasi OTP
                </p>
                <input
                  type="email"
                  placeholder="name@example.com"
                  defaultValue={user?.email || ""}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-xl mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => setTwoStepAuthStep('input-otp')}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  Kirim Kode
                </button>
              </div>
            )}

            {twoStepAuthStep === 'input-otp' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:shield-check-outline" width="32" className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Masukkan Kode OTP</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  Kami telah mengirimkan kode 6 digit ke email kamu
                </p>
                <div className="flex justify-between mb-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 border border-neutral-300 dark:border-gray-600 rounded-xl text-center text-xl font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTwoStepAuthStep('done')}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  Verifikasi
                </button>
                <p className="text-sm text-gray-500 mt-6">
                  Tidak menerima kode? <button className="text-primary-600 font-medium cursor-pointer">Kirim ulang</button>
                </p>
              </div>
            )}

            {twoStepAuthStep === 'done' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:check-circle-outline" width="32" className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2FA Berhasil Diaktifkan!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  Akun kamu sekarang lebih aman dengan verifikasi dua langkah
                </p>
                <button
                  onClick={() => setTwoStepAuthStep('off')}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
