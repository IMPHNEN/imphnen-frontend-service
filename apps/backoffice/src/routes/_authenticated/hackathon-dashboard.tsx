import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { UsersRound, UserCog, ClipboardCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
} from '@imphnen-frontend-service/ui/atoms';
import { BackofficeWrapper } from '@imphnen-frontend-service/ui/organisms';
import {
  getAdminUsers,
  getAdminTeams,
  getAdminSubmissions,
} from '@imphnen-frontend-service/service';

export const Route = createFileRoute('/_authenticated/hackathon-dashboard')({
  component: HackathonDashboardPage,
});

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
};

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-100 text-primary-600">
          <Icon className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold leading-tight text-foreground">
            {value}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function HackathonDashboardPage() {
  const { data: usersData } = useQuery({
    queryKey: ['admin-users-count'],
    queryFn: () => getAdminUsers({ page: 1, per_page: 1 }),
  });
  const { data: teamsData } = useQuery({
    queryKey: ['admin-teams-count'],
    queryFn: () => getAdminTeams({ page: 1, per_page: 1 }),
  });
  const { data: submissionsData } = useQuery({
    queryKey: ['admin-submissions-count'],
    queryFn: () => getAdminSubmissions({ page: 1, per_page: 1 }),
  });

  const totalParticipants = usersData?.meta?.total_data ?? '—';
  const totalTeams = teamsData?.meta?.total_data ?? '—';
  const totalSubmissions = submissionsData?.meta?.total_data ?? '—';

  return (
    <BackofficeWrapper
      title="Hackathon Dashboard"
      description="IMPHNEN x Kolosal.ai Hackathon 2025"
    >
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={UserCog}
          label="Total Participants"
          value={totalParticipants}
        />
        <StatCard icon={UsersRound} label="Total Teams" value={totalTeams} />
        <StatCard
          icon={ClipboardCheck}
          label="Total Project Submitted"
          value={totalSubmissions}
        />
      </section>
    </BackofficeWrapper>
  );
}
