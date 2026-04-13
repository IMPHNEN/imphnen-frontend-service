import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { MentorContactModal } from './_components/modals/mentor-contact-modal'
import { MentoringFeedbackModal } from './_components/modals/mentoring-feedback-modal'
import { MentoringDetailModal } from './_components/modals/mentoring-detail-modal'

export const Route = createFileRoute('/_authenticated/dashboard/mentoring')({
  component: MentoringPage,
})

function MentoringPage() {
  const [activeModal, setActiveModal] = useState<null | 'detail' | 'contact' | 'cancel' | 'feedback'>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectedMentor, setSelectedMentor] = useState<{
    name: string
    title: string
    topics: string[]
    image: string
  } | null>(null)
  const [selectedSession, setSelectedSession] = useState<{
    date: string
    time: string
    location: string
    link: string
  } | null>(null)

  const mentoringRows = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) => ({
        no: idx + 1,
        mentorName: 'Muhammad Firdaus Oi...',
        mentorTitle: 'UI Designer at Oray orayan Studios',
        topic: 'Basic IT, Industry Ins...',
        sessionTime: '22 Maret 2025, 20:00 - 20:30 WIB',
        sessionDate: '22 Maret 2025',
        startTime: '20:00',
        endTime: '20:30',
        location: 'Online',
        link: 'https://zoom.us/j/9876543210',
        status: idx % 3 === 0 ? 'Done' : 'To do',
      })),
    [],
  )

  const handleContactMentor = (row: any) => {
    setSelectedMentor({
      name: row.mentorName,
      title: row.mentorTitle,
      topics: row.topic.split(', '),
      image: '/image/mascot-character.webp',
    })
    setActiveModal('contact')
  }

  const handleShowDetail = (row: any) => {
    setSelectedMentor({
      name: row.mentorName,
      title: row.mentorTitle,
      topics: row.topic.split(', '),
      image: '/image/mascot-character.webp',
    })
    setSelectedSession({
      date: row.sessionDate,
      time: `${row.startTime} - ${row.endTime}`,
      location: row.location,
      link: row.link,
    })
    setActiveModal('detail')
  }

  const handleShowFeedback = (row: any) => {
    setSelectedMentor({
      name: row.mentorName,
      title: row.mentorTitle,
      topics: row.topic.split(', '),
      image: '/image/mascot-character.webp',
    })
    setActiveModal('feedback')
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
                          onClick={() => handleShowFeedback(row)}
                          className={`${actionButtonBaseClass} w-full px-4 bg-primary-accent text-white`}
                        >
                          <Icon icon="lucide:search" width="12" />
                          Kirim Feedback
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleShowDetail(row)}
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

      <MentoringDetailModal
        isOpen={activeModal === 'detail' && !!selectedMentor && !!selectedSession}
        onClose={() => setActiveModal(null)}
        onContactMentor={() => setActiveModal('contact')}
        mentor={selectedMentor!}
        session={selectedSession!}
      />

      <MentoringFeedbackModal
        isOpen={activeModal === 'feedback' && !!selectedMentor}
        onClose={() => setActiveModal(null)}
        mentorName={selectedMentor?.name || ''}
      />
    </section>
  )
}
