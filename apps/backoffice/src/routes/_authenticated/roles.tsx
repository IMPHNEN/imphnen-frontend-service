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
import ModalAddRole from './_components/roles/modal-add-role'
import ModalUpdateRole from './_components/roles/modal-update-role'
import ModalDeleteRole from './_components/roles/modal-delete-role'
import { useQueryState } from '@imphnen-frontend-service/utils'
import {
  useRoleList,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  TRolesListItem,
} from '@imphnen-frontend-service/service'
import React from 'react'

export const Route = createFileRoute('/_authenticated/roles')({
  component: RolesPage,
})

function RolesPage() {
  const [showModalAddItem, setShowModalAddItem] = useState(false)
  const [showModalUpdateItem, setShowModalUpdateItem] = useState(false)
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false)
  const [selectedRole, setSelectedRole] = useState<TRolesListItem | null>(null)
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

  const { data: rolesData, isLoading } = useRoleList({
    search,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  })
  const createRole = useCreateRole()
  const updateRole = useUpdateRole()
  const deleteRole = useDeleteRole()

  const roles: TRolesListItem[] = rolesData?.data ?? []
  const totalItems = rolesData?.meta?.total ?? roles.length

  const handleAdd = async (): Promise<boolean> => {
    if (pendingFormData.current) {
      await createRole.mutateAsync(pendingFormData.current)
    }
    return true
  }

  const handleUpdate = async (): Promise<boolean> => {
    if (selectedRole && pendingFormData.current) {
      await updateRole.mutateAsync({ id: selectedRole.id, data: pendingFormData.current })
    }
    return true
  }

  const handleDelete = async (): Promise<boolean> => {
    if (selectedRole) {
      await deleteRole.mutateAsync(selectedRole.id)
    }
    return true
  }

  const columns: ColumnDef<TRolesListItem>[] = [
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
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Roles Name',
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
              setSelectedRole(row.original)
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
              setSelectedRole(row.original)
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
    data: roles,
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
          <h1 className="text-p2 font-semibold">Roles</h1>
        </header>

        <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
          <div className="flex justify-between items-center gap-8 mb-2">
            <div className="relative w-full">
              <Input
                placeholder="Cari berdasarkan nama roles"
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
                Tambah Role
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">Loading...</div>
          ) : (
            <DataTable
              data={roles}
              columns={columns}
              pageSize={9}
              table={table}
            />
          )}
        </section>
      </main>

      <ModalAddRole
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleAdd={handleAdd}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />
      <ModalUpdateRole
        isOpen={showModalUpdateItem}
        onClose={() => setShowModalUpdateItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleUpdate={handleUpdate}
        initialValues={selectedRole ? { name: selectedRole.name } : undefined}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />
      <ModalDeleteRole
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
