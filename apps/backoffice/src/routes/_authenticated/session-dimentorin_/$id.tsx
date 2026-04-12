import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Input, NativeSelect as Select, Textarea } from '@imphnen-frontend-service/ui/atoms'
import { cn, For } from '@imphnen-frontend-service/utils'
import { useMySessions, TSessionListItem } from '@imphnen-frontend-service/service'

const TOPICS = [
  { id: 2, icon: '\uD83C\uDFE2', name: 'Industry Insight' },
  { id: 4, icon: '\uD83D\uDDA5\uFE0F', name: 'Basic IT' },
]

const placeholder = `Hi [Nama Mentor], Saya [Nama Kamu] & saya berharap dapat memiliki sesi mentoring dengan Anda.

Saat ini, saya tertarik untuk mengejar __. Tujuan saya untuk sesi ini adalah __.

Saya ingin tahu secara khusus tentang ___.
1.Pertanyaan Anda
2. ...
3. ...`

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

export const Route = createFileRoute('/_authenticated/session-dimentorin_/$id')({
  component: SessionDetailPage,
})

function SessionDetailPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data: sessionsData, isLoading } = useMySessions()
  const session: TSessionListItem | undefined = sessionsData?.sessions?.find((s) => s.id === id)

  const statusColors: Record<string, string> = {
    pending: 'bg-warning-200 text-warning-700',
    confirmed: 'bg-primary-200 text-primary-700',
    ongoing: 'bg-warning-200 text-warning-700',
    completed: 'bg-success-200 text-success-500',
    cancelled: 'bg-danger-200 text-danger-500',
  }

  if (isLoading) {
    return (
      <main className="w-full px-[48px] py-[40px]">
        <div className="text-center py-8 text-neutral-400">Loading...</div>
      </main>
    )
  }

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/session-dimentorin' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Detail Sesi</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
            Detail Sesi
          </h2>

          <div className="grid grid-cols-9 px-9 py-7 border rounded-md gap-12 mb-10">
            <div className="col-span-4 flex items-center gap-x-12">
              <div>
                <h3 className="text-p2 font-semibold text-primary-500 mb-4">Mentor</h3>
                <div>
                  <p className="text-p3 font-semibold mb-2.5">{session?.mentor_id ?? "-"}</p>
                </div>
              </div>
            </div>

            <div className="col-span-5 flex items-center gap-12">
              <div>
                <h3 className="text-p2 font-semibold text-primary-500 mb-4">Mentee</h3>
                <div>
                  <p className="text-p3 font-semibold mb-2.5">{session?.mentee_fullname ?? "-"}</p>
                  <p className="text-neutral-600">{session?.mentee_email ?? "-"}</p>
                </div>
              </div>
              <div>
                <h3 className="text-p2 font-semibold text-neutral-700 mb-4">Status</h3>
                <div className={`py-2 px-6 rounded-md text-center capitalize font-semibold ${statusColors[session?.status ?? ``] ?? `bg-neutral-200 text-neutral-700`}`}>
                  {session?.status ?? '-'}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-p3 font-medium mb-2.5">Topics</h3>
            <div className="p-5 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-2.5 mb-8">
              {session?.topic ? (
                <div className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow font-medium">
                  <span>{session.topic}</span>
                </div>
              ) : (
                <For data={TOPICS}>
                  {(item, index) => (
                    <div
                      key={index}
                      className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow font-medium"
                    >
                      <span>{item.icon} </span>
                      <span>{item.name}</span>
                    </div>
                  )}
                </For>
              )}
            </div>

            <div className="grid gap-2.5 md:grid-cols-2 md:gap-5">
              <div>
                <label className={labelClass}>Tanggal</label>
                <Input
                  type="date"
                  className="min-w-full w-full"
                  value={session?.scheduled_at ? new Date(session.scheduled_at).toISOString().split('T')[0] : ''}
                  readOnly
                />
              </div>
              <div>
                <label className={labelClass}>Waktu</label>
                <Input
                  type="time"
                  className="min-w-full w-full"
                  value={session?.scheduled_at ? new Date(session.scheduled_at).toTimeString().slice(0, 5) : ''}
                  readOnly
                />
              </div>
              <div className="relative md:col-span-full">
                <label className={labelClass}>Tipe Sesi</label>
                <Select className="min-w-full w-full" value={session?.session_type ?? "online"} disabled>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </Select>
              </div>
              <div className="md:col-span-full">
                <label className={labelClass}>Durasi (menit)</label>
                <Input
                  type="number"
                  className="min-w-full w-full"
                  value={session?.duration_minutes ?? ''}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
