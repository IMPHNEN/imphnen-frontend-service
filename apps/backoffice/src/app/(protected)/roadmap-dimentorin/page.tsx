import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "@imphnen-frontend-service/ui/atoms";
import { BackofficeWrapper, DataTable } from "@imphnen-frontend-service/ui/organisms";
import { cn } from "@imphnen-frontend-service/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { ModalCreateRoadmap } from "./_components/modal/create-roadmap";

type LearningStatus = 'active' | 'inactive'

type RoadmapType = {
  id: number
  name: string
  learningLevel: string
  status: LearningStatus
}

const mockData: RoadmapType[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Ahmad Wijuana' : 'Anna Wiguana',
  learningLevel: ['Pemula', 'Menengah'][Math.floor(Math.random() * 2)],
  status: i % 2 === 0 ? 'active' : 'inactive',
}))

export default function Components(): React.ReactElement {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns: ColumnDef<RoadmapType>[] = [
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
      header: 'No',
      accessorKey: 'id',
    },
    {
      id: 'name',
      header: 'Nama Roadmap',
      accessorKey: 'name',
    },
    {
      id: 'learningLevel',
      header: 'Tingkat Belajar',
      accessorKey: 'learningLevel',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<LearningStatus, string> = {
          inactive: 'bg-danger-200 text-danger-700',
          active: 'bg-success-200 text-success-500',
        };
        const statusText: Record<LearningStatus, string> = {
          inactive: 'Inactive',
          active: 'Active',
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
        <div className="flex gap-[8px]">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-2"
          >
            <EditOutlined /> Action
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
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
      <h1 className="text-p1 font-semibold text-neutral-700 mb-8">Content & Roadmap</h1>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-md">
        <div className="flex items-center justify-between mb-9">
          <h2 className="text-p2 font-semibold text-neutral-600">AI Roadmaps</h2>
          <Button type="button" variant="primary" className="flex items-center gap-2" onClick={() => setOpenCreateModal(true)}>
            <PlusOutlined /> Buat Roadmap
          </Button>
        </div>

        <div className="flex justify-between items-center gap-5 mb-2">
          <div className="relative w-full">
            <Input
              placeholder="Cari berdasarkan nama roadmap"
              className="pl-12 w-full max-h-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px]">
              <SearchOutlined />
            </div>
          </div>
          <Select>
            <option selected disabled>Tingkat Belajar</option>
            <option value="pemula">Pemula</option>
            <option value="menengah">Menengah</option>
          </Select>
        </div>

        <DataTable data={mockData} columns={columns} table={table} />
      </section>

      <ModalCreateRoadmap isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} />
    </BackofficeWrapper>
  )
}
