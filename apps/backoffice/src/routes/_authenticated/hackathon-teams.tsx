import { createFileRoute } from '@tanstack/react-router'
import {
  FC,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import ModalTeamDetail from './_components/hackathon-teams/modal-team-detail-new'
import { CityFilterSelect } from '../../components/city-filter-select'
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { cn } from '@imphnen-frontend-service/utils'
import {
  EditOutlined,
  TeamOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import {
  getAdminTeams,
  TAdminTeamItem,
} from '@imphnen-frontend-service/service'
import { useNavigate } from '@tanstack/react-router'

type TeamType = TAdminTeamItem

export const Route = createFileRoute('/_authenticated/hackathon-teams')({
  component: HackathonTeamsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || '',
    per_page: Number(search.per_page) || 10,
  }),
})

function HackathonTeamsPage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()
  const currentPage = Math.max(1, searchParams.page)
  const searchQuery = searchParams.search || ''
  const perPage = searchParams.per_page || 10
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showNewTeamModal, setShowNewTeamModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null)
  useState<TeamType | null>(null)
  const [globalFilter, setGlobalFilter] = useState(searchQuery)

  const [visibilityFilter, setVisibilityFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')

  const {
    data: teamsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      'admin-teams',
      currentPage,
      perPage,
      cityFilter,
      visibilityFilter,
      searchQuery,
    ],
    queryFn: () =>
      getAdminTeams({
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
      }),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  })

  const totalData = teamsResponse?.meta?.total_data || 0
  const totalPages = teamsResponse?.meta?.total_page || 1

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: {
          page: newPage,
          per_page: perPage !== 10 ? perPage : undefined,
          search: searchQuery || undefined,
        } as any,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [navigate, perPage, searchQuery]
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
      } as any,
    })
  }, [globalFilter, navigate, perPage])

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
        } as any,
      })
    },
    [navigate, searchQuery]
  )

  const handleShowDetailModal = useCallback((team: TeamType) => {
    setSelectedTeam(team)
    setShowDetailModal(true)
  }, [])

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false)
    setSelectedTeam(null)
  }, [])

  const handleShowNewTeamModal = useCallback(() => {
    setShowNewTeamModal(true)
  }, [])

  const handleCloseNewTeamModal = useCallback(() => {
    setShowNewTeamModal(false)
  }, [])

  const filteredData = useMemo(() => {
    return teamsResponse?.data?.data || teamsResponse?.data || []
  }, [teamsResponse])

  const columns: ColumnDef<TeamType>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Team',
        cell: ({ row }) => {
          const team = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
                {team.logo ? (
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <TeamOutlined className="text-neutral-400 text-lg" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-medium text-neutral-900 truncate max-w-sm"
                  title={team.name}
                >
                  {team.name}
                </p>
              </div>
            </div>
          )
        },
        enableSorting: true,
      },
      {
        accessorKey: 'city',
        header: 'City',
        cell: ({ row }) => (
          <span className="text-neutral-700">{row.original.city}</span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'visibility',
        header: 'Visibility',
        cell: ({ row }) => {
          const isPublic = row.original.visibility === 'public'
          return (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-2xl text-xs font-medium',
                isPublic
                  ? 'bg-success-100 text-success-800'
                  : 'bg-neutral-100 text-neutral-700'
              )}
            >
              {isPublic ? 'Public' : 'Private'}
            </span>
          )
        },
        enableSorting: true,
      },
      {
        id: 'leader',
        header: 'Leader ID',
        cell: ({ row }) => (
          <div className="text-sm text-neutral-700 font-mono">
            {row.original.leader_id}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => (
          <span className="text-neutral-900 text-sm">
            {new Date(row.original.created_at).toLocaleDateString('en-UK', {
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
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2 text-sm px-4 py-2"
              onClick={() => handleShowDetailModal(row.original)}
            >
              <EditOutlined className="text-sm" />
              Manage
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [handleShowDetailModal]
  )

  return (
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">
        Team Management
      </h1>
      <section className="bg-white rounded-md shadow p-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                type="text"
                className="border border-neutral-200 rounded-lg pl-10 pr-4 py-2.5 text-sm w-full sm:w-80 focus:border-primary-500 focus:outline-none"
                placeholder="Search teams by name or city..."
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

            {}
            {
}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 px-4 py-2"
              onClick={handleShowNewTeamModal}
            >
              <PlusOutlined className="text-sm" />
              Add Team
            </Button>
          </div>
        </div>

        {(visibilityFilter !== 'all' || cityFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-neutral-600">Active filters:</span>

            {visibilityFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-info-100 text-info-800 rounded-2xl text-sm">
                Visibility: {visibilityFilter}
                <button
                  onClick={() => setVisibilityFilter('all')}
                  className="text-info-600 hover:text-info-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}

            {cityFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-2xl text-sm">
                City: {cityFilter}
                <button
                  onClick={() => setCityFilter('all')}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setVisibilityFilter('all')
                setCityFilter('all')
                setGlobalFilter('')
              }}
              className="text-sm text-neutral-600"
            >
              Clear All
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingOutlined className="text-3xl text-primary-500 animate-spin" />
            <span className="ml-3 text-neutral-600">Loading teams...</span>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            <div className="text-sm text-neutral-600">
              Showing {filteredData.length} of {totalData} teams (Page{' '}
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
            No teams found. Try adjusting your filters.
          </div>
        )}
      </section>

      <ModalTeamDetail
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        team={selectedTeam}
      />

      <ModalTeamDetail
        isOpen={showNewTeamModal}
        onClose={handleCloseNewTeamModal}
        team={null}
      />
    </BackofficeWrapper>
  )
}
