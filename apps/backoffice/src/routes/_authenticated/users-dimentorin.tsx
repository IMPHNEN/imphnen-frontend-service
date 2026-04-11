import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from '@imphnen-frontend-service/ui/atoms'
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms'
import { cn, For } from '@imphnen-frontend-service/utils'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { ReactElement, useState } from 'react'
import { toast } from 'sonner'
import {
  useMentorList,
  useUserList,
  useDeleteMentor,
  MentorDetailResponseDto,
  TUsersListItem,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/users-dimentorin')({
  component: UsersDimentorinPage,
})

function UsersDimentorinPage(): ReactElement {
  const TABS = ['mentor', 'mentee'] as const
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'mentor' | 'mentee'>('mentor')
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const { data: mentorData, isLoading: mentorLoading } = useMentorList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })

  const { data: menteeData, isLoading: menteeLoading } = useUserList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })

  const deleteMentor = useDeleteMentor()

  const mentors: MentorDetailResponseDto[] = mentorData?.data ?? []
  const mentees: TUsersListItem[] = menteeData?.data ?? []
  const mentorTotal = mentorData?.meta?.total ?? mentors.length
  const menteeTotal = menteeData?.meta?.total ?? mentees.length

  const isLoading = activeTab === 'mentor' ? mentorLoading : menteeLoading
  const totalItems = activeTab === 'mentor' ? mentorTotal : menteeTotal

  const handleDelete = async (id: string) => {
    try {
      await deleteMentor.mutateAsync(id)
      toast.success('Akun berhasil dihapus')
      setDeletingId(null)
    } catch (error) {
      console.log(error)
      toast.error('Gagal menghapus akun')
    }
  }

  const mentorColumns: ColumnDef<MentorDetailResponseDto>[] = [
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
      accessorKey: 'fullname',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
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
        const status = row.original.status
        const statusColors: Record<string, string> = {
          active: 'bg-success-200 text-success-500',
          pending: 'bg-warning-200 text-warning-700',
          inactive: 'bg-danger-200 text-danger-500',
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
                  navigate({ to: '/users-dimentorin/$id', params: { id: row.original.id } })
                }}
                className="flex items-center gap-2 w-max"
              >
                <SearchOutlined className="text-[16px]" /> Lihat Detail
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
                <DeleteOutlined />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  const menteeColumns: ColumnDef<TUsersListItem>[] = [
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
      accessorKey: 'fullname',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'is_active',
      cell: ({ row }) => (
        <div className={`py-2 px-4 rounded-md text-center ${row.original.is_active ? 'bg-success-200 text-success-500' : 'bg-danger-200 text-danger-500'}`}>
          {row.original.is_active ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      header: 'Action',
      meta: { cellClassName: cn('w-72') },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate({ to: '/users-dimentorin/$id', params: { id: row.original.id } })
          }}
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Lihat Detail
        </Button>
      ),
    },
  ]

  const mentorTable = useReactTable({
    data: mentors,
    columns: mentorColumns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(mentorTotal / pagination.pageSize),
    manualPagination: true,
  })

  const menteeTable = useReactTable({
    data: mentees,
    columns: menteeColumns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(menteeTotal / pagination.pageSize),
    manualPagination: true,
  })

  return (
    <BackofficeWrapper title="Dimentorin.dev">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-p1 font-semibold text-neutral-700 mb-8">
          User Management
        </h1>
        <div className="flex gap-2 bg-primary-100 p-1.5 rounded-md">
          <For data={TABS}>
            {(tab) => (
              <Button
                key={tab}
                variant="text"
                className={cn(
                  'px-3 py-2 capitalize',
                  activeTab === tab && 'bg-white'
                )}
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
              placeholder="Cari berdasarkan nama lengkap"
              className="pl-12 w-full max-h-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-400">Loading...</div>
        ) : activeTab === 'mentor' ? (
          <DataTable data={mentors} columns={mentorColumns} table={mentorTable} />
        ) : (
          <DataTable data={mentees} columns={menteeColumns} table={menteeTable} />
        )}
      </section>
    </BackofficeWrapper>
  )
}
