import { FC, ReactElement, useState, useMemo, useCallback } from 'react';
import ModalTeamDetail from './_components/modal-team-detail-new';
import SubmissionModal from './_components/submission-modal';
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
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

// Define interface outside component
interface TeamMember {
  id: string;
  joined_at: string;
  role: 'leader' | 'member';
  status: 'pending' | 'accepted' | 'rejected';
  team_id: string;
  user: {
    avatar?: string;
    bio?: string;
    created_at: string;
    email: string;
    fullname: string;
    id: string;
    is_active: boolean;
    location: string;
    phone_number?: string;
    skills: string[];
    updated_at: string;
  };
  user_id: string;
}

interface TeamType {
  id: string;
  name: string;
  description?: string;
  city: string;
  banner?: string;
  logo?: string;
  visibility: 'public' | 'private';
  member_count: number;
  has_submission: boolean;
  created_at: string;
  updated_at: string;
  leader_id: string;
  members: TeamMember[];
}

// Move mock data outside component to prevent recreation
const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'];
const teamNames = [
  'Innovators',
  'Hackers',
  'Builders',
  'Creators',
  'Pioneers',
  'Developers',
  'Engineers',
  'Coders',
  'Tech Stars',
  'Digital Wizards',
];

const descriptions = [
  'Building innovative solutions for modern problems with cutting-edge technology',
  'Passionate developers creating the next generation of web applications',
  'Focused on sustainable tech solutions that make a positive impact',
  'Experienced team working on scalable fintech innovations',
  'Creative minds developing user-centric mobile applications',
  'Full-stack developers building comprehensive business solutions',
  'AI enthusiasts creating intelligent automation tools',
  'Open source advocates building community-driven platforms',
];

const skills = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Mobile Developer',
];

