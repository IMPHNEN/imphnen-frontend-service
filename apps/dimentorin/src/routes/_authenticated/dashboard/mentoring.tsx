import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/_authenticated/dashboard/mentoring')({
  component: MentoringPage,
})

function MentoringPage() {
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
    <section className="w-[972px]">
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
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Nama Mentor</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Topik</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Sesi Mentoring</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((row) => (
                <tr key={row.no} className={`border-t border-neutral-100 ${row.no % 2 === 0 ? 'bg-primary-50' : 'bg-white'}`}>
                  <td className="text-xs text-text-muted px-4 py-3">{row.no}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.mentorName}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.topic}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{row.sessionTime}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold ${row.status === 'Done' ? 'text-success-600' : 'text-primary-accent'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {row.status === 'Done' ? (
                        <button className="h-7 w-[175px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[10px] font-medium cursor-pointer">
                          Kirim Feedback
                        </button>
                      ) : (
                        <>
                          <button className="h-7 w-[84px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[10px] font-medium cursor-pointer">
                            Cek Detail
                          </button>
                          <button className="h-7 w-[84px] rounded-sm bg-[#ffe8da] text-[#ff5242] text-[10px] font-medium cursor-pointer">
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

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Menampilkan {(currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, mentoringRows.length)} dari {mentoringRows.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-7 px-2 rounded-sm border border-border-light text-[10px] font-semibold text-text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1
              const isActive = page === currentPage

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`h-7 min-w-7 px-2 rounded-sm border text-[10px] font-semibold cursor-pointer ${
                    isActive
                      ? 'border-primary-accent bg-primary-accent text-white'
                      : 'border-border-light text-text-label'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-7 px-2 rounded-sm border border-border-light text-[10px] font-semibold text-text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
