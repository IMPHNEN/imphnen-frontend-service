import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_authenticated/dashboard/faq')({
  component: FAQPage,
})

const faqs = [
  {
    category: 'Akun & Profil',
    items: [
      { q: 'Bagaimana cara mengubah foto profil?', a: 'Kamu bisa mengubah foto profil melalui menu Profile > Edit Profile.' },
      { q: 'Bagaimana cara mengaktifkan 2FA?', a: 'Buka menu Settings > Privacy & Security dan pilih Enable pada Two-Factor Authentication.' },
    ]
  },
  {
    category: 'Mentoring',
    items: [
      { q: 'Bagaimana cara memesan sesi mentoring?', a: 'Cari mentor yang sesuai di menu Mentoring, pilih jadwal yang tersedia, dan selesaikan pembayaran.' },
      { q: 'Bisakah saya membatalkan sesi mentoring?', a: 'Ya, pembatalan bisa dilakukan minimal 24 jam sebelum sesi dimulai melalui menu Mentoring.' },
    ]
  },
  {
    category: 'Learning Path',
    items: [
      { q: 'Apa itu Roadmap Discovery?', a: 'Fitur berbasis AI untuk membantu kamu membuat jalur belajar (roadmap) sesuai dengan tujuan karirmu.' },
      { q: 'Bagaimana cara submit artikel tugas?', a: 'Di menu Learning Path, pilih tab Article, lalu klik tombol Submit pada materi yang bersangkutan.' },
    ]
  }
]

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedIndex(expandedIndex === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pusat Bantuan & FAQ</h1>
        <p className="text-gray-600 mb-8 text-lg">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
        
        <div className="relative max-w-2xl mx-auto">
          <Icon icon="mdi:magnify" width="24" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pertanyaan kamu di sini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg"
          />
        </div>
      </div>

      <div className="space-y-12">
        {faqs.map((cat, catIdx) => (
          <div key={catIdx}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary-500 rounded-full" />
              {cat.category}
            </h2>
            <div className="space-y-4">
              {cat.items.map((item, itemIdx) => {
                const id = `${catIdx}-${itemIdx}`
                const isExpanded = expandedIndex === id
                return (
                  <div key={itemIdx} className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-gray-800 text-lg">{item.q}</span>
                      <Icon
                        icon="mdi:chevron-down"
                        width="24"
                        className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-primary-50 rounded-3xl text-center">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">Masih punya pertanyaan?</h3>
        <p className="text-primary-700 mb-6 text-lg">Tim kami siap membantu kamu kapan saja</p>
        <button className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 cursor-pointer">
          Hubungi Dukungan
        </button>
      </div>
    </div>
  )
}
