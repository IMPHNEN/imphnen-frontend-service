import { SearchOutlined } from "@ant-design/icons"
import { Input, Select } from "@imphnen-frontend-service/ui/atoms"
import { DataTable } from "@imphnen-frontend-service/ui/organisms"
import { cn } from "@imphnen-frontend-service/utils"
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table"
import { FC, useState } from "react"
import dayjs from "dayjs"

interface ActivityLogType {
  id: number
  date: string
  menu: string
  activity: string
}

const mockData: ActivityLogType[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  date: new Date().toISOString(),
  menu: 'Mentoring',
  activity: 'Mentoring Session',
}))

export const ActivityLog: FC = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const columns: ColumnDef<ActivityLogType>[] = [
    {
      id: 'select',
      meta: { cellClassName: cn("w-16") },
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
      id: 'date',
      header: 'Waktu',
      accessorKey: 'date',
      cell: (info) => dayjs(info.row.original.date).format('DD MMMM YYYY, HH:mm WIB'),
    },
    {
      id: 'menu',
      header: 'Menu',
      accessorKey: 'menu',
    },
    {
      id: 'activity',
      header: 'Activity',
      accessorKey: 'activity',
    }
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
    <div className="p-8 shadow rounded-lg">
      <div className="flex justify-between items-center gap-5 mb-9">
        <div className="relative w-1/2">
          <Input
            placeholder="Cari aktivitas"
            className="pl-12 w-full max-h-full"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
            <SearchOutlined />
          </div>
        </div>
        <div className="w-1/4">
          <Input type="date" className="min-w-full w-full" />
        </div>
        <Select>
          <option selected disabled>Menu</option>
          <option value="profle">Profile</option>
          <option value="profle-2">Profile</option>
        </Select>
      </div>

      <DataTable data={mockData} columns={columns} table={table} />
    </div>
  )
}
