import { createFileRoute } from '@tanstack/react-router'
import {
  FC,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import ModalUserDetail from './_components/hackathon-users/modal-user-detail'
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { cn } from '@imphnen-frontend-service/utils'
import {
  EditOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { CityFilterSelect } from '../../components/city-filter-select'
import { useQuery } from '@tanstack/react-query'
import {
  getAdminUsers,
  TAdminUserItem,
} from '@imphnen-frontend-service/service'
import { useSearch, useNavigate } from '@tanstack/react-router'

type UserType = TAdminUserItem

const skillsOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Mobile Developer',
]

export const Route = createFileRoute('/_authenticated/hackathon-users')({
  component: HackathonUsersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || '',
    per_page: Number(search.per_page) || 10,
  }),
})

function HackathonUsersPage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()
  const currentPage = Math.max(1, searchParams.page)
  const searchQuery = searchParams.search || ''
  const perPage = searchParams.per_page || 10
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [globalFilter, setGlobalFilter] = useState(searchQuery)

  const [statusFilter, setStatusFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])

  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      'admin-users',
      currentPage,
      perPage,
      cityFilter,
      statusFilter,
      searchQuery,
    ],
    queryFn: () =>
      getAdminUsers({
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
      }),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  })

  const totalData = usersResponse?.meta?.total_data || 0
  const totalPages = usersResponse?.meta?.total_page || 1

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

  const handleShowDetailModal = useCallback((user: UserType) => {
    setSelectedUser(user)
    setShowDetailModal(true)
  }, [])

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false)
    setSelectedUser(null)
  }, [])

  const handleShowNewUserModal = useCallback(() => {
    setShowNewUserModal(true)
  }, [])

  const handleCloseNewUserModal = useCallback(() => {
    setShowNewUserModal(false)
  }, [])

  const filteredData = useMemo(() => {
    const usersData = usersResponse?.data?.data || usersResponse?.data || []
    return usersData.filter((user: UserType) => {
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active'
        if (user.is_active !== isActive) return false
      }

      if (skillsFilter.length > 0) {
        const userSkills = user.skills || []
        const hasMatchingSkill = skillsFilter.some((skill) =>
          userSkills.includes(skill)
        )
        if (!hasMatchingSkill) return false
      }

      return true
    })
  }, [usersResponse, statusFilter, skillsFilter])

  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: 'fullname',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden shrink-0">
              {row.original.avatar ? (
                <img
                  src={row.original.avatar}
                  alt={row.original.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserOutlined className="text-neutral-500 text-lg" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-neutral-900 truncate">
                {row.original.fullname}
              </p>
            </div>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'skills',
        header: 'Skills',
        cell: ({ row }) => {
          const skills = row.original.skills || []
          return (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {skills.length > 0 ? (
                <>
                  {skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-success-100 text-success-800"
                    >
                      {skill.replace(' Developer', '').replace(' Engineer', '')}
                    </span>
                  ))}
                  {skills.length > 2 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-success-200 text-success-700">
                      +{skills.length - 2}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-neutral-400">-</span>
              )}
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <span className="text-neutral-700">{row.original.location}</span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                row.original.is_active ? 'bg-success-500' : 'bg-neutral-400'
              )}
            />
            <span
              className={cn(
                'text-sm font-medium',
                row.original.is_active ? 'text-success-700' : 'text-neutral-500'
              )}
            >
              {row.original.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ),
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const aActive = rowA.original.is_active
          const bActive = rowB.original.is_active
          if (aActive && !bActive) return -1
          if (!aActive && bActive) return 1
          return 0
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Joined',
        cell: ({ row }) => (
          <span className="text-neutral-900 text-sm">
            {new Date(row.original.created_at).toLocaleDateString('en-US', {
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
            {
}
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
        User Management
      </h1>
      <section className="bg-white rounded-md shadow p-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                type="text"
                className="border border-neutral-200 rounded-lg pl-10 pr-4 py-2.5 text-sm w-full sm:w-80 focus:border-primary-500 focus:outline-none"
                placeholder="Search users by name or location..."
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

            {}
            {
}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 px-4 py-2"
              onClick={handleShowNewUserModal}
            >
              <PlusOutlined className="text-sm" />
              Add User
            </Button>
          </div>
        </div>

        {(skillsFilter.length > 0 ||
          statusFilter !== 'all' ||
          cityFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-neutral-600">Active filters:</span>

            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-info-100 text-info-800 rounded-2xl text-sm">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter('all')}
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

            {skillsFilter.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-2xl text-sm"
              >
                {skill.replace(' Developer', '').replace(' Engineer', '')}
                <button
                  onClick={() =>
                    setSkillsFilter((prev) => prev.filter((s) => s !== skill))
                  }
                  className="text-purple-600 hover:text-purple-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            ))}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setStatusFilter('all')
                setCityFilter('all')
                setSkillsFilter([])
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
            <span className="ml-3 text-neutral-600">Loading users...</span>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            <div className="text-sm text-neutral-600">
              Showing {filteredData.length} of {totalData} users (Page{' '}
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
            No users found. Try adjusting your filters.
          </div>
        )}
      </section>

      <ModalUserDetail
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        user={selectedUser}
      />

      <ModalUserDetail
        isOpen={showNewUserModal}
        onClose={handleCloseNewUserModal}
        user={null}
      />
    </BackofficeWrapper>
  )
}
