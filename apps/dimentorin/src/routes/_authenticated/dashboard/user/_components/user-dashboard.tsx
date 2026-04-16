'use client';

import { useNavigate } from '@tanstack/react-router';
import { getUserMockDashboardData } from '../../_data/mock/dashboard-mock';
import { Button, Card } from '@imphnen-frontend-service/ui/atoms';

export function UserDashboard() {
  const data = getUserMockDashboardData();
  const navigate = useNavigate();

  const handleStartDiscovery = () => {
    navigate({ to: '/dashboard/user/roadmap-discovery' });
  };

  const handleContinueLearning = () => {
    navigate({ to: '/dashboard/user/learning-path' });
  };

  const gradientStyle = {
    background: 'linear-gradient(135deg, #ffffff 30.3%, rgba(255, 255, 255, 0) 100%), #f0f8ff',
    borderRadius: '8px',
  };

  return (
    <div>
      <div className="relative w-243 h-41 bg-white rounded-lg px-6 py-5 mb-8 overflow-hidden shadow-sm">
        <div style={gradientStyle} className="absolute inset-0 z-0" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h1 className="text-[23px] font-semibold leading-[27.6px] text-primary-accent m-0">Selamat Datang di Dimentorin.dev</h1>
            <p className="text-base font-normal leading-5.5 text-text-muted mt-3 m-0 max-w-155">
              Yuk, mulai petualanganmu di menu Skill Discovery untuk dapatkan
              <br />
              roadmap 30 hari yang direkomendasikan AI khusus buat kamu~
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleStartDiscovery}
          >
            Temukan Roadmapmu^^
          </Button>
        </div>
        <img
          src="/image/mascot-character.webp"
          alt="Mascot"
          className="absolute -right-4 -top-7 w-92.75 h-53 z-1 pointer-events-none"
        />
      </div>

      <div className="grid gap-4 mb-8 grid-cols-[repeat(3,313.33px)]">
        {[
          { label: 'Mentoring Session', value: data.mentoringSessions },
          { label: 'Article Submitted', value: data.articleSubmitted },
          { label: 'Article Published', value: data.articlePublished }
        ].map((stat, i) => (
          <Card key={i}>
            <div className="w-[313.33px] h-25 p-5 flex flex-col justify-end gap-1">
              <div className="text-[19px] font-semibold text-primary-accent">{stat.value}</div>
              <div className="text-base text-text-muted">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-[19px] font-semibold text-text-label mb-4">Your Roadmap</h2>
        <div>
          {data.roadmap.map((item) => (
            <Card key={item.id}>
              <div className="w-243 h-35 px-5 py-4 flex flex-col justify-between">
              <h3 className="text-base font-medium text-text-muted m-0">{item.name}</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-medium text-neutral-600">
                  <span>1/{item.durationDays} days milestones completed</span>
                  <span>{item.completionPercentage}%</span>
                </div>
                <div className="w-full h-3.5 bg-border-light rounded-[2px] overflow-hidden">
                  <div
                    className="h-full rounded-[2px]"
                    style={{ width: `${item.completionPercentage}%`, background: 'linear-gradient(90deg, #87c7ed 0%, #23a1eb 100%)' }}
                  />
                </div>
              </div>
              <Button
                variant="bordered"
                size="sm"
                onClick={handleContinueLearning}
              >
                Lanjut Belajar
              </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
