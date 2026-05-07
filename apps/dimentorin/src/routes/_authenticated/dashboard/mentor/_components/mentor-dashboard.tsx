import { useState } from 'react';
import { getMentorMockDashboardData } from '../../_data/mock/dashboard-mock';
import { Button, Card } from '@imphnen-frontend-service/ui/atoms';

export function MentorDashboard() {
  const data = getMentorMockDashboardData();
  const [activeTab, setActiveTab] = useState<'overviews' | 'analytics'>('overviews');

  const gradientStyle = {
    background: 'linear-gradient(135deg, #ffffff 30.3%, rgba(255, 255, 255, 0) 100%), #f0f8ff',
    borderRadius: '8px',
  };

  return (
    <div>
      <div className="relative w-243 h-32.5 bg-white rounded-lg p-5 mb-8 overflow-hidden shadow-sm">
        <div style={gradientStyle} className="absolute inset-0 z-0" />
        <div className="relative z-10 flex flex-col justify-between">
          <div>
            <h1 className="text-[23px] font-semibold leading-[27.6px] text-primary-accent m-0">Selamat Datang di Dimentorin.dev</h1>
            <p className="text-base font-normal leading-4.5 text-text-muted mt-2 m-0">
              Senpai~ saatnya kamu bantu para junior menaklukkan dunia IT!
              <br />
              Pantau jadwal mentoring-mu, cek progress mentee, dan bagikan ilmu terbaikmu lewat sesi 1-on-1 yang impactful~
            </p>
          </div>
        </div>
        <img
          src="/image/mascot-character.webp"
          alt="Mascot"
          className="absolute -right-5 -top-10 w-92.75 h-53 z-1 pointer-events-none"
        />
      </div>

      <div className="flex gap-6 mb-4">
        <Button
          variant={activeTab === 'overviews' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('overviews')}
        >
          Overviews
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </Button>
      </div>

      <div className="mt-8">
        {activeTab === 'overviews' && (
          <div className="grid gap-4 mb-8 grid-cols-[repeat(4,231px)]">
            {[
              { label: 'Your Rating', value: data.rating },
              { label: 'Session Complete', value: data.sessionComplete },
              { label: 'Mentee Impacted', value: data.menteeImpacted },
              { label: 'Total Feedback', value: data.totalFeedback }
            ].map((stat, i) => (
              <Card key={i}>
                <div className="w-57.75 h-25 p-5 flex flex-col justify-end gap-1">
                  <div className="text-[19px] font-semibold text-primary-accent">{stat.value}</div>
                  <div className="text-base text-text-muted">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
