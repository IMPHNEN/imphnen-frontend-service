'use client';

import { useState } from 'react';
import { getMentorMockDashboardData } from '../../../dashboard/_data/mock/dashboard-mock';

/**
 * Mentor Dashboard Component
 * Displays mentor's welcome card, overview metrics, and analytics charts.
 */
export function MentorDashboard() {
  const data = getMentorMockDashboardData();
  const [activeTab, setActiveTab] = useState<'overviews' | 'analytics'>('overviews');

  const gradientStyle = {
    background: 'linear-gradient(135deg, #ffffff 30.3%, rgba(255, 255, 255, 0) 100%), #f0f8ff',
    borderRadius: '8px',
  };

  // Topic chart data with exact bar widths from Figma specs
  const topicBars = [
    { label: 'Basic IT', width: 48, value: 100 },
    { label: 'Career & Self...', width: 139, value: 100 },
    { label: 'PM & IT Tools', width: 81, value: 100 },
    { label: 'Programming', width: 124, value: 100 },
    { label: 'Industry Insight', width: 140, value: 100 },
    { label: 'AI Tips', width: 141, value: 100 },
    { label: 'Data & Database', width: 141, value: 100 },
  ];

  // Session time preference chart data with exact heights
  const sessionBars = [
    { label: '17:00 - 17:45', height: 48, value: 100 },
    { label: '19:00 - 19:45', height: 128, value: 100 },
    { label: '20:00 - 19:45', height: 81, value: 100 },
    { label: '20:00 - 19:45', height: 81, value: 100 },
    { label: '20:00 - 19:45', height: 81, value: 100 },
  ];

  return (
    <div>
      {/* Welcome Card */}
      <div className="relative w-[972px] h-[130px] bg-white rounded-lg p-5 mb-8 overflow-hidden shadow-sm">
        <div style={gradientStyle} className="absolute inset-0 z-0" />
        <div className="relative z-10 flex flex-col justify-between">
          <div>
            <h1 className="text-[23px] font-semibold leading-[27.6px] text-primary-accent m-0">Selamat Datang di Dimentorin.dev</h1>
            <p className="text-base font-normal leading-[18px] text-text-muted mt-2 m-0">
              Senpai~ saatnya kamu bantu para junior menaklukkan dunia IT!
              <br />
              Pantau jadwal mentoring-mu, cek progress mentee, dan bagikan ilmu terbaikmu lewat sesi 1-on-1 yang impactful~
            </p>
          </div>
        </div>
        <img
          src="/image/mascot-character.webp"
          alt="Mascot"
          className="absolute right-[-20px] top-[-40px] w-[371px] h-[212px] z-[1] pointer-events-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-4">
        <button
          className={`h-[28px] px-3 bg-white border border-border-light rounded-sm text-xs font-medium leading-[15.6px] text-text-tab-default cursor-pointer transition-all ${
            activeTab === 'overviews' ? 'border-border-light bg-white' : ''
          }`}
          onClick={() => setActiveTab('overviews')}
        >
          Overviews
        </button>
        <button
          className={`h-[28px] px-3 bg-white border border-border-light rounded-sm text-xs font-medium leading-[15.6px] text-text-tab-default cursor-pointer transition-all ${
            activeTab === 'analytics' ? 'border-border-light bg-white' : ''
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: '32px' }}>
        {activeTab === 'overviews' && (
          <div className="grid gap-4 mb-8 grid-cols-[repeat(4,231px)]">
            <div className="w-[231px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
              <div className="text-[19px] font-semibold text-primary-accent">{data.rating}</div>
              <div className="text-base text-text-muted">Your Rating</div>
            </div>
            <div className="w-[231px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
              <div className="text-[19px] font-semibold text-primary-accent">{data.sessionComplete}</div>
              <div className="text-base text-text-muted">Session Complete</div>
            </div>
            <div className="w-[231px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
              <div className="text-[19px] font-semibold text-primary-accent">{data.menteeImpacted}</div>
              <div className="text-base text-text-muted">Mentee Impacted</div>
            </div>
            <div className="w-[231px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
              <div className="text-[19px] font-semibold text-primary-accent">{data.totalFeedback}</div>
              <div className="text-base text-text-muted">Total Feedback</div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-[repeat(2,478px)] gap-4 mb-8">
            {/* Topics Chart */}
            <div className="w-[478px] h-[264px] bg-white rounded-sm py-4 px-5 shadow-sm">
              <h3 className="text-[15px] font-medium text-text-muted mb-6 m-0">Topics</h3>
              <div className="flex flex-col gap-[12.5px]">
                {topicBars.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-[90px] text-xs font-semibold text-text-muted whitespace-nowrap">{topic.label}</div>
                    <div className="flex-1 flex items-center gap-3">
                      <div
                        className="h-[10px] bg-primary-accent rounded-sm"
                        style={{ width: `${topic.width}px` }}
                      />
                      <span className="text-xs font-medium text-text-muted">{topic.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Time Preference Chart */}
            <div className="w-[478px] h-[264px] bg-white rounded-sm py-4 px-5 shadow-sm">
              <h3 className="text-[15px] font-medium text-text-muted mb-6 m-0">Session Time Preference</h3>
              <div className="flex flex-col h-[189px] justify-between">
                <div className="flex items-end justify-between h-[159px] px-6">
                  {sessionBars.map((session, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      <span className="text-xs font-medium text-text-muted">{session.value}</span>
                      <div
                        className="w-[10px] bg-primary-accent rounded-sm"
                        style={{ height: `${session.height}px` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {sessionBars.map((session, idx) => (
                    <div key={idx} className="w-[75px] text-center text-xs font-semibold text-text-muted">
                      {session.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
