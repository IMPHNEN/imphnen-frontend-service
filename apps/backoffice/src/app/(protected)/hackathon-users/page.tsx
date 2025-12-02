import { FC, ReactElement, useState, useMemo, useCallback } from 'react';
import ModalUserDetail from './_components/modal-user-detail';
import {
  BackofficeWrapper,
  DataTable,
} from '@imphnen-frontend-service/ui/organisms';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';
import {
  EditOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons';
// Removed unused SearchOutlined icon after schema revision

// Define interface outside component
interface UserType {
  id: string; // UUID
  avatar?: string;
  fullname: string;
  bio?: string;
  location: string;
  is_active: boolean; // admin can deactivate
  skills: string[]; // Frontend Developer, Backend Developer, etc.
  created_at: string;
  updated_at: string;
}

// Move mock data outside component to prevent recreation
const skillsOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Mobile Developer',
];

const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'];
const bios = [
  'Passionate developer with 5+ years experience',
  'Tech enthusiast and problem solver',
  'Building scalable solutions for modern problems',
  'Creative designer with technical background',
  'Data-driven decision maker',
];

const mockData: UserType[] = Array.from({ length: 50 }, (_, i) => {
  const randomSkillsCount = Math.floor(Math.random() * 3) + 1; // 1-3 skills
  const randomSkills = skillsOptions
    .sort(() => 0.5 - Math.random())
    .slice(0, randomSkillsCount);

  return {
    id: `24db9e4d-ca4c-46aa-ac36-8ef04bbe01${String(i).padStart(2, '0')}`,
    avatar:
      i % 4 === 0
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
            i % 3 === 0 ? 'Ahmad Wijuana' : 'Sofia Wijuana'
          )}&background=random`
        : undefined,
    fullname:
      i % 3 === 0
        ? 'Ahmad Wijuana'
        : i % 3 === 1
        ? 'Sofia Wijuana'
        : 'Budi Santoso',
    bio: i % 4 === 0 ? bios[i % bios.length] : undefined,
    location: locations[i % locations.length],
    is_active: i % 7 !== 0, // More realistic distribution
    skills: randomSkills,
    created_at: new Date(
      Date.now() - i * 86400000 * (Math.random() * 30 + 1)
    ).toISOString(), // Random within last 30-60 days
    updated_at: new Date().toISOString(),
  };
});

export const HackathonUsersPage: FC = (): ReactElement => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');

  // Advanced filtering states
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);

  // Constants
  const pageSize = 10;

  // Memoize the callback to prevent recreation
  const handleShowDetailModal = useCallback((user: UserType) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false);
    setSelectedUser(null);
  }, []);

  const handleShowNewUserModal = useCallback(() => {
    setShowNewUserModal(true);
  }, []);

  const handleCloseNewUserModal = useCallback(() => {
    setShowNewUserModal(false);
  }, []);

  // Filter data based on current filter states
  const filteredData = useMemo(() => {
    return mockData.filter((user) => {
      // Status filter
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active';
        if (user.is_active !== isActive) return false;
      }

      // Location filter
      if (locationFilter !== 'all' && user.location !== locationFilter) {
        return false;
      }

      // Skills filter
      if (skillsFilter.length > 0) {
        const hasMatchingSkill = skillsFilter.some((skill) =>
          user.skills.includes(skill)
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [statusFilter, locationFilter, skillsFilter]);

  // Memoize columns to prevent recreation on every render
  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: 'fullname',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {/* Avatar */}
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
            {/* Name only */}
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
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {row.original.skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-success-100 text-success-800"
              >
                {skill.replace(' Developer', '').replace(' Engineer', '')}
              </span>
            ))}
            {row.original.skills.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium bg-success-200 text-success-700">
                +{row.original.skills.length - 2}
              </span>
            )}
          </div>
        ),
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
          const aActive = rowA.original.is_active;
          const bActive = rowB.original.is_active;
          if (aActive && !bActive) return -1;
          if (!aActive && bActive) return 1;
          return 0;
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
            <Button
              variant="secondary"
              size="sm"
              className="text-sm px-4 py-2"
              onClick={() => {
                // Toggle user status - implement later
                console.log(`Toggle status for ${row.original.fullname}`);
              }}
            >
              {row.original.is_active ? 'Deactivate' : 'Activate'}
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
        User Management
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
                placeholder="Search users by name or location..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-36 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-44 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills Filter with Icon */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-44 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value=""
                onChange={(e) => {
                  if (
                    e.target.value &&
                    !skillsFilter.includes(e.target.value)
                  ) {
                    setSkillsFilter((prev) => [...prev, e.target.value]);
                  }
                }}
              >
                <option value="">Add Skill Filter</option>
                {skillsOptions.map((skill) => (
                  <option
                    key={skill}
                    value={skill}
                    disabled={skillsFilter.includes(skill)}
                  >
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right side - Add User Button */}
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

        {/* Active filters display */}
        {(skillsFilter.length > 0 ||
          statusFilter !== 'all' ||
          locationFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-neutral-600">Active filters:</span>

            {/* Status filter badge */}
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

            {/* Location filter badge */}
            {locationFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-2xl text-sm">
                Location: {locationFilter}
                <button
                  onClick={() => setLocationFilter('all')}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Skills filter badges */}
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

            {/* Clear all filters */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setStatusFilter('all');
                setLocationFilter('all');
                setSkillsFilter([]);
                setGlobalFilter('');
              }}
              className="text-sm text-neutral-600"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Pagination-aware results display */}
        {filteredData.length > 0 && (
          <div className="text-sm text-neutral-600">
            Showing {Math.min(pageSize, filteredData.length)} of{' '}
            {filteredData.length} users
            {filteredData.length > pageSize}
          </div>
        )}

        {/* Table */}
        <DataTable data={filteredData} columns={columns} pageSize={10} />
      </section>

      {/* Modals component */}
      <ModalUserDetail
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        user={selectedUser}
      />

      {/* New User Modal */}
      <ModalUserDetail
        isOpen={showNewUserModal}
        onClose={handleCloseNewUserModal}
        user={null} // null indicates creating new user
      />
    </BackofficeWrapper>
  );
};

export default HackathonUsersPage;
