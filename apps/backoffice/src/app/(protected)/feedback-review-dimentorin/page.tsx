import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "@imphnen-frontend-service/ui/atoms";
import { BackofficeWrapper, DataTable } from "@imphnen-frontend-service/ui/organisms";
import { cn, For } from "@imphnen-frontend-service/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { ReactElement, useState } from "react"

const TABS = {
  MENTORING: 'Mentoring',
  PLATFORM: 'Platform'
} as const
type Tabs = typeof TABS[keyof typeof TABS]

type FeedbackStatus = 'done' | 'todo';

interface FeedbackType {
  id: number
  name: string
  email: string
  rating: number
  status: FeedbackStatus
}

const mockData: FeedbackType[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: i % 3 === 0 ? 'Ahmad Wijuana' : 'Sofia Wijuana',
  email: 'fullname23@gmail.com',
  rating: 4.5,
  status: i % 2 === 0 ? 'done' : 'todo',
}))

export default function Components(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tabs>(TABS.MENTORING)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns: ColumnDef<FeedbackType>[] = [
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
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
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
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<FeedbackStatus, string> = {
          done: 'bg-success-200 text-success-500',
          todo: 'bg-primary-200 text-primary-500',
        };
        const statusText: Record<FeedbackStatus, string> = {
          done: 'Done',
          todo: 'To Do',
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
      meta: { cellClassName: cn("w-72") },
      cell: ({ row }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="flex items-center gap-2 w-max"
        >
          <SearchOutlined className="text-[16px]" /> Lihat Feedback
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
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-p1 font-semibold text-neutral-700">Feedback</h1>
        <div className="flex gap-2 bg-primary-100 p-1.5 rounded-md">
          <For data={Object.values(TABS)}>
            {(tab) => (
              <Button
                key={tab}
                variant="text"
                className={cn("px-3 py-2 capitalize", activeTab === tab && "bg-white")}
                onClick={() => setActiveTab(tab)}
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
              placeholder="Cari berdasarkan nama mentor/mentee"
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>

        <DataTable data={mockData} columns={columns} table={table} />
      </section>
    </BackofficeWrapper>
  );
}
