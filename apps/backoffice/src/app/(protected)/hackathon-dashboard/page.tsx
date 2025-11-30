import { FC, ReactElement } from 'react';

export const HackathonDashboardPage: FC = (): ReactElement => {
  return (
    <main className="w-full px-12 py-10 flex flex-col gap-8">
      <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
        <h1 className="text-p2 font-semibold">Hackathon Dashboard</h1>
      </header>

      <section className="bg-white rounded-lg shadow p-8">
        <p className="text-label1 text-neutral-600">
          Boilerplate page for hackathon dashboard. Add KPIs and actions here.
        </p>
      </section>
    </main>
  );
};

export default HackathonDashboardPage;
