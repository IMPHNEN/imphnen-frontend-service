import { Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  useAuthStore,
  useSessionQuery,
} from '@imphnen-frontend-service/service'
import { cn } from '@imphnen-frontend-service/utils'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'

export type MentorSettingsSection = 'account' | 'privacy' | 'preferences' | 'faq' | 'report' | 'feedback'

interface MentorSettingsContentProps {
  section: MentorSettingsSection
}

export function MentorSettingsContent({ section }: MentorSettingsContentProps) {
  const { session } = useAuthStore()
  const { data: meData } = useSessionQuery()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [twoStepAuthStep, setTwoStepAuthStep] = useState<'off' | 'input-email' | 'input-otp' | 'done'>('off')
  const [isBankConnected, setIsBankConnected] = useState(false)

  const user = session?.user

  const sections = [
    { id: 'account' as const, label: 'Detail Akun', icon: 'mdi:account-outline', category: 'Account' },
    { id: 'privacy' as const, label: 'Privasi & Keamanan', icon: 'mdi:shield-lock-outline', category: 'Account' },
    { id: 'preferences' as const, label: 'Monetization', icon: 'mdi:tune-variant', category: 'Account' },
    { id: 'faq' as const, label: 'FAQ', icon: 'mdi:help-circle-outline', category: 'Help & Feedback' },
    { id: 'report' as const, label: 'Laporkan Kendala', icon: 'mdi:alert-circle-outline', category: 'Help & Feedback' },
    { id: 'feedback' as const, label: 'Umpan Balik', icon: 'mdi:message-draw', category: 'Help & Feedback' },
  ]

  const activeSection: MentorSettingsSection =
    section && sections.some((item) => item.id === section)
      ? (section as MentorSettingsSection)
      : 'account'

  if (!sections.some((item) => item.id === section)) {
    return <Navigate to="/dashboard/mentor/settings/account" />
  }

  return (
    <div className="min-w-0">
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
                        Aktifkan 2FA biar akunmu sekuat pertahanan tembok kastil,
                        sehingga aman dari serangan Titan (atau hacker)!
                      </p>
                    </div>
                    <button
                      onClick={() => setTwoStepAuthStep(meData?.user?.is_active ? 'input-email' : 'input-email')}
                      className={cn(
                        "h-[34px] px-6 rounded-sm text-xs font-semibold transition-all cursor-pointer",
                        meData?.user?.is_active 
                          ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100" 
                          : "bg-primary-accent text-white hover:opacity-90"
                      )}
                    >
                      {meData?.user?.is_active ? 'Nonaktifkan 2FA' : 'Aktifkan 2FA'}
                    </button>
                  </div>
                </div>

                <div className="w-full p-6 border border-neutral-100 rounded-sm space-y-6">
                  <h3 className="text-[19px] font-semibold text-[#454545]">Notifikasi Email</h3>
                  <div className="space-y-4">
                    {[
                      'Informasi artikel yang di publish',
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
                  <h3 className="text-[19px] font-semibold text-[#454545]">Ubah Password</h3>
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
              <div className="space-y-8">
                {!isBankConnected ? (
                  <div className="w-full p-6 border border-neutral-100 rounded-sm flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img src="/image/IllustrationBankAccount1.png" alt="Illustration Bank Account" className="w-[124px] h-[96px] object-contain" />
                      <div>
                        <h3 className="text-[23px] font-semibold text-[#454545]">Tambahkan Rekening Bank Anda</h3>
                        <p className="text-[15px] text-[#6d6d6d]">Rekening bank Anda belum terhubung. Lengkapi data agar transaksi berjalan lancar.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsBankConnected(true)}
                      className="h-[34px] px-6 bg-primary-accent text-white rounded-sm text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                    >
                      Tambah Rekening
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="w-full p-6 border border-neutral-100 rounded-sm flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img src="/image/payment/bca.webp" alt="BCA" className="w-[95px] h-[35px] object-contain" />
                        <div>
                          <p className="text-[23px] font-medium text-[#454545]">Your Bank Account</p>
                          <p className="text-[35px] font-semibold text-[#454545] leading-none">628xxxxx</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsBankConnected(false)}
                        className="h-[34px] px-6 bg-primary-accent text-white rounded-sm text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                      >
                        Ubah Rekening
                      </button>
                    </div>

                    <div className="w-full p-6 border border-neutral-100 rounded-sm flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img src="/image/payment/qris.webp" alt="Income" className="w-[40px] h-[40px] object-contain" />
                        <div>
                          <p className="text-[23px] font-medium text-[#454545]">Your Income</p>
                          <p className="text-[35px] font-semibold text-[#454545] leading-none">Rp. 100.000.000</p>
                        </div>
                      </div>
                      <button className="h-[34px] px-6 bg-primary-accent text-white rounded-sm text-xs font-semibold hover:opacity-90 transition-all cursor-pointer">
                        Withdraw
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[23px] font-semibold text-[#454545]">Payments History</h3>
                    <button className="h-[34px] px-5 bg-primary-accent text-white rounded-sm text-xs font-semibold hover:opacity-90 transition-all cursor-pointer flex items-center gap-2">
                      <Icon icon="mdi:filter-outline" width="16" />
                      Filter
                    </button>
                  </div>
                  <div className="w-full p-6 border border-neutral-100 rounded-sm">
                    <div className="overflow-hidden rounded-sm border border-neutral-100">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-primary-50">
                            <th className="px-4 py-3 text-left"><input type="checkbox" className="w-4 h-4" /></th>
                            <th className="px-4 py-3 text-left text-[15px] font-medium text-[#454545]">No.</th>
                            <th className="px-4 py-3 text-left text-[15px] font-medium text-[#454545]">Tanggal Mentoring</th>
                            <th className="px-4 py-3 text-left text-[15px] font-medium text-[#454545]">Sesi</th>
                            <th className="px-4 py-3 text-left text-[15px] font-medium text-[#454545]">Nama Mentee</th>
                            <th className="px-4 py-3 text-left text-[15px] font-medium text-[#454545]">Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { no: '1', date: '28-01-2025', sesi: 'Senin, 19:00 - 19:45', mentee: 'Firdaus Wijaye', jumlah: 'Rp.100.000' },
                            { no: '2.', date: '27-01-2025', sesi: 'Senin, 19:00 - 19:45', mentee: 'Muhammad Alveriz Alcatraz', jumlah: 'Rp.100.000' },
                          ].map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-primary-50'}>
                              <td className="px-4 py-3"><input type="checkbox" className="w-4 h-4" defaultChecked={idx === 0} /></td>
                              <td className="px-4 py-3 text-[15px] text-[#454545]">{row.no}</td>
                              <td className="px-4 py-3 text-[15px] text-[#454545]">{row.date}</td>
                              <td className="px-4 py-3 text-[15px] text-[#454545]">{row.sesi}</td>
                              <td className="px-4 py-3 text-[15px] text-[#454545]">{row.mentee}</td>
                              <td className="px-4 py-3 text-[15px] text-[#454545]">{row.jumlah}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                    { q: 'Bagaimana cara mendapatkan komisi dari sesi mentoring?', a: 'Komisi akan ditambahkan ke saldo Anda setelah sesi mentoring selesai. Anda bisa melihat riwayat pembayaran di Monetisasi > Riwayat Pembayaran . Dana dapat dicairkan dengan menekan tombol "Cairkan Sekarang".' },
                    { q: 'Bagaimana cara berkomunikasi dengan mentee?', a: '' },
                    { q: 'Apa yang harus saya lakukan jika mentee tidak hadir dalam sesi?', a: '' },
                    { q: 'Bagaimana sistem penilaian atau feedback dari mentee?', a: '' },
                    { q: 'Bisakah saya mengubah informasi profil atau keterampilan?', a: '' }
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
                      {expandedFaq === i && item.a && (
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
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
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
                  <div className="col-span-3 space-y-2">
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
                  <div className="space-y-2">
                    <label className="text-[15px] font-medium text-[#454545]">Kendala yang dialami</label>
                    <input placeholder="Tulis kendala kamu" className="w-full h-[43px] px-5 border border-neutral-200 rounded-sm text-[15px] outline-none focus:border-primary-accent" />
                    <p className="text-[10px] text-[#888888]">Jelaskan secara singkat masalah yang kamu alami</p>
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
                  <p className="text-[17px] font-semibold text-[#454545] text-center">Seberapa puas anda dengan platform ini?</p>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        className="w-[124px] h-[47px] rounded-sm bg-primary-50 text-primary-accent font-semibold text-[17px] hover:bg-primary-accent hover:text-white transition-all cursor-pointer border border-primary-100"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#888888] text-center tracking-widest uppercase">1 = Sangat Tidak Puas, 5 = Sangat Puas</p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Seberapa mudah Anda menggunakan platform ini ?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                        <option>Sangat Mudah</option>
                        <option>Mudah</option>
                        <option>Cukup</option>
                        <option>Sulit</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Platform ini membantu perkembangan karier atau pembelajaran Anda?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                        <option>Sangat Terbantu</option>
                        <option>Terbantu</option>
                        <option>Cukup</option>
                        <option>Tidak Terbantu</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Apakah proses pencairan upah melalui platform ini transparan dan cepat?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Seberapa baik dukungan tim platform jika Anda mengalami kendala teknis?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Platform ini membantu perkembangan karier Anda?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[15px] font-semibold text-[#454545]">Bagian apa yang perlu kami ditingkatkan?</label>
                    <div className="relative">
                      <select className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm text-[15px] text-[#888888] outline-none bg-white cursor-pointer appearance-none">
                        <option>Placeholder</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" width="20" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-semibold text-[#454545]">Menurut pengalaman kamu, apa yang harus ditingkatkan dari platform ini?</label>
                  <textarea
                    placeholder="Deskripsi Detail Kendala"
                    className="w-full h-[140px] p-5 border border-neutral-200 rounded-sm text-[15px] text-[#454545] outline-none focus:border-primary-accent resize-none placeholder:text-[#BBBBBB]"
                  />
                  <p className="text-[10px] text-[#888888]">Deskripsikan kendala yang kamu alami secara detail dan kronologisnya</p>
                </div>

                <div className="flex justify-start">
                  <button className="h-[47px] px-10 bg-primary-accent text-white rounded-sm text-[15px] font-bold hover:opacity-90 transition-all cursor-pointer">
                    Kirim Feedback
                  </button>
                </div>
              </div>
            )}

      </div>

      {/* Two Step Auth Modals */}
      {twoStepAuthStep !== 'off' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-[430px] p-10 relative">
            <button
              onClick={() => setTwoStepAuthStep('off')}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#454545] cursor-pointer"
            >
              <Icon icon="mdi:close" width="24" />
            </button>

            {twoStepAuthStep === 'input-email' && (
              <div className="text-center space-y-6">
                <div className="w-[72px] h-[72px] bg-primary-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon icon="mdi:email-outline" width="36" className="text-primary-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[23px] font-bold text-[#454545]">Verifikasi Email</h3>
                  <p className="text-[15px] text-[#888888] leading-relaxed px-4">
                    Masukkan email kamu untuk menerima kode verifikasi OTP
                  </p>
                </div>
                <div className="space-y-4 pt-2">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    defaultValue={user?.email || ""}
                    className="w-full h-[47px] px-5 border border-neutral-200 rounded-sm bg-white text-[#454545] text-[15px] outline-none focus:border-primary-accent transition-all"
                  />
                  <button
                    onClick={() => setTwoStepAuthStep('input-otp')}
                    className="w-full h-[47px] bg-primary-accent text-white rounded-sm font-semibold text-[15px] hover:opacity-90 transition-all cursor-pointer"
                  >
                    Kirim Kode
                  </button>
                </div>
              </div>
            )}

            {twoStepAuthStep === 'input-otp' && (
              <div className="text-center space-y-6">
                <div className="w-[72px] h-[72px] bg-primary-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon icon="mdi:shield-check-outline" width="36" className="text-primary-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[23px] font-bold text-[#454545]">Masukkan Kode OTP</h3>
                  <p className="text-[15px] text-[#888888] leading-relaxed px-4">
                    Kami telah mengirimkan kode 6 digit ke email kamu
                  </p>
                </div>
                <div className="space-y-8 pt-2">
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-[52px] h-[58px] border border-neutral-200 rounded-sm text-center text-xl font-bold bg-white text-[#454545] outline-none focus:border-primary-accent transition-all"
                      />
                    ))}
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={() => setTwoStepAuthStep('done')}
                      className="w-full h-[47px] bg-primary-accent text-white rounded-sm font-semibold text-[15px] hover:opacity-90 transition-all cursor-pointer"
                    >
                      Verifikasi
                    </button>
                    <p className="text-[13px] text-[#888888]">
                      Tidak menerima kode? <button className="text-primary-accent font-semibold hover:underline cursor-pointer">Kirim ulang</button>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {twoStepAuthStep === 'done' && (
              <div className="text-center space-y-6">
                <div className="w-[72px] h-[72px] bg-success-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon icon="mdi:check-circle-outline" width="36" className="text-success-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[23px] font-bold text-[#454545]">
                    {meData?.user?.is_active ? '2FA Berhasil Dinonaktifkan!' : '2FA Berhasil Diaktifkan!'}
                  </h3>
                  <p className="text-[15px] text-[#888888] leading-relaxed px-4">
                    {meData?.user?.is_active 
                      ? 'Fitur autentikasi telah dinonaktifkan dari akun kamu.'
                      : 'Akun kamu sekarang lebih aman dengan verifikasi dua langkah.'
                    }
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setTwoStepAuthStep('off')}
                    className="w-full h-[47px] bg-primary-accent text-white rounded-sm font-semibold text-[15px] hover:opacity-90 transition-all cursor-pointer"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
