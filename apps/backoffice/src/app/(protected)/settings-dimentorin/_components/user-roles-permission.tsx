import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { DataTable } from "@imphnen-frontend-service/ui/organisms";
import { cn } from "@imphnen-frontend-service/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { FC, useState } from "react";
import { useRoleList, useDeleteRole, TRolesListItem } from "@imphnen-frontend-service/service";
import { toast } from "sonner";

export const UserRolesPermission: FC = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const { data: rolesData, isLoading } = useRoleList({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const deleteRole = useDeleteRole();

  const roles: TRolesListItem[] = rolesData?.data ?? [];
  const totalItems = rolesData?.meta?.total ?? roles.length;

  const handleDelete = async (id: string) => {
    try {
      await deleteRole.mutateAsync(id);
      toast.success('Role berhasil dihapus');
    } catch {
      toast.error('Role gagal dihapus');
    }
  };

  const columns: ColumnDef<TRolesListItem>[] = [
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
      accessorKey: 'name',
    },
    {
      id: 'totalUser',
      header: 'Total Permissions',
      accessorKey: 'permissions_count',
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
              handleDelete(row.original.id);
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
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-p2 font-semibold text-neutral-700">User Roles & Permissions</h1>
        <Button type="button">
          Add Role
        </Button>
      </div>

      <div className="bg-white shadow p-8 rounded-lg">
        {isLoading ? (
          <div className="text-center py-8 text-neutral-400">Loading...</div>
        ) : (
          <DataTable data={roles} columns={columns} table={table} />
        )}
      </div>
    </div>
  )
}
