import { createFileRoute } from '@tanstack/react-router'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select } from '@imphnen-frontend-service/ui/atoms'
import { BackofficeWrapper, DataTable } from '@imphnen-frontend-service/ui/organisms'
import { cn, For } from '@imphnen-frontend-service/utils'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from '@tanstack/react-table'
import { ReactElement, useState } from 'react'
import { useMySessions, TSessionListItem } from '@imphnen-frontend-service/service'

const TABS = {
  MENTORING: 'Mentoring',
  PLATFORM: 'Platform'
} as const
type Tabs = typeof TABS[keyof typeof TABS]

export const Route = createFileRoute('/_authenticated/feedback-review-dimentorin')({
  component: FeedbackReviewDimentorinPage,
})

function FeedbackReviewDimentorinPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tabs>(TABS.MENTORING)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const { data: sessionsData, isLoading } = useMySessions(
    activeTab === TABS.MENTORING ? { status: 'completed' } : undefined
  )

  const sessions: TSessionListItem[] = activeTab === TABS.MENTORING
    ? (sessionsData?.sessions ?? [])
    : []
  const totalItems = activeTab === TABS.MENTORING
    ? (sessionsData?.total ?? sessions.length)
    : 0

  const columns: ColumnDef<TSessionListItem>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn('w-20') },
      header: ({ table }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'mentee_fullname',
      cell: ({ row }) => <span>{row.original.mentee_fullname ?? '-'}</span>,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'mentee_email',
      cell: ({ row }) => <span>{row.original.mentee_email ?? '-'}</span>,
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
      cell: ({ row }) => <span>{row.original.rating ?? '-'}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const hasRating = !!row.original.rating
        return (
          <div className={`py-2 px-4 rounded-md text-center ${hasRating ? 'bg-success-200 text-success-500' : 'bg-primary-200 text-primary-500'}`}>
            {hasRating ? 'Done' : 'To Do'}
          </div>
        )
      },
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-72') },
      cell: () => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Lihat Feedback
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: sessions,
    columns,
    state: {
      pagination,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    manualPagination: true,
  })

  return (
    <BackofficeWrapper title="Dimentorin.dev">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-p1 font-semibold text-neutral-700">Feedback</h1>
        <div className="flex gap-2 bg-primary-100 p-1.5 rounded-md">
          <For data={Object.values(TABS)}>
            {(tab) => (
              <Button
                key={tab}
                variant="text"
                className={cn('px-3 py-2 capitalize', activeTab === tab && 'bg-white')}
                onClick={() => {
                  setActiveTab(tab)
                  setPagination((p) => ({ ...p, pageIndex: 0 }))
                }}
              >
                {tab}
              </Button>
            )}
          </For>
        </div>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        <div className="flex justify-between items-center gap-5 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan nama mentor/mentee"
              className="pl-12 w-full max-h-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
          <Select>
            <option disabled>Rating</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </Select>
          <Select>
            <option disabled>Status</option>
            <option value="done">Done</option>
            <option value="todo">To Do</option>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-400">Loading...</div>
        ) : activeTab === TABS.PLATFORM ? (
          <div className="text-center py-8 text-neutral-400">
            Platform feedback tidak tersedia
          </div>
        ) : (
          <DataTable data={sessions} columns={columns} table={table} />
        )}
      </section>
    </BackofficeWrapper>
  )
}
