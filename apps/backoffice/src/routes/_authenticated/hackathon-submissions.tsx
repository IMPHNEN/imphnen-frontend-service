import { createFileRoute } from '@tanstack/react-router'
import {
  FC,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import SubmissionModal from './_components/hackathon-submissions/submission-modal'
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { cn } from '@imphnen-frontend-service/utils'
import {
  SearchOutlined,
  FilterOutlined,
  LoadingOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import {
  getAdminSubmissions,
  TAdminSubmissionItem,
} from '@imphnen-frontend-service/service'
import { useNavigate } from '@tanstack/react-router'

type SubmissionType = TAdminSubmissionItem

export const Route = createFileRoute('/_authenticated/hackathon-submissions')({
  component: HackathonSubmissionsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || '',
    per_page: Number(search.per_page) || 10,
    status: (search.status as string) || 'all',
  }),
})

function HackathonSubmissionsPage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()
  const currentPage = Math.max(1, searchParams.page)
  const searchQuery = searchParams.search || ''
  const perPage = searchParams.per_page || 10
  const statusFilter = searchParams.status || 'all'

  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionType | null>(null)
  const [globalFilter, setGlobalFilter] = useState(searchQuery)

  const {
    data: submissionsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      'admin-submissions',
      currentPage,
      perPage,
      statusFilter,
      searchQuery,
    ],
    queryFn: () =>
      getAdminSubmissions({
        page: currentPage,
        per_page: perPage,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined,
      }),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  })

  const totalData = submissionsResponse?.meta?.total_data || 0
  const totalPages = submissionsResponse?.meta?.total_page || 1

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: {
          page: newPage,
          per_page: perPage !== 10 ? perPage : undefined,
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        } as any,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [navigate, perPage, searchQuery, statusFilter]
  )

  useEffect(() => {
    if (!isLoading && totalPages > 0 && currentPage > totalPages) {
      navigate({ search: { page: totalPages } as any })
    }
  }, [currentPage, totalPages, navigate, isLoading])

  useEffect(() => {
    setGlobalFilter(searchQuery)
  }, [searchQuery])

  const handleSearch = useCallback(() => {
    navigate({
      search: {
        page: 1,
        per_page: perPage !== 10 ? perPage : undefined,
        search: globalFilter.trim() || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      } as any,
    })
  }, [globalFilter, navigate, perPage, statusFilter])

  const handleSearchKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    },
    [handleSearch]
  )

  const handlePerPageChange = useCallback(
    (newPerPage: number) => {
      navigate({
        search: {
          page: 1,
          per_page: newPerPage,
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        } as any,
      })
    },
    [navigate, searchQuery, statusFilter]
  )

  const handleShowSubmissionModal = useCallback(
    (submission: SubmissionType) => {
      setSelectedSubmission(submission)
      setShowSubmissionModal(true)
    },
    []
  )

  const handleCloseSubmissionModal = useCallback(() => {
    setShowSubmissionModal(false)
    setSelectedSubmission(null)
  }, [])

  const filteredData = useMemo(() => {
    return submissionsResponse?.data || []
  }, [submissionsResponse])

  const columns: ColumnDef<SubmissionType>[] = useMemo(
    () => [
      {
        accessorKey: 'project_name',
        header: 'Project Name',
        cell: ({ row }) => (
          <span className="font-medium text-neutral-900">
            {row.original.project_name}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'team_id',
        header: 'Team ID',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-700 font-mono">
            {row.original.team_id}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status
          return (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-2xl text-xs font-medium',
                status === 'submitted'
                  ? 'bg-success-100 text-success-800'
                  : status === 'pending'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-neutral-100 text-neutral-700'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )
        },
        enableSorting: true,
      },
      {
        accessorKey: 'submitted_at',
        header: 'Submitted',
        cell: ({ row }) => (
          <span className="text-neutral-900 text-sm">
            {new Date(row.original.submitted_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        ),
        enableSorting: true,
        sortingFn: 'datetime',
      },
      {
        id: 'actions',
        header: 'Actions',
        meta: { cellClassName: cn('w-48') },
        cell: ({ row }) => (
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-2 text-sm px-4 py-2"
            onClick={() => handleShowSubmissionModal(row.original)}
          >
            <EyeOutlined className="text-sm" />
            View
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [handleShowSubmissionModal]
  )

  return (
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">
        Project Submissions
      </h1>
      <section className="bg-white rounded-md shadow p-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                type="text"
                className="border border-neutral-200 rounded-lg pl-10 pr-4 py-2.5 text-sm w-full sm:w-80 focus:border-primary-500 focus:outline-none"
                placeholder="Search by project name..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
            </div>

            <div className="relative">
              <select
                className="border border-neutral-200 rounded-lg px-4 py-2.5 text-sm w-28 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={perPage}
                onChange={(e) =>
                  handlePerPageChange(parseInt(e.target.value, 10))
                }
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>

            {}
            {
}
          </div>
        </div>

        {}
        {
}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingOutlined className="text-3xl text-primary-500 animate-spin" />
            <span className="ml-3 text-neutral-600">
              Loading submissions...
            </span>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            <div className="text-sm text-neutral-600">
              Showing {filteredData.length} of {totalData} submissions (Page{' '}
              {currentPage} of {totalPages})
              {isFetching && (
                <span className="ml-2 text-primary-500">(Updating...)</span>
              )}
            </div>
            <DataTable
              data={filteredData}
              columns={columns}
              pageSize={perPage}
              manualPagination={true}
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12 text-neutral-500">
            No submissions found. Try adjusting your filters.
          </div>
        )}
      </section>

      {selectedSubmission && (
        <SubmissionModal
          isOpen={showSubmissionModal}
          onClose={handleCloseSubmissionModal}
          submission={selectedSubmission}
        />
      )}
    </BackofficeWrapper>
  )
}
