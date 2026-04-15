import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_authenticated/dashboard/learning-path')({
  component: LearningPathPage,
})

function LearningPathPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'roadmap' | 'article'>('roadmap')
  const [isSubmitArticlePopupOpen, setIsSubmitArticlePopupOpen] = useState(false)
  const [selectedArticles, setSelectedArticles] = useState<number[]>([])

  const handleEditArticle = () => {
    navigate({ to: '/dashboard/article-builder' })
  }

  const toggleSelectArticle = (no: number) => {
    setSelectedArticles((prev) => (prev.includes(no) ? prev.filter((id) => id !== no) : [...prev, no]))
  }

  return (
    <section className="w-[972px]">
      <div className="mb-6 inline-flex items-center gap-2 rounded-sm bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`h-8 px-4 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'roadmap' ? 'bg-primary-accent text-white shadow-sm' : 'text-text-label hover:bg-primary-50'
          }`}
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('article')}
          className={`h-8 px-4 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'article' ? 'bg-primary-accent text-white shadow-sm' : 'text-text-label hover:bg-primary-50'
          }`}
        >
          Article
        </button>
      </div>

      {activeTab === 'roadmap' && (
        <div className="w-full bg-white rounded-sm shadow-sm p-8">
          <h2 className="text-[19px] font-semibold text-text-label mb-2">Roadmap Kamu</h2>
          <p className="text-[15px] font-medium text-primary-accent mb-6">Front-end Basic</p>

          <div className="space-y-4">
            <article className="border border-border-light rounded-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-semibold text-text-label">Day 1 - Materi A</h3>
                <span className="text-xs text-text-muted">1 / 3 diselesaikan</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">1. Submateri 1</span>
                  <span className="h-6 px-3 flex items-center justify-center rounded-sm bg-[#cde6dd] text-[10px] font-semibold text-[#2f7c66]">
                    Done
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">2. Submateri 2</span>
                  <span className="h-6 px-3 flex items-center justify-center rounded-sm bg-[#bce1fb] text-[10px] font-semibold text-[#23a1eb]">
                    To do
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">3. Tugas : Membuat Artikel</span>
                  <span className="h-6 px-3 flex items-center justify-center rounded-sm bg-[#bce1fb] text-[10px] font-semibold text-[#23a1eb]">
                    To do
                  </span>
                </div>
              </div>
            </article>

            {['Day 2 - Materi B', 'Day 3 - Materi C', 'Day 4 - Materi D', 'Day 5 - Materi E'].map((day) => (
              <article key={day} className="border border-border-light rounded-sm p-4 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-text-label">{day}</h3>
                <span className="text-xs font-medium text-[#ff7a00]">Selesaikan materi sebelumnya</span>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'article' && (
        <div className="w-full bg-white rounded-sm shadow-sm p-6">
          <div className="mb-4 relative">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder" width="16" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama item"
              className="w-full h-[43px] border border-border-light rounded-sm pl-10 pr-3 text-[15px] text-text-label placeholder:text-placeholder focus:outline-none focus:border-primary-accent"
            />
          </div>

          <div className="overflow-hidden rounded-sm border border-border-light">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-50">
                  <th className="px-4 py-3 text-left w-10">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-light text-primary-accent" />
                  </th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">No.</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Judul Artikel</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Materi</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3 text-center">Status</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Submit Date</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, judul: 'How to install linux dist..', materi: 'Day 1', status: 'Done', date: '22 Maret 2025, 20:30 WIB' },
                  { no: 2, judul: 'How to install linux dist..', materi: 'Day 2', status: 'On Progress', date: '-' },
                ].map((row) => (
                  <tr key={row.no} className={`border-t border-neutral-100 ${row.no % 2 === 0 ? 'bg-primary-50' : 'bg-white'}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(row.no)}
                        onChange={() => toggleSelectArticle(row.no)}
                        className="w-4 h-4 rounded border-border-light text-primary-accent"
                      />
                    </td>
                    <td className="text-xs text-text-muted px-4 py-3">{row.no}.</td>
                    <td className="text-xs text-text-muted px-4 py-3">{row.judul}</td>
                    <td className="text-xs text-text-muted px-4 py-3">{row.materi}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`h-6 px-3 inline-flex items-center justify-center rounded-sm text-[10px] font-semibold ${
                          row.status === 'Done' ? 'bg-[#cde6dd] text-[#2f7c66]' : 'bg-[#fef39b] text-[#d7a20f]'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="text-xs text-text-muted px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={handleEditArticle}
                          className="h-7 w-[84px] rounded-sm bg-[#fef39b] text-[#d7a20f] text-[10px] font-semibold cursor-pointer flex items-center justify-center gap-1 hover:opacity-90 transition-all"
                        >
                          <Icon icon="mdi:pencil" width="12" />
                          Edit
                        </button>
                        <button className="h-7 w-[100px] rounded-sm bg-primary-accent text-white text-[10px] font-semibold cursor-pointer flex items-center justify-center gap-1 hover:opacity-90 transition-all">
                          <Icon icon="lucide:search" width="12" />
                          Cek Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button className="flex items-center gap-2 text-[10px] font-semibold text-text-muted hover:text-primary-accent transition-colors">
              <Icon icon="mdi:chevron-left" width="16" />
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, '...', 7, 8, 9, 10].map((page, idx) => (
                <button
                  key={idx}
                  className={`h-7 min-w-7 px-2 rounded-sm text-[10px] font-semibold cursor-pointer transition-all ${
                    page === 1 ? 'bg-primary-accent text-white' : 'bg-[#e1f0fd] text-primary-accent hover:bg-primary-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 text-[10px] font-semibold text-text-muted hover:text-primary-accent transition-colors">
              <Icon icon="mdi:chevron-right" width="16" />
            </button>
          </div>
        </div>
      )}

      {isSubmitArticlePopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-[400px] h-[288px] rounded-[8px] bg-white px-10 py-10">
            <div className="w-[320px] mx-auto text-center">
              <h3 className="text-[23px] font-semibold text-[#23a1eb]">Apakah Kamu Sudah Yakin?</h3>
              <p className="text-[15px] text-[#888888] mt-8">
                Pastikan isi artikel sudah sesuai dengan ketentuan^^, artikel yang sudah disubmit tidak dapat diedit
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setIsSubmitArticlePopupOpen(false)}
                className="w-[152px] h-[34px] rounded-sm bg-white text-[#23a1eb] text-[15px] font-semibold cursor-pointer"
              >
                Nanti Deh
              </button>

              <button
                onClick={() => setIsSubmitArticlePopupOpen(false)}
                className="w-[152px] h-[34px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[15px] font-semibold cursor-pointer"
              >
                Sumbit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
