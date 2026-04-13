import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { MentorContactModal } from './_components/modals/mentor-contact-modal'

export const Route = createFileRoute('/_authenticated/dashboard/mentoring')({
  component: MentoringPage,
})

function MentoringPage() {
  const [activeModal, setActiveModal] = useState<null | 'detail' | 'contact' | 'cancel' | 'feedback-1' | 'feedback-2'>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectedMentor, setSelectedMentor] = useState<{ name: string; topics: string[] } | null>(null)

  const mentoringRows = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) => ({
        no: idx + 1,
        mentorName: 'Muhammad Firdaus Oi...',
        topic: 'Basic IT, Industry Ins...',
        sessionTime: '22 Maret 2025, 20:00 - 20:30 WIB',
        status: idx % 3 === 0 ? 'Done' : 'To do',
      })),
    [],
  )

  const handleContactMentor = (row: any) => {
    setSelectedMentor({
      name: row.mentorName,
      topics: row.topic.split(', '),
    })
    setActiveModal('contact')
  }

  const toggleSelectRow = (no: number) => {
    setSelectedRows((prev) => (prev.includes(no) ? prev.filter((id) => id !== no) : [...prev, no]))
  }

  const rowsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(mentoringRows.length / rowsPerPage))

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return mentoringRows.slice(start, start + rowsPerPage)
  }, [currentPage, mentoringRows])

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const actionButtonBaseClass =
    'h-7 rounded-sm px-1 text-[10px] font-medium leading-none text-center whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1 transition-all hover:opacity-90'

  return (
    <section className="w-[972px]">
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
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Nama Mentor</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Topik</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Sesi Mentoring</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-text-label min-w-[220px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((row) => (
                <tr key={row.no} className={`border-t border-neutral-100 ${row.no % 2 === 0 ? 'bg-primary-50' : 'bg-white'}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.no)}
                      onChange={() => toggleSelectRow(row.no)}
                      className="w-4 h-4 rounded border-border-light text-primary-accent"
                    />
                  </td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.no}.</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.mentorName}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.topic}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.sessionTime}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`h-6 px-3 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-[10px] font-semibold ${
                        row.status === 'Done' ? 'bg-[#cde6dd] text-[#2f7c66]' : 'bg-[#bce1fb] text-[#23a1eb]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="mx-auto flex w-[200px] items-center justify-center gap-2">
                      {row.status === 'Done' ? (
                        <button
                          onClick={() => setActiveModal('feedback-1')}
                          className={`${actionButtonBaseClass} w-full px-4 bg-primary-accent text-white`}
                        >
                          <Icon icon="lucide:search" width="12" />
                          Kirim Feedback
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setActiveModal('detail')}
                            className={`${actionButtonBaseClass} flex-1 min-w-[90px] bg-primary-accent text-white`}
                          >
                            <Icon icon="lucide:search" width="12" />
                            Cek Detail
                          </button>
                          <button
                            onClick={() => handleContactMentor(row)}
                            className={`${actionButtonBaseClass} flex-1 min-w-[90px] bg-[#ffe8da] text-[#ff5242]`}
                          >
                            <Icon icon="lucide:x" width="12" />
                            Cancel
                          </button>
                        </>
                      )}
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
            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1
              const isActive = page === currentPage

              // Logic to show page numbers with ellipsis (simplified for now)
              if (totalPages > 7) {
                if (page > 4 && page < totalPages - 2 && page !== currentPage) {
                  if (page === 5) return <span key="ellipsis" className="text-text-muted">...</span>
                  return null
                }
              }

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`h-7 min-w-7 px-2 rounded-sm text-[10px] font-semibold cursor-pointer transition-all ${
                    isActive ? 'bg-primary-accent text-white' : 'bg-[#e1f0fd] text-primary-accent hover:bg-primary-100'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          <button className="flex items-center gap-2 text-[10px] font-semibold text-text-muted hover:text-primary-accent transition-colors">
            <Icon icon="mdi:chevron-right" width="16" />
          </button>
        </div>
      </div>

      <MentorContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        mentor={selectedMentor}
      />

      {activeModal === 'detail' && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-[800px] h-[732px] rounded-[8px] bg-white p-12 overflow-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[23px] font-semibold text-[#23a1eb]">Detail Sesi Mentoring</h2>
              <button className="text-[#888888] text-xl cursor-pointer" onClick={() => setActiveModal(null)}>
                x
              </button>
            </div>

            <div className="grid grid-cols-[306px_1fr] gap-8">
              <div>
                <h3 className="text-[23px] font-semibold text-[#23a1eb] mb-8">Your Senpai</h3>
                <div className="text-center">
                  <img src="/image/mascot-character.webp" alt="Mentor" className="w-[180px] h-[217px] object-cover mx-auto mb-8" />
                  <p className="text-[19px] font-semibold text-[#454545] leading-tight">
                    Muhammad
                    <br />
                    Firdaus Oi Oi Oi, S.H., M.H.
                  </p>
                  <p className="text-[15px] text-[#6d6d6d] mt-2">UI Designer at Oray orayan Studios</p>
                </div>
              </div>

              <div>
                <p className="text-[15px] font-medium text-[#454545] mb-3">Topics</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-7 px-4 rounded-full bg-primary-50 text-[10px] font-medium text-[#6d6d6d] inline-flex items-center">
                    Industry Insight
                  </span>
                  <span className="h-7 px-4 rounded-full bg-primary-50 text-[10px] font-medium text-[#6d6d6d] inline-flex items-center">
                    Basic IT
                  </span>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <p className="text-[15px] font-medium text-[#454545] mb-2">Tanggal</p>
                    <input readOnly value="22 Maret 2025" className="w-full h-[34px] rounded-sm border border-[#d1d1d1] px-5 text-[15px] text-[#6d6d6d]" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#454545] mb-2">Waktu</p>
                    <input readOnly value="20:00 - 20:30" className="w-full h-[34px] rounded-sm border border-[#d1d1d1] px-5 text-[15px] text-[#6d6d6d]" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#454545] mb-2">Lokasi</p>
                    <input readOnly value="Online" className="w-full h-[34px] rounded-sm border border-[#d1d1d1] px-5 text-[15px] text-[#6d6d6d]" />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[15px] font-medium text-[#454545] mb-2">Link Sesi Mentoring</p>
                  <div className="flex items-center gap-2">
                    <input readOnly value="https://zoom.us/j/9876543210" className="flex-1 h-[34px] rounded-sm border border-[#d1d1d1] px-5 text-[15px] text-[#23a1eb] underline" />
                    <button className="h-8 px-4 bg-primary-accent text-white rounded-sm text-xs font-semibold cursor-pointer">Copy</button>
                  </div>
                </div>

                <button
                  onClick={() => handleContactMentor({ mentorName: 'Muhammad Firdaus Oi...', topic: 'Industry Insight, Basic IT' })}
                  className="w-full h-[43px] rounded-sm bg-primary-accent text-white text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:message-outline" width="20" />
                  Hubungi Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'feedback-1' && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-[400px] rounded-[8px] bg-white p-8">
            <h3 className="text-xl font-bold text-[#23a1eb] mb-4 text-center">Beri Feedback</h3>
            <p className="text-sm text-gray-500 mb-6 text-center">Bagaimana sesi mentoring kamu bersama Muhammad Firdaus?</p>
            <div className="flex justify-between mb-8 px-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} className="text-gray-300 hover:text-yellow-400 cursor-pointer">
                  <Icon icon="mdi:star" width="32" />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Tulis pesan untuk mentor kamu..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg mb-6 resize-none outline-none focus:border-primary-accent"
            />
            <div className="flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium">Batal</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-2 rounded-lg bg-primary-accent text-white font-medium">Kirim</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
