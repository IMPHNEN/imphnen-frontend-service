import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { Fragment, useState } from 'react'
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Button, Input } from '@imphnen-frontend-service/ui/atoms'
import { DataTable, Filter } from '@imphnen-frontend-service/ui/organisms'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table'
import {
  useUserList,
  TUsersListItem,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/accounts')({
  component: AccountsPage,
})

function AccountsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [showFilter, setShowFilter] = useState(false)

  const { data: usersData, isLoading } = useUserList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })

  const users: TUsersListItem[] = usersData?.data ?? []
  const totalItems = usersData?.meta?.total ?? users.length

  const columns: ColumnDef<TUsersListItem>[] = [
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
      header: 'Nama Lengkap',
      accessorKey: 'fullname',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: ({ row }) => (
        <span className={row.original.is_active ? 'text-success-500' : 'text-danger-500'}>
          {row.original.is_active ? 'Aktif' : 'Tidak Aktif'}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate({ to: '/accounts/$id', params: { id: row.original.id } })
          }}
          className="flex items-center gap-2"
        >
          <EditOutlined /> Edit
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
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
          <h1 className="text-p2 font-semibold">Data Akun</h1>
        </header>
        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama lengkap, email"
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
                className="flex items-center gap-3"
                disabled
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterOutlined />
                Filters
              </Button>
              {showFilter && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-10 shadow-lg">
                  <Filter onClose={() => setShowFilter(false)} options={[]} />
                </div>
              )}
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading...</div>
          ) : (
            <DataTable data={users} columns={columns} table={table} />
          )}
        </section>
      </main>
    </Fragment>
  )
}
