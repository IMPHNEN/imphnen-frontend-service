import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select } from '@imphnen-frontend-service/ui/atoms'
import { BackofficeWrapper, DataTable } from '@imphnen-frontend-service/ui/organisms'
import { cn } from '@imphnen-frontend-service/utils'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from '@tanstack/react-table'
import { ReactElement, useState } from 'react'
import { useMySessions, TSessionListItem } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/session-dimentorin')({
  component: SessionDimentorinPage,
})

function SessionDimentorinPage(): ReactElement {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('')

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const { data: sessionsData, isLoading } = useMySessions(
    statusFilter ? { status: statusFilter } : undefined
  )

  const sessions: TSessionListItem[] = sessionsData?.sessions ?? []
  const totalItems = sessionsData?.total ?? sessions.length

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
      id: 'id',
      header: 'ID Sesi',
      accessorKey: 'id',
    },
    {
      id: 'mentorId',
      header: 'Nama Mentor',
      accessorKey: 'mentor_id',
    },
    {
      id: 'menteeName',
      header: 'Nama Mentee',
      accessorKey: 'mentee_fullname',
    },
    {
      id: 'datetime',
      header: 'Waktu',
      accessorKey: 'scheduled_at',
      cell: ({ row }) => (
        <span>{new Date(row.original.scheduled_at).toLocaleString('id-ID')}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status
        const statusColors: Record<string, string> = {
          pending: 'bg-warning-200 text-warning-700',
          confirmed: 'bg-primary-200 text-primary-700',
          ongoing: 'bg-warning-200 text-warning-700',
          completed: 'bg-success-200 text-success-500',
          cancelled: 'bg-danger-200 text-danger-500',
        }
        return (
          <div className={`py-2 px-4 rounded-md text-center capitalize ${statusColors[status] ?? 'bg-neutral-200 text-neutral-700'}`}>
            {status}
          </div>
        )
      },
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-52') },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate({ to: '/session-dimentorin/$id', params: { id: row.original.id } })
          }}
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Cek Detail
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
      <h1 className="text-p1 font-semibold text-neutral-700 mb-8">Session Management</h1>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        <div className="flex justify-between items-center gap-5 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan nama lengkap"
              className="pl-12 w-full max-h-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="ongoing">On Going</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-400">Loading...</div>
        ) : (
          <DataTable data={sessions} columns={columns} table={table} />
        )}
      </section>
    </BackofficeWrapper>
  )
}
