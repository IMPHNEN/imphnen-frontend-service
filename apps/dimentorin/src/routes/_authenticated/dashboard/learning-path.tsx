import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/dashboard/learning-path')({
  component: LearningPathPage,
})

function LearningPathPage() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'article'>('roadmap')

  return (
    <section className="w-[972px]">
      <div className="mb-6 inline-flex items-center gap-2 rounded-sm bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`h-8 px-4 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'roadmap' ? 'bg-primary-accent text-white' : 'text-text-label hover:bg-primary-50'
          }`}
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('article')}
          className={`h-8 px-4 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'article' ? 'bg-primary-accent text-white' : 'text-text-label hover:bg-primary-50'
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
                  <span className="text-[10px] font-semibold text-success-600">Done</span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">2. Submateri 2</span>
                  <span className="text-[10px] font-semibold text-primary-accent">To do</span>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">3. Tugas : Membuat Artikel</span>
                  <span className="text-[10px] font-semibold text-primary-accent">To do</span>
                </div>
              </div>
            </article>

            {['Day 2 - Materi B', 'Day 3 - Materi C', 'Day 4 - Materi D', 'Day 5 - Materi E'].map((day) => (
              <article key={day} className="border border-border-light rounded-sm p-4 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-text-label">{day}</h3>
                <span className="text-xs text-text-muted">Selesaikan materi sebelumnya</span>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'article' && (
        <div className="w-full bg-white rounded-sm shadow-sm p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan nama item"
              className="w-[320px] h-[34px] border border-border-light rounded-sm px-3 text-[15px] text-text-label placeholder:text-placeholder focus:outline-none focus:border-primary-accent"
            />
          </div>

          <div className="overflow-hidden rounded-sm border border-border-light">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-50">
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">No.</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Judul Artikel</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Materi</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Submit Date</th>
                  <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-neutral-100">
                  <td className="text-xs text-text-muted px-4 py-3">1</td>
                  <td className="text-xs text-text-muted px-4 py-3">How to install linux dist..</td>
                  <td className="text-xs text-text-muted px-4 py-3">Day 1</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-semibold text-success-600">Done</span></td>
                  <td className="text-xs text-text-muted px-4 py-3">22 Maret 2025, 20:30 WIB</td>
                  <td className="px-4 py-3">
                    <button className="h-7 px-2 rounded-sm border border-border-light text-text-label text-[10px] font-semibold cursor-pointer">View</button>
                  </td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="text-xs text-text-muted px-4 py-3">2.</td>
                  <td className="text-xs text-text-muted px-4 py-3">How to install linux dist..</td>
                  <td className="text-xs text-text-muted px-4 py-3">Day 2</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-semibold text-primary-accent">On Progress</span></td>
                  <td className="text-xs text-text-muted px-4 py-3">-</td>
                  <td className="px-4 py-3">
                    <button className="h-7 px-2 rounded-sm border border-primary-accent text-primary-accent text-[10px] font-semibold cursor-pointer">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
