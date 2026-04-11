import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Fragment, useState } from 'react'
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Input } from '@imphnen-frontend-service/ui/atoms'
import { DataTable } from '@imphnen-frontend-service/ui/organisms'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import {
  useTestimonialList,
  useDeleteTestimonial,
  TTestimonialsListItem,
} from '@imphnen-frontend-service/service'
import React from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/cms-testimonials')({
  component: CmsTestimonialsPage,
})

function CmsTestimonialsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const { data: testimonialsData, isLoading } = useTestimonialList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })
  const deleteTestimonial = useDeleteTestimonial()

  const testimonials: TTestimonialsListItem[] = testimonialsData?.data ?? []
  const totalItems = testimonialsData?.meta?.total ?? testimonials.length

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial.mutateAsync(id)
      toast.success('Data testimonial berhasil dihapus')
      setDeleteId(null)
    } catch (error) {
      console.log(error)
      toast.error('Data testimonial gagal dihapus')
    }
  }

  const columns: ColumnDef<TTestimonialsListItem>[] = [
    {
      id: 'select',
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
      header: 'User',
      accessorKey: 'user_fullname',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Content',
      accessorKey: 'content',
      cell: ({ row }) => {
        const content = row.original.content
        return content.length > 80 ? `${content.substring(0, 80)}...` : content
      },
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-[8px]">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              navigate({ to: '/cms-testimonials/$id', params: { id: row.original.id } })
            }}
            className="flex items-center gap-2"
          >
            <EditOutlined /> Update
          </Button>
          {deleteId === row.original.id ? (
            <div className="flex items-center gap-2">
              <span className="text-label2 text-neutral-500">Yakin?</span>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(row.original.id)
                }}
              >
                Ya
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeleteId(null)
                }}
              >
                Batal
              </Button>
            </div>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteId(row.original.id)
              }}
              className="flex items-center gap-2"
            >
              <DeleteOutlined /> Delete
            </Button>
          )}
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: testimonials,
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
    <Fragment>
      <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
        <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
          <h1 className="text-p2 font-semibold">CMS Testimonials</h1>
        </header>

        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama user"
                className="pl-12 w-full max-h-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
                <SearchOutlined />
              </div>
            </div>
            <div className="relative">
              <Button
                variant="primary"
                size="md"
                className="flex gap-3 text-nowrap"
                onClick={() => navigate({ to: '/cms-testimonials/create' })}
              >
                <PlusOutlined />
                Tambah Testimonial
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading...</div>
          ) : (
            <DataTable
              data={testimonials}
              columns={columns}
              pageSize={9}
              table={table}
            />
          )}
        </section>
      </main>
    </Fragment>
  )
}
