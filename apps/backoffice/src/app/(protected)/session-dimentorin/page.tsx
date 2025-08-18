import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "@imphnen-frontend-service/ui/atoms";
import { BackofficeWrapper, DataTable } from "@imphnen-frontend-service/ui/organisms";
import { cn } from "@imphnen-frontend-service/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { ReactElement, useState } from "react";

type SessionStatus = 'ongoing' | 'finished';

interface SessionType {
  id: string
  mentorName: string
  menteeName: string
  datetime: number
  status: SessionStatus
}

const mockData: SessionType[] = Array.from({ length: 90 }, (_, i) => ({
  id: `DS-${i + 1}`,
  mentorName: 'Ahmad Wijuana',
  menteeName: 'Sofia Wijuana',
  datetime: new Date().getTime(),
  status: i % 2 === 0 ? 'ongoing' : 'finished',
}))

export default function Components(): ReactElement {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns: ColumnDef<SessionType>[] = [
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
      id: 'id',
      header: 'ID Sesi',
      accessorKey: 'id',
    },
    {
      id: 'mentorName',
      header: 'Nama Mentor',
      accessorKey: 'name',
    },
    {
      id: 'menteeName',
      header: 'Nama Mentee',
      accessorKey: 'name',
    },
    {
      id: 'datetime',
      header: 'Waktu',
      accessorKey: 'datetime',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<SessionStatus, string> = {
          ongoing: 'bg-warning-200 text-warning-700',
          finished: 'bg-success-200 text-success-500',
        };
        const statusText: Record<SessionStatus, string> = {
          ongoing: 'On Going',
          finished: 'Finished',
        };
        return (
          <div
            className={`py-2 px-4 rounded-md text-center ${statusColors[status]}`}
          >
            {statusText[status]}
          </div>
        );
      },
    },
    {
      header: 'Action',
      meta: { cellClassName: cn("w-52") },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Cek Detail
        </Button>
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
    <BackofficeWrapper title="Dimentorin.dev">
      <h1 className="text-p1 font-semibold text-neutral-700 mb-8">Session Management</h1>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        <div className="flex justify-between items-center gap-5 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan nama lengkap"
              className="pl-12 w-full max-h-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
          <Select>
            <option selected disabled>Rating</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </Select>
          <Select>
            <option selected disabled>Status</option>
            <option value="finished">Finished</option>
            <option value="ongoing">On Going</option>
          </Select>
        </div>

        <DataTable data={mockData} columns={columns} table={table} />
      </section>
    </BackofficeWrapper>
  )
}
