import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { Users, UserCog, CalendarClock, Activity, CircleCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@imphnen-frontend-service/ui/atoms';
import { BackofficeWrapper } from '@imphnen-frontend-service/ui/organisms';
import { UserGrowthChart } from './_components/dashboard-dimentorin/chart/user-growth';
import { SessionStatusChart } from './_components/dashboard-dimentorin/chart/session-status';
import {
  useMentorList,
  useUserList,
  useMySessions,
} from '@imphnen-frontend-service/service';

export const Route = createFileRoute('/_authenticated/dashboard-dimentorin')({
  component: DashboardDimentorinPage,
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

function DashboardDimentorinPage() {
  const { data: mentorData } = useMentorList({
    per_page: 5,
    sort_by: 'rating',
    order: 'desc',
  });
  const { data: userData } = useUserList({ per_page: 1 });
  const { data: sessionsData } = useMySessions();

  const totalMentors = mentorData?.meta?.total ?? 0;
  const totalUsers = userData?.meta?.total ?? 0;
  const totalSessions = sessionsData?.total ?? 0;
  const topMentors = mentorData?.data ?? [];
  const activeMentors = topMentors.filter((m) => m.status === 'active').length;
  const completedSessions =
    sessionsData?.sessions?.filter((s) => s.status === 'completed').length ?? 0;

  const topTopics = React.useMemo(() => {
    const sessions = sessionsData?.sessions ?? [];
    const topicCount: Record<string, number> = {};
    sessions.forEach((s) => {
      topicCount[s.topic] = (topicCount[s.topic] ?? 0) + 1;
    });
    return Object.entries(topicCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [sessionsData]);

  return (
    <BackofficeWrapper
      title="Dimentorin Overview"
      description="Ringkasan metrik platform mentoring"
    >
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Users} label="Total Users" value={totalUsers} />
        <StatCard icon={UserCog} label="Total Mentors" value={totalMentors} />
        <StatCard
          icon={CalendarClock}
          label="Total Sessions"
          value={totalSessions}
        />
        <StatCard
          icon={Activity}
          label="Active Mentors"
          value={activeMentors}
        />
        <StatCard
          icon={CircleCheck}
          label="Completed Sessions"
          value={completedSessions}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Pertumbuhan user dari waktu ke waktu</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
            <CardDescription>Distribusi status sesi</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionStatusChart />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Mentors</CardTitle>
            <CardDescription>Mentor dengan rating tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-neutral-200">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[10%]">No.</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Avg Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMentors.length === 0 ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={3}
                        className="py-6 text-center text-sm text-muted-foreground"
                      >
                        Belum ada data
                      </TableCell>
                    </TableRow>
                  ) : (
                    topMentors.slice(0, 5).map((mentor, index) => (
                      <TableRow key={mentor.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{mentor.fullname ?? '-'}</TableCell>
                        <TableCell>
                          {mentor.rating?.toFixed(1) ?? '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Booked Topics</CardTitle>
            <CardDescription>Topik mentoring paling banyak dibooking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-neutral-200">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[10%]">No.</TableHead>
                    <TableHead>Topik</TableHead>
                    <TableHead>Total Sesi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTopics.length === 0 ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={3}
                        className="py-6 text-center text-sm text-muted-foreground"
                      >
                        Belum ada data
                      </TableCell>
                    </TableRow>
                  ) : (
                    topTopics.map(([topic, count], index) => (
                      <TableRow key={topic}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{topic}</TableCell>
                        <TableCell>{count}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </BackofficeWrapper>
  );
}
