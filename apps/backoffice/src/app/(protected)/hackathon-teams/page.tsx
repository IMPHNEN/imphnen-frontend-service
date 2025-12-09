import {
  FC,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import ModalTeamDetail from './_components/modal-team-detail-new';
import { CityFilterSelect } from '../../../components/city-filter-select';
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';
import {
  EditOutlined,
  TeamOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  getAdminTeams,
  TAdminTeamItem,
} from '@imphnen-frontend-service/service';
import { useSearchParams } from 'react-router-dom';

type TeamType = TAdminTeamItem;

export const HackathonTeamsPage: FC = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(
    1,
    parseInt(searchParams.get('page') || '1', 10)
  );
  const searchQuery = searchParams.get('search') || '';
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  useState<TeamType | null>(null);
  const [globalFilter, setGlobalFilter] = useState(searchQuery);

  // Advanced filtering states
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Fetch teams from API
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
    staleTime: 30000, // 30 seconds cache
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  const totalData = teamsResponse?.meta?.total_data || 0;
  const totalPages = teamsResponse?.meta?.total_page || 1;

  // Handle page change - update URL query params
  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams();
      params.set('page', newPage.toString());
      if (perPage !== 10) params.set('per_page', perPage.toString());
      if (searchQuery) params.set('search', searchQuery);
      setSearchParams(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setSearchParams, perPage, searchQuery]
  );

  // Validate page number doesn't exceed total pages
  useEffect(() => {
    if (!isLoading && totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ page: totalPages.toString() });
    }
  }, [currentPage, totalPages, setSearchParams, isLoading]);

  // Sync globalFilter with URL search param on mount
  useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  // Handle search teams
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (perPage !== 10) params.set('per_page', perPage.toString());
    if (globalFilter.trim()) {
      params.set('search', globalFilter.trim());
    }
    setSearchParams(params);
  }, [globalFilter, setSearchParams, perPage]);

  // Handle Enter key press in search input
  const handleSearchKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Handle per page change
  const handlePerPageChange = useCallback(
    (newPerPage: number) => {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('per_page', newPerPage.toString());
      if (searchQuery) params.set('search', searchQuery);
      setSearchParams(params);
    },
    [setSearchParams, searchQuery]
  );

  // Memoize the callback to prevent recreation
  const handleShowDetailModal = useCallback((team: TeamType) => {
    setSelectedTeam(team);
    setShowDetailModal(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false);
    setSelectedTeam(null);
  }, []);

  const handleShowNewTeamModal = useCallback(() => {
    setShowNewTeamModal(true);
  }, []);

  const handleCloseNewTeamModal = useCallback(() => {
    setShowNewTeamModal(false);
  }, []);

  // Get teams data from API response
  const filteredData = useMemo(() => {
    return teamsResponse?.data || [];
  }, [teamsResponse]);

  // Memoize columns to prevent recreation on every render
  const columns: ColumnDef<TeamType>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Team',
        cell: ({ row }) => {
          const team = row.original;
          return (
            <div className="flex items-center gap-3">
              {/* Team Logo */}
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
              {/* Team Name */}
              <div className="min-w-0 flex-1">
                <p
                  className="font-medium text-neutral-900 truncate max-w-sm"
                  title={team.name}
                >
                  {team.name}
                </p>
              </div>
            </div>
          );
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
          const isPublic = row.original.visibility === 'public';
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
          );
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
  );

  return (
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">
        Team Management
      </h1>
      {/* Filters and actions */}
      <section className="bg-white rounded-md shadow p-8 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Left side - Search & filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search bar */}
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

            {/* Per Page Dropdown */}
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

            {/* Visibility Filter */}
            {/* <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-40 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
              >
                <option value="all">All Visibility</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div> */}

            {/* City Filter */}
            {/* <CityFilterSelect
              value={cityFilter}
              onChange={setCityFilter}
              className="w-full sm:w-44"
              placeholder="Search cities..."
              allOptionLabel="All Cities"
            /> */}
          </div>

          {/* Right side - Add Team Button */}
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

        {/* Active filters display */}
        {(visibilityFilter !== 'all' || cityFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-neutral-600">Active filters:</span>

            {/* Visibility filter badge */}
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

            {/* City filter badge */}
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

            {/* Clear all filters */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setVisibilityFilter('all');
                setCityFilter('all');
                setGlobalFilter('');
              }}
              className="text-sm text-neutral-600"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Loading & results display */}
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

      {/* Modals component */}
      <ModalTeamDetail
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        team={selectedTeam}
      />

      {/* New Team Modal */}
      <ModalTeamDetail
        isOpen={showNewTeamModal}
        onClose={handleCloseNewTeamModal}
        team={null} // null indicates creating new team
      />
    </BackofficeWrapper>
  );
};

export default HackathonTeamsPage;
