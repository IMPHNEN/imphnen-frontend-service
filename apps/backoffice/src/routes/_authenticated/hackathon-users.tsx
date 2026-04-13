import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { Search, Plus, User, Pencil, X } from 'lucide-react';
import ModalUserDetail from './_components/hackathon-users/modal-user-detail';
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
import { cn } from '@imphnen-frontend-service/utils';
import { useQuery } from '@tanstack/react-query';
import {
  getAdminUsers,
  TAdminUserItem,
} from '@imphnen-frontend-service/service';

type UserType = TAdminUserItem;

export const Route = createFileRoute('/_authenticated/hackathon-users')({
  component: HackathonUsersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || '',
    per_page: Number(search.per_page) || 10,
  }),
});

function HackathonUsersPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const currentPage = Math.max(1, searchParams.page);
  const searchQuery = searchParams.search || '';
  const perPage = searchParams.per_page || 10;

  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [showNewUserModal, setShowNewUserModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState(searchQuery);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [skillsFilter, setSkillsFilter] = React.useState<string[]>([]);

  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['admin-users', currentPage, perPage, statusFilter, searchQuery],
    queryFn: () =>
      getAdminUsers({
        page: currentPage,
        per_page: perPage,
        search: searchQuery || undefined,
      }),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  const totalData = usersResponse?.meta?.total_data || 0;
  const totalPages = usersResponse?.meta?.total_page || 1;

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

  const handleShowDetailModal = React.useCallback((user: UserType) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  }, []);

  const filteredData = React.useMemo(() => {
    const usersData: UserType[] =
      ((usersResponse?.data as any)?.data as UserType[]) ??
      (usersResponse?.data as UserType[]) ??
      [];
    return usersData.filter((user) => {
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active';
        if (user.is_active !== isActive) return false;
      }
      if (skillsFilter.length > 0) {
        const userSkills = user.skills || [];
        const hasMatchingSkill = skillsFilter.some((skill) =>
          userSkills.includes(skill)
        );
        if (!hasMatchingSkill) return false;
      }
      return true;
    });
  }, [usersResponse, statusFilter, skillsFilter]);

  const columns: ColumnDef<UserType>[] = React.useMemo(
    () => [
      {
        accessorKey: 'fullname',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={row.original.avatar ?? undefined} alt={row.original.fullname} />
              <AvatarFallback>
                <User className="size-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
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
          const skills = row.original.skills || [];
          if (skills.length === 0) {
            return <span className="text-muted-foreground">-</span>;
          }
          return (
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="success">
                  {skill.replace(' Developer', '').replace(' Engineer', '')}
                </Badge>
              ))}
              {skills.length > 2 && (
                <Badge variant="secondary">+{skills.length - 2}</Badge>
              )}
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <span className="text-foreground">{row.original.location}</span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'size-2 rounded-full',
                row.original.is_active ? 'bg-success-500' : 'bg-neutral-400'
              )}
            />
            <span
              className={cn(
                'text-sm font-medium',
                row.original.is_active ? 'text-success-700' : 'text-muted-foreground'
              )}
            >
              {row.original.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ),
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.is_active;
          const b = rowB.original.is_active;
          if (a && !b) return -1;
          if (!a && b) return 1;
          return 0;
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Joined',
        cell: ({ row }) => (
          <span className="text-sm text-foreground">
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

  const hasActiveFilters = statusFilter !== 'all' || skillsFilter.length > 0;

  return (
    <BackofficeWrapper
      title="Hackathon Users"
      description="IMPHNEN x Kolosal.ai Hackathon 2025"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari nama atau lokasi…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={() => setShowNewUserModal(true)} size="md">
              <Plus className="size-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {statusFilter !== 'all' && (
                <Badge variant="info" className="gap-1">
                  Status: {statusFilter}
                  <button
                    onClick={() => setStatusFilter('all')}
                    aria-label="Clear status filter"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {skillsFilter.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill.replace(' Developer', '').replace(' Engineer', '')}
                  <button
                    onClick={() =>
                      setSkillsFilter((prev) => prev.filter((s) => s !== skill))
                    }
                    aria-label={`Clear ${skill} filter`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="text"
                size="sm"
                onClick={() => {
                  setStatusFilter('all');
                  setSkillsFilter([]);
                  setGlobalFilter('');
                }}
              >
                Clear All
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <span>Memuat data users…</span>
            </div>
          ) : filteredData.length > 0 ? (
            <>
              <div className="text-xs text-muted-foreground">
                Menampilkan {filteredData.length} dari {totalData} users (page{' '}
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
              Tidak ada user. Coba ubah filter pencarian.
            </div>
          )}
        </CardContent>
      </Card>

      <ModalUserDetail
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
      <ModalUserDetail
        isOpen={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        user={null}
      />
    </BackofficeWrapper>
  );
}
