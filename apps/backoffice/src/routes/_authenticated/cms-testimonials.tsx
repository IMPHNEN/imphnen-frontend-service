import { createFileRoute } from '@tanstack/react-router'
import { FC, Fragment, ReactElement, useRef, useState } from 'react'
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
import ModalAddTestimonial from './_components/cms-testimonials/modal-add-testimonial'
import ModalUpdateTestimonial from './_components/cms-testimonials/modal-update-testimonial'
import ModalDeleteTestimonial from './_components/cms-testimonials/modal-delete-testimonial'
import { useQueryState } from '@imphnen-frontend-service/utils'
import {
  useTestimonialList,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  TTestimonialsListItem,
} from '@imphnen-frontend-service/service'
import React from 'react'

export const Route = createFileRoute('/_authenticated/cms-testimonials')({
  component: CmsTestimonialsPage,
})

function CmsTestimonialsPage() {
  const [showModalAddItem, setShowModalAddItem] = useState(false)
  const [showModalUpdateItem, setShowModalUpdateItem] = useState(false)
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<TTestimonialsListItem | null>(null)
  const [search, setSearch] = useState('')
  const pendingFormData = useRef<any>(null)

  const {
    step: currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useQueryState('step', {
    defaultValue: 1,
    maxValue: 2,
    minValue: 1,
  })

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
  const createTestimonial = useCreateTestimonial()
  const updateTestimonial = useUpdateTestimonial()
  const deleteTestimonial = useDeleteTestimonial()

  const testimonials: TTestimonialsListItem[] = testimonialsData?.data ?? []
  const totalItems = testimonialsData?.meta?.total ?? testimonials.length

  const handleAdd = async (): Promise<boolean> => {
    if (pendingFormData.current) {
      await createTestimonial.mutateAsync(pendingFormData.current)
    }
    return true
  }

  const handleUpdate = async (): Promise<boolean> => {
    if (selectedTestimonial && pendingFormData.current) {
      await updateTestimonial.mutateAsync({ id: selectedTestimonial.id, data: pendingFormData.current })
    }
    return true
  }

  const handleDelete = async (): Promise<boolean> => {
    if (selectedTestimonial) {
      await deleteTestimonial.mutateAsync(selectedTestimonial.id)
    }
    return true
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
              setSelectedTestimonial(row.original)
              setShowModalUpdateItem(true)
            }}
            className="flex items-center gap-2"
          >
            <EditOutlined /> Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedTestimonial(row.original)
              setShowModalDeleteItem(true)
            }}
            className="flex items-center gap-2"
          >
            <DeleteOutlined /> Delete
          </Button>
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
                onClick={() => setShowModalAddItem(true)}
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

      <ModalAddTestimonial
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleAdd={handleAdd}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />
      <ModalUpdateTestimonial
        isOpen={showModalUpdateItem}
        onClose={() => setShowModalUpdateItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleUpdate={handleUpdate}
        initialValues={selectedTestimonial ? {
          role: selectedTestimonial.role,
          content: selectedTestimonial.content,
        } : undefined}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />
      <ModalDeleteTestimonial
        isOpen={showModalDeleteItem}
        onClose={() => setShowModalDeleteItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleDelete={handleDelete}
      />
    </Fragment>
  )
}
