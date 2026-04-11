import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select } from '@imphnen-frontend-service/ui/atoms'
import { BackofficeWrapper, DataTable } from '@imphnen-frontend-service/ui/organisms'
import { cn } from '@imphnen-frontend-service/utils'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRoadmapList, useDeleteRoadmap, TRoadmapListItem, TRoadmapStatus } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/roadmap-dimentorin')({
  component: RoadmapDimentorinPage,
})

function RoadmapDimentorinPage(): React.ReactElement {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const { data: roadmapData, isLoading } = useRoadmapList()
  const deleteRoadmap = useDeleteRoadmap()

  const allItems: TRoadmapListItem[] = roadmapData ?? []
  const filteredItems = allItems.filter((item) => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteRoadmap.mutateAsync(id)
      toast.success('Roadmap berhasil dihapus')
      setDeletingId(null)
    } catch (error) {
      console.log(error)
      toast.error('Gagal menghapus roadmap')
    }
  }

  const statusColors: Record<TRoadmapStatus, string> = {
    upcoming: 'bg-warning-200 text-warning-700',
    in_progress: 'bg-primary-200 text-primary-700',
    completed: 'bg-success-200 text-success-500',
  }

  const statusText: Record<TRoadmapStatus, string> = {
    upcoming: 'Upcoming',
    in_progress: 'In Progress',
    completed: 'Completed',
  }

  const columns: ColumnDef<TRoadmapListItem>[] = [
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
      id: 'title',
      header: 'Title',
      accessorKey: 'title',
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: ({ row }) => (
        <span className="line-clamp-2">{row.original.description}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className={`py-2 px-4 rounded-md text-center ${statusColors[status] ?? 'bg-neutral-200 text-neutral-700'}`}>
            {statusText[status] ?? status}
          </div>
        )
      },
    },
    {
      id: 'votes',
      header: 'Votes',
      accessorKey: 'votes',
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-72') },
      cell: ({ row }) => (
        <div className="flex gap-[8px]">
          {deletingId === row.original.id ? (
            <>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(row.original.id)
                }}
                className="flex items-center gap-2"
              >
                Konfirmasi
              </Button>
              <Button
                variant="bordered"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeletingId(null)
                }}
                className="flex items-center gap-2"
              >
                Batal
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate({ to: '/roadmap-dimentorin/$id', params: { id: row.original.id } })
                }}
                className="flex items-center gap-2"
              >
                <EditOutlined /> Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeletingId(row.original.id)
                }}
                className="flex items-center gap-2"
              >
                <DeleteOutlined /> Delete
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredItems,
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
    pageCount: Math.ceil(filteredItems.length / pagination.pageSize),
    manualPagination: false,
  })

  return (
    <BackofficeWrapper title="Dimentorin.dev">
      <h1 className="text-p1 font-semibold text-neutral-700 mb-8">Content & Roadmap</h1>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        <div className="flex items-center justify-between mb-9">
          <h2 className="text-p2 font-semibold text-neutral-600">AI Roadmaps</h2>
          <Button
            type="button"
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => navigate({ to: '/roadmap-dimentorin/create' })}
          >
            <PlusOutlined /> Buat Roadmap
          </Button>
        </div>

        <div className="flex justify-between items-center gap-5 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan judul roadmap"
              className="pl-12 w-full max-h-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Semua Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-400">Loading...</div>
        ) : (
          <DataTable data={filteredItems} columns={columns} table={table} />
        )}
      </section>
    </BackofficeWrapper>
  )
}
