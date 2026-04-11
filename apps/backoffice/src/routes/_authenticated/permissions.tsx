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
  usePermissionList,
  useDeletePermission,
  TPermissionItem,
} from '@imphnen-frontend-service/service'
import React from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/permissions')({
  component: PermissionsPage,
})

function PermissionsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const { data: permissionsData, isLoading } = usePermissionList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })
  const deletePermission = useDeletePermission()

  const permissions: TPermissionItem[] = permissionsData?.data ?? []
  const totalItems = permissionsData?.meta?.total ?? permissions.length

  const handleDelete = async (id: string) => {
    try {
      await deletePermission.mutateAsync(id)
      toast.success('Data permissions berhasil dihapus')
      setDeleteId(null)
    } catch (error) {
      console.log(error)
      toast.error('Data permissions gagal dihapus')
    }
  }

  const columns: ColumnDef<TPermissionItem>[] = [
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
      header: 'No',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
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
              navigate({ to: '/permissions/$id', params: { id: row.original.id } })
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
    data: permissions,
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
          <h1 className="text-p2 font-semibold">Permissions</h1>
        </header>

        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama permissions"
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
                onClick={() => navigate({ to: '/permissions/create' })}
              >
                <PlusOutlined />
                Tambah Permissions
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading...</div>
          ) : (
            <DataTable
              data={permissions}
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
