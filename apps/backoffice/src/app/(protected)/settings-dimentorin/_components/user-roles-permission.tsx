import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { DataTable } from "@imphnen-frontend-service/ui/organisms";
import { cn } from "@imphnen-frontend-service/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { FC, useState } from "react";

type UserRolesPermissionType = {
  id: number
  role: string
  totalUser: number
}

const mockData: UserRolesPermissionType[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  role: ['Admin', 'Super Admin', 'Mentee', 'Mentor'][Math.floor(Math.random() * 4)],
  totalUser: 10
}))

export const UserRolesPermission: FC = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns: ColumnDef<UserRolesPermissionType>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn("w-20") },
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
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
    },
    {
      id: 'totalUser',
      header: 'Total User',
      accessorKey: 'totalUser',
    },
    {
      header: 'Action',
      meta: { cellClassName: cn("w-96") },
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-2 w-max"
          >
            <UserSwitchOutlined className="text-[16px]" /> Manage Permissions
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-2 w-max"
          >
            <DeleteOutlined className="text-[16px]" /> Delete Role
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: mockData,
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
    pageCount: Math.ceil(mockData.length / pagination.pageSize),
    manualPagination: false,
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-p2 font-semibold text-neutral-700">User Roles & Permissions</h1>
        <Button type="button">
          Add Rols
        </Button>
      </div>

      <div className="bg-white shadow p-8 rounded-lg">
        <DataTable data={mockData} columns={columns} table={table} />
      </div>
    </div>
  )
}
