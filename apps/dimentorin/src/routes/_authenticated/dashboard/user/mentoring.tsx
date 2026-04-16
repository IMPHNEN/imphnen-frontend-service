import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { Badge, Button, Card, Checkbox, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@imphnen-frontend-service/ui/atoms'
import { MentorContactModal } from '../_components/modals/mentor-contact-modal'
import { MentoringFeedbackModal } from '../_components/modals/mentoring-feedback-modal'
import { MentoringDetailModal } from '../_components/modals/mentoring-detail-modal'

export const Route = createFileRoute('/_authenticated/dashboard/user/mentoring')({
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

  return (
    <section className="w-243">
      <Card className="w-full p-6">
        <div className="mb-4 relative">
          <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder" width="16" />
          <Input type="text" size="lg" placeholder="Cari berdasarkan nama item" className="pl-10" />
        </div>

        <div className="overflow-hidden rounded-sm border border-border-light">
          <Table>
            <TableHeader className="bg-primary-50">
              <TableRow>
                <TableHead className="w-10"><Checkbox /></TableHead>
                <TableHead>No.</TableHead>
                <TableHead>Nama Mentor</TableHead>
                <TableHead>Topik</TableHead>
                <TableHead>Sesi Mentoring</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedRows.map((row) => (
                <TableRow key={row.no} className={row.no % 2 === 0 ? 'bg-primary-50' : 'bg-white'}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.no)}
                      onCheckedChange={() => toggleSelectRow(row.no)}
                    />
                  </TableCell>
                  <TableCell className="text-xs text-text-muted">{row.no}.</TableCell>
                  <TableCell className="text-xs text-text-muted">{row.mentorName}</TableCell>
                  <TableCell className="text-xs text-text-muted">{row.topic}</TableCell>
                  <TableCell className="text-xs text-text-muted">{row.sessionTime}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={row.status === 'Done' ? 'success' : 'info'}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="mx-auto flex w-50 items-center justify-center gap-2">
                      {row.status === 'Done' ? (
                        <Button
                          onClick={() => handleShowFeedback(row)}
                          size="sm"
                        >
                          <Icon icon="lucide:search" width="12" />
                          Kirim Feedback
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleShowDetail(row)}
                            size="sm"
                          >
                            <Icon icon="lucide:search" width="12" />
                            Cek Detail
                          </Button>
                          <Button
                            onClick={() => handleContactMentor(row)}
                            variant="danger"
                            size="sm"
                          >
                            <Icon icon="lucide:x" width="12" />
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                    isActive ? 'bg-primary-accent text-white' : 'bg-primary-100 text-primary-accent hover:bg-primary-100'
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
      </Card>

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
