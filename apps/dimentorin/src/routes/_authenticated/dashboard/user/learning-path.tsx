import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  SegmentedSwitch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@imphnen-frontend-service/ui/atoms'

export const Route = createFileRoute('/_authenticated/dashboard/user/learning-path')({
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

  const isArticleTab = activeTab === 'article'

  return (
    <section className="w-243">
      <div className="mb-6">
        <SegmentedSwitch
          value={activeTab}
          onChange={(nextValue) => setActiveTab(nextValue as 'roadmap' | 'article')}
          options={[
            { value: 'roadmap', label: 'Roadmap' },
            { value: 'article', label: 'Article' },
          ]}
        />
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
                  <Badge variant="success">Done</Badge>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">2. Submateri 2</span>
                  <Badge variant="info">To do</Badge>
                </div>
                <div className="flex items-center justify-between rounded-sm bg-primary-50 px-3 py-2">
                  <span className="text-xs text-text-label">3. Tugas : Membuat Artikel</span>
                  <Badge variant="info">To do</Badge>
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
                  <TableHead>Judul Artikel</TableHead>
                  <TableHead>Materi</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Submit Date</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { no: 1, judul: 'How to install linux dist..', materi: 'Day 1', status: 'Done', date: '22 Maret 2025, 20:30 WIB' },
                  { no: 2, judul: 'How to install linux dist..', materi: 'Day 2', status: 'On Progress', date: '-' },
                ].map((row) => (
                  <TableRow key={row.no} className={row.no % 2 === 0 ? 'bg-primary-50' : 'bg-white'}>
                    <TableCell>
                      <Checkbox
                        checked={selectedArticles.includes(row.no)}
                        onCheckedChange={() => toggleSelectArticle(row.no)}
                      />
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">{row.no}.</TableCell>
                    <TableCell className="text-xs text-text-muted">{row.judul}</TableCell>
                    <TableCell className="text-xs text-text-muted">{row.materi}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={row.status === 'Done' ? 'success' : 'warning'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">{row.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={handleEditArticle}
                          variant="secondary"
                          size="sm"
                        >
                          <Icon icon="mdi:pencil" width="12" />
                          Edit
                        </Button>
                        <Button size="sm">
                          <Icon icon="lucide:search" width="12" />
                          Cek Detail
                        </Button>
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
              {[1, 2, 3, 4, '...', 7, 8, 9, 10].map((page, idx) => (
                <button
                  key={idx}
                  className={`h-7 min-w-7 px-2 rounded-sm text-[10px] font-semibold cursor-pointer transition-all ${
                    page === 1 ? 'bg-primary-accent text-white' : 'bg-primary-100 text-primary-accent hover:bg-primary-100'
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
        </Card>
      )}

      {isSubmitArticlePopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-100 h-72 rounded-lg bg-white px-10 py-10">
            <div className="w-[320px] mx-auto text-center">
              <h3 className="text-[23px] font-semibold text-primary-accent">Apakah Kamu Sudah Yakin?</h3>
              <p className="text-[15px] text-text-muted mt-8">
                Pastikan isi artikel sudah sesuai dengan ketentuan^^, artikel yang sudah disubmit tidak dapat diedit
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setIsSubmitArticlePopupOpen(false)}
                className="w-38 h-8.5 rounded-sm bg-white text-primary-accent text-[15px] font-semibold cursor-pointer"
              >
                Nanti Deh
              </button>

              <button
                onClick={() => setIsSubmitArticlePopupOpen(false)}
                className="w-38 h-8.5 rounded-sm bg-primary-accent text-bg-hover text-[15px] font-semibold cursor-pointer"
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
