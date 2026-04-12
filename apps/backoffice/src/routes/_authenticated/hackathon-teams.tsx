import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Search, Plus, Users as TeamIcon, Pencil, X } from 'lucide-react';
import ModalTeamDetail from './_components/hackathon-teams/modal-team-detail-new';
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms';
import { ColumnDef } from '@tanstack/react-table';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
} from '@imphnen-frontend-service/ui/atoms';
import { useQuery } from '@tanstack/react-query';
import {
  getAdminTeams,
  TAdminTeamItem,
} from '@imphnen-frontend-service/service';

type TeamType = TAdminTeamItem;

export const Route = createFileRoute('/_authenticated/hackathon-teams')({
  component: HackathonTeamsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || '',
    per_page: Number(search.per_page) || 10,
  }),
});

function HackathonTeamsPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const currentPage = Math.max(1, searchParams.page);
  const searchQuery = searchParams.search || '';
  const perPage = searchParams.per_page || 10;

  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<TeamType | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState(searchQuery);
  const [visibilityFilter, setVisibilityFilter] = React.useState('all');
  const [cityFilter, setCityFilter] = React.useState('all');

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
  });

  const totalData = teamsResponse?.meta?.total_data || 0;
  const totalPages = teamsResponse?.meta?.total_page || 1;

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      navigate({
        search: {
          page: newPage,
          per_page: perPage !== 10 ? perPage : undefined,
          search: searchQuery || undefined,
        } as any,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate, perPage, searchQuery]
  );

  React.useEffect(() => {
    if (!isLoading && totalPages > 0 && currentPage > totalPages) {
      navigate({ search: { page: totalPages } as any });
    }
  }, [currentPage, totalPages, navigate, isLoading]);

  React.useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  const handleSearch = React.useCallback(() => {
    navigate({
      search: {
        page: 1,
        per_page: perPage !== 10 ? perPage : undefined,
        search: globalFilter.trim() || undefined,
      } as any,
    });
  }, [globalFilter, navigate, perPage]);

  const filteredData = React.useMemo<TeamType[]>(() => {
    return (
      ((teamsResponse?.data as any)?.data as TeamType[]) ??
      (teamsResponse?.data as TeamType[]) ??
      []
    );
  }, [teamsResponse]);

  const handleShowDetailModal = React.useCallback((team: TeamType) => {
    setSelectedTeam(team);
    setShowDetailModal(true);
  }, []);

  const columns: ColumnDef<TeamType>[] = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Team',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={row.original.logo ?? undefined} alt={row.original.name} />
              <AvatarFallback>
                <TeamIcon className="size-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p
                className="truncate font-medium text-foreground"
                title={row.original.name}
              >
                {row.original.name}
              </p>
            </div>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'city',
        header: 'City',
        cell: ({ row }) => (
          <span className="text-foreground">{row.original.city}</span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'visibility',
        header: 'Visibility',
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.visibility === 'public' ? 'success' : 'secondary'
            }
          >
            {row.original.visibility === 'public' ? 'Public' : 'Private'}
          </Badge>
        ),
        enableSorting: true,
      },
      {
        id: 'leader',
        header: 'Leader ID',
        cell: ({ row }) => (
          <div className="font-mono text-xs text-muted-foreground">
            {row.original.leader_id}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => (
          <span className="text-sm text-foreground">
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
        cell: ({ row }) => (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleShowDetailModal(row.original)}
          >
            <Pencil className="size-3.5" />
            Manage
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [handleShowDetailModal]
  );

  const hasActiveFilters = visibilityFilter !== 'all' || cityFilter !== 'all';

  return (
    <BackofficeWrapper
      title="Hackathon Teams"
      description="IMPHNEN x Kolosal.ai Hackathon 2025"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari nama atau kota…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={() => setShowNewTeamModal(true)} size="md">
              <Plus className="size-4" />
              Add Team
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {visibilityFilter !== 'all' && (
                <Badge variant="info" className="gap-1">
                  Visibility: {visibilityFilter}
                  <button onClick={() => setVisibilityFilter('all')}>
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {cityFilter !== 'all' && (
                <Badge variant="success" className="gap-1">
                  City: {cityFilter}
                  <button onClick={() => setCityFilter('all')}>
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="text"
                size="sm"
                onClick={() => {
                  setVisibilityFilter('all');
                  setCityFilter('all');
                  setGlobalFilter('');
                }}
              >
                Clear All
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Memuat data teams…
            </div>
          ) : filteredData.length > 0 ? (
            <>
              <div className="text-xs text-muted-foreground">
                Menampilkan {filteredData.length} dari {totalData} teams (page{' '}
                {currentPage} / {totalPages})
                {isFetching && (
                  <span className="ml-2 text-primary-500">Updating…</span>
                )}
              </div>
              <DataTable
                data={filteredData}
                columns={columns}
                pageSize={perPage}
                manualPagination
                pageCount={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Tidak ada team. Coba ubah filter pencarian.
            </div>
          )}
        </CardContent>
      </Card>

      <ModalTeamDetail
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedTeam(null);
        }}
        team={selectedTeam}
      />
      <ModalTeamDetail
        isOpen={showNewTeamModal}
        onClose={() => setShowNewTeamModal(false)}
        team={null}
      />
    </BackofficeWrapper>
  );
}
