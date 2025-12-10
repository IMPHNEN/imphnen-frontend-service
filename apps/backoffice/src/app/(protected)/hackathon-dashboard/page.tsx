import { BackofficeWrapper } from '@imphnen-frontend-service/ui/organisms';
import { FC, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getAdminUsers,
  getAdminTeams,
  getAdminSubmissions,
} from '@imphnen-frontend-service/service';

export const HackathonDashboardPage: FC = (): ReactElement => {
  // Fetch total participants
  const { data: usersData } = useQuery({
    queryKey: ['admin-users-count'],
    queryFn: () => getAdminUsers({ page: 1, per_page: 1 }),
  });

  // Fetch total teams
  const { data: teamsData } = useQuery({
    queryKey: ['admin-teams-count'],
    queryFn: () => getAdminTeams({ page: 1, per_page: 1 }),
  });

  // Fetch total submissions
  const { data: submissionsData } = useQuery({
    queryKey: ['admin-submissions-count'],
    queryFn: () => getAdminSubmissions({ page: 1, per_page: 1 }),
  });

  const totalParticipants = usersData?.meta?.total_data ?? '??';
  const totalTeams = teamsData?.meta?.total_data ?? '??';
  const totalSubmissions = submissionsData?.meta?.total_data ?? '??';

  return (
    <BackofficeWrapper title="IMPHNEN x Kolosal.ai Hackathon 2025">
      <h1 className="mb-8 text-p1 font-semibold text-neutral-700">Dashboard</h1>

      <section className="grid grid-cols-5 gap-5">
        {/* Participant */}
        <div className="bg-white px-6 py-4 rounded-md shadow">
          <h3 className="text-primary-500 text-p2 font-semibold mb-2.5">
            {totalParticipants}
          </h3>
          <p className="text-neutral-400 text-p3">Total Participants</p>
        </div>
        {/* Team */}
        <div className="bg-white px-6 py-4 rounded-md shadow">
          <h3 className="text-primary-500 text-p2 font-semibold mb-2.5">
            {totalTeams}
          </h3>
          <p className="text-neutral-400 text-p3">Total Teams</p>
        </div>
        {/* Project Submitted */}
        <div className="bg-white px-6 py-4 rounded-md shadow">
          <h3 className="text-primary-500 text-p2 font-semibold mb-2.5">
            {totalSubmissions}
          </h3>
          <p className="text-neutral-400 text-p3">Total Project Submitted</p>
        </div>
      </section>
    </BackofficeWrapper>
  );
};

export default HackathonDashboardPage;