const generateMembers = (
  count: number,
  teamId: string,
  leaderId: string
): TeamMember[] => {
  return Array.from({ length: count }, (_, i) => {
    const isLeader = i === 0;
    const memberId = isLeader ? leaderId : `user-${teamId}-${i}`;

    return {
      id: `member-${teamId}-${i}`,
      joined_at: new Date(
        Date.now() - (count - i) * 86400000 * Math.random() * 5
      ).toISOString(),
      role: isLeader ? 'leader' : 'member',
      status: Math.random() > 0.8 ? 'pending' : 'accepted',
      team_id: teamId,
      user: {
        id: memberId,
        avatar:
          Math.random() > 0.6
            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                `User ${i}`
              )}`
            : undefined,
        bio:
          Math.random() > 0.5
            ? `Passionate ${skills[
                Math.floor(Math.random() * skills.length)
              ].toLowerCase()} with ${
                Math.floor(Math.random() * 8) + 1
              }+ years experience`
            : undefined,
        created_at: new Date(
          Date.now() - Math.random() * 365 * 86400000
        ).toISOString(),
        email: `user${i}.team${teamId}@example.com`,
        fullname: `${
          ['Ahmad', 'Sofia', 'Budi', 'Sari', 'Rizki', 'Maya', 'Andi', 'Dina'][
            Math.floor(Math.random() * 8)
          ]
        } ${
          [
            'Wijuana',
            'Santoso',
            'Pratama',
            'Dewi',
            'Nugroho',
            'Sari',
            'Putra',
            'Lestari',
          ][Math.floor(Math.random() * 8)]
        }`,
        is_active: true,
        location: cities[Math.floor(Math.random() * cities.length)],
        phone_number:
          Math.random() > 0.7
            ? `+62${Math.floor(Math.random() * 9000000000) + 1000000000}`
            : undefined,
        skills: skills.slice(0, Math.floor(Math.random() * 3) + 1),
        updated_at: new Date().toISOString(),
      },
      user_id: memberId,
    };
  });
};

const mockData: TeamType[] = Array.from({ length: 50 }, (_, i) => {
  const teamId = `team-${String(i + 1).padStart(3, '0')}`;
  const memberCount = Math.floor(Math.random() * 5) + 1; // 1-5 members
  const leaderId = `leader-${teamId}`;
  const members = generateMembers(memberCount, teamId, leaderId);

  return {
    id: teamId,
    name: `Team ${teamNames[i % teamNames.length]} ${
      Math.floor(i / teamNames.length) + 1
    }`,
    description:
      i % 4 === 0 ? undefined : descriptions[i % descriptions.length],
    city: cities[i % cities.length],
    banner:
      i % 3 === 0 ? undefined : `https://picsum.photos/600/200?random=${i}`, // 3:1 aspect ratio
    logo:
      i % 4 === 0
        ? undefined
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            teamNames[i % teamNames.length]
          )}&background=random&size=120`,
    visibility: i % 4 === 0 ? 'private' : 'public',
    member_count: memberCount,
    has_submission: i % 3 !== 0,
    created_at: new Date(
      Date.now() - i * 86400000 * (Math.random() * 15 + 1)
    ).toISOString(),
    updated_at: new Date().toISOString(),
    leader_id: leaderId,
    members: members,
  };
});

export const HackathonTeamsPage: FC = (): ReactElement => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [selectedSubmissionTeam, setSelectedSubmissionTeam] =
    useState<TeamType | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');

  // Advanced filtering states
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [memberCountFilter, setMemberCountFilter] = useState('all');

  // Constants
  const pageSize = 10;

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

  const handleShowSubmissionModal = useCallback((team: TeamType) => {
    setSelectedSubmissionTeam(team);
    setShowSubmissionModal(true);
  }, []);

  const handleCloseSubmissionModal = useCallback(() => {
    setShowSubmissionModal(false);
    setSelectedSubmissionTeam(null);
  }, []);

  // Filter data based on current filter states
  const filteredData = useMemo(() => {
    return mockData.filter((team) => {
      // Global search filter
      if (globalFilter) {
        const searchTerm = globalFilter.toLowerCase();
        const leaderName =
          team.members.find((m) => m.role === 'leader')?.user.fullname || '';
        const memberNames = team.members.map((m) => m.user.fullname).join(' ');

        if (
          !team.name.toLowerCase().includes(searchTerm) &&
          !team.city.toLowerCase().includes(searchTerm) &&
          !team.description?.toLowerCase().includes(searchTerm) &&
          !leaderName.toLowerCase().includes(searchTerm) &&
          !memberNames.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Visibility filter
      if (visibilityFilter !== 'all' && team.visibility !== visibilityFilter) {
        return false;
      }

      // City filter
      if (cityFilter !== 'all' && team.city !== cityFilter) {
        return false;
      }

      // Submission filter
      if (submissionFilter !== 'all') {
        const hasSubmission = submissionFilter === 'submitted';
        if (team.has_submission !== hasSubmission) return false;
      }

      // Member count filter
      if (memberCountFilter !== 'all') {
        const count = parseInt(memberCountFilter);
        if (team.member_count !== count) return false;
      }

      return true;
    });
  }, [
    globalFilter,
    visibilityFilter,
    cityFilter,
    submissionFilter,
    memberCountFilter,
  ]);

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
              {/* Team Name & Description */}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-neutral-900 truncate">
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
        accessorKey: 'member_count',
        header: 'Members',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <UserOutlined className="text-neutral-400 text-sm" />
            <span className="text-sm text-neutral-700">
              {row.original.member_count}
            </span>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: 'leader',
        header: 'Leader',
        cell: ({ row }) => {
          const leader = row.original.members.find(
            (m) => m.role === 'leader'
          )?.user;
          return leader ? (
            <div>
              <div className="text-sm font-medium text-neutral-900">
                {leader.fullname}
              </div>
              <div className="text-xs text-neutral-500">{leader.email}</div>
            </div>
          ) : (
            <span className="text-neutral-400 italic">No leader</span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'has_submission',
        header: 'Submission',
        cell: ({ row }) => {
          const hasSubmission = row.original.has_submission;
          return (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  hasSubmission ? 'bg-success-500' : 'bg-danger-500'
                )}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-sm font-medium',
                    hasSubmission ? 'text-success-700' : 'text-danger-700'
                  )}
                >
                  {hasSubmission ? 'Submitted' : 'Not Submitted'}
                </span>
                {hasSubmission && (
                  <button
                    className="text-xs text-primary-600 hover:text-primary-800 text-left cursor-pointer"
                    onClick={() => handleShowSubmissionModal(row.original)}
                  >
                    View Submission <ArrowRightOutlined />
                  </button>
                )}
              </div>
            </div>
          );
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const aSubmission = rowA.original.has_submission;
          const bSubmission = rowB.original.has_submission;
          if (aSubmission && !bSubmission) return -1;
          if (!aSubmission && bSubmission) return 1;
          return 0;
        },
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
    [handleShowDetailModal, handleShowSubmissionModal]
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
                placeholder="Search teams by name, city, or leader..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            {/* Visibility Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-36 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
              >
                <option value="all">All Visibility</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-44 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Member Count Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-44 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={memberCountFilter}
                onChange={(e) => setMemberCountFilter(e.target.value)}
              >
                <option value="all">All Member Count</option>
                <option value="1">1 Member</option>
                <option value="2">2 Members</option>
                <option value="3">3 Members</option>
                <option value="4">4 Members</option>
                <option value="5">5 Members</option>
              </select>
            </div>

            {/* Submission Filter */}
            <div className="relative">
              <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
              <select
                className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full sm:w-44 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
                value={submissionFilter}
                onChange={(e) => setSubmissionFilter(e.target.value)}
              >
                <option value="all">All Submissions</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
              </select>
            </div>
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
        {(visibilityFilter !== 'all' ||
          cityFilter !== 'all' ||
          submissionFilter !== 'all' ||
          memberCountFilter !== 'all') && (
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

            {/* Member count filter badge */}
            {memberCountFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-2xl text-sm">
                Members: {memberCountFilter}
                <button
                  onClick={() => setMemberCountFilter('all')}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Submission filter badge */}
            {submissionFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-2xl text-sm">
                Submission: {submissionFilter}
                <button
                  onClick={() => setSubmissionFilter('all')}
                  className="text-purple-600 hover:text-purple-800 cursor-pointer"
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
                setSubmissionFilter('all');
                setMemberCountFilter('all');
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
            {filteredData.length} teams
            {filteredData.length > pageSize}
          </div>
        )}

        {/* Table */}
        <DataTable data={filteredData} columns={columns} pageSize={10} />
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

      {/* Submission Modal */}
      {selectedSubmissionTeam && (
        <SubmissionModal
          isOpen={showSubmissionModal}
          onClose={handleCloseSubmissionModal}
          teamId={selectedSubmissionTeam.id}
          teamName={selectedSubmissionTeam.name}
        />
      )}
    </BackofficeWrapper>
  );
};

export default HackathonTeamsPage;
