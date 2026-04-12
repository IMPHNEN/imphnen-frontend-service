import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/_authenticated/dashboard/mentoring')({
  component: MentoringPage,
})

function MentoringPage() {
  const [activeModal, setActiveModal] = useState<null | 'detail' | 'contact' | 'feedback-1' | 'feedback-2'>(null)
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
                        <button
                          onClick={() => setActiveModal('feedback-1')}
                          className="h-7 w-[175px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[10px] font-medium cursor-pointer"
                        >
                          Kirim Feedback
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setActiveModal('detail')}
                            className="h-7 w-[84px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[10px] font-medium cursor-pointer"
                          >
                            Cek Detail
                          </button>
                          <button
                            onClick={() => setActiveModal('contact')}
                            className="h-7 w-[84px] rounded-sm bg-[#ffe8da] text-[#ff5242] text-[10px] font-medium cursor-pointer"
                          >
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

      {activeModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          {activeModal === 'detail' && (
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

                  <div className="mb-6">
                    <p className="text-[15px] font-medium text-[#454545] mb-2">Pertanyaan Untuk Senpai</p>
                    <textarea
                      readOnly
                      value={'Hi [Nama Mentor], Saya [Nama Kamu] & saya berharap dapat memiliki sesi mentoring dengan Anda.\n\nSaat ini, saya tertarik untuk mengejar __. Tujuan saya untuk sesi ini adalah __.\n\nSaya ingin tahu secara khusus tentang ___.\n1. Pertanyaan Anda\n2. ...\n3. ...'}
                      className="w-full h-[156px] rounded-sm border border-[#d1d1d1] px-3 py-2 text-xs text-[#6d6d6d] resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setActiveModal('contact')}
                    className="w-full h-[34px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[15px] font-semibold cursor-pointer"
                  >
                    Hubungi Senpai
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeModal === 'contact' && (
            <div className="w-[400px] h-[242px] rounded-[8px] bg-white px-10 py-10">
              <div className="w-[320px] mx-auto text-center">
                <h3 className="text-[23px] font-semibold text-[#23a1eb]">Hubungi Senpai Sekarang ??</h3>
                <p className="text-[15px] text-[#888888] mt-8">
                  Tekan tombol di bawah ini untuk terhubung langsung ke WhatsApp senpai kamu^^
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button className="w-[152px] h-[34px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[15px] font-semibold cursor-pointer">
                  Hubungi Senpai
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-[152px] h-[34px] rounded-sm bg-[#ffe8da] text-[#ff5242] text-[15px] font-semibold cursor-pointer"
                >
                  Nanti Deh
                </button>
              </div>
            </div>
          )}

          {activeModal === 'feedback-1' && (
            <div className="w-[520px] h-[582px] rounded-[8px] bg-white p-8 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[19px] font-semibold text-[#454545]">Feedback Mentor</h3>
                <span className="text-[15px] font-medium text-[#6d6d6d]">1 dari 2</span>
              </div>

              <p className="text-[15px] font-medium text-[#454545] mb-3">Seberapa puas kamu dengan sesi mentoring ini?</p>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} className="h-10 rounded-sm bg-primary-50 text-[15px] font-medium text-[#81cbf8] cursor-pointer">{n}</button>
                ))}
              </div>
              <p className="text-[10px] text-[#888888] mb-6">1 = Sangat Tidak Puas, 5 = Sangat Puas</p>

              <p className="text-[15px] font-medium text-[#454545] mb-3">Seberapa membantu jawaban mentor untuk kebutuhanmu?</p>
              <div className="space-y-3 mb-6">
                {['Tidak Membantu', 'Kurang Membantu', 'Cukup Membantu', 'Membantu', 'Sangat Membantu'].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-xs text-[#6d6d6d]">
                    <input type="radio" name="helpful" />
                    {item}
                  </label>
                ))}
              </div>

              <p className="text-[15px] font-medium text-[#454545] mb-3">Apakah kamu akan merekomendasikan platform ini ke rekan mu?</p>
              <div className="space-y-3 mb-8">
                {['Ya', 'Tidak', 'Mungkin'].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-xs text-[#6d6d6d]">
                    <input type="radio" name="recommend" />
                    {item}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActiveModal(null)}
                  className="h-[34px] w-[92px] rounded-sm bg-white text-[#23a1eb] text-[15px] font-semibold border border-transparent cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => setActiveModal('feedback-2')}
                  className="h-[34px] w-[92px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[15px] font-semibold cursor-pointer"
                >
                  Lanjut
                </button>
              </div>
            </div>
          )}

          {activeModal === 'feedback-2' && (
            <div className="w-[520px] h-[582px] rounded-[8px] bg-white p-8 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[19px] font-semibold text-[#454545]">Feedback Mentor</h3>
                <span className="text-[15px] font-medium text-[#6d6d6d]">2 dari 2</span>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <p className="text-[15px] font-medium text-[#454545] mb-2">Apa yang kamu suka dari sesi ini?</p>
                  <textarea className="w-full h-[76px] rounded-sm border border-[#d1d1d1] p-3 text-[15px] text-[#b0b0b0] resize-none" defaultValue="Hal apa yang menurutmu paling membantu atau berkesan dari sesi tadi?" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-[#454545] mb-2">Apa yang bisa ditingkatkan oleh mentor?</p>
                  <textarea className="w-full h-[76px] rounded-sm border border-[#d1d1d1] p-3 text-[15px] text-[#b0b0b0] resize-none" defaultValue="Ada saran atau masukan yang bisa membantu mentor lebih baik di sesi berikutnya?" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-[#454545] mb-2">Testimoni atau ucapan terima kasih untuk mentor</p>
                  <textarea className="w-full h-[76px] rounded-sm border border-[#d1d1d1] p-3 text-[15px] text-[#b0b0b0] resize-none" defaultValue="Kamu juga bisa tulis pesan singkat atau ucapan ke mentor di sini (opsional)" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActiveModal('feedback-1')}
                  className="h-[34px] w-[100px] rounded-sm bg-white text-[#23a1eb] text-[15px] font-semibold cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="h-[34px] w-[100px] rounded-sm bg-[#23a1eb] text-[#f6f6f6] text-[15px] font-semibold cursor-pointer"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
