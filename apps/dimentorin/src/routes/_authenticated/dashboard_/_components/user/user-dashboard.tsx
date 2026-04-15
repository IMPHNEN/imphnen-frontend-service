'use client';

import { useNavigate } from '@tanstack/react-router';
import { getUserMockDashboardData } from '../../../dashboard/_data/mock/dashboard-mock';

/**
 * User Dashboard Component
 * Displays user's welcome card, roadmap discovery, and learning progress.
 */
export function UserDashboard() {
  const data = getUserMockDashboardData();
  const navigate = useNavigate();

  const handleStartDiscovery = () => {
    navigate({ to: '/dashboard/roadmap-discovery' });
  };

  const handleContinueLearning = () => {
    navigate({ to: '/dashboard/learning-path' });
  };

  const gradientStyle = {
    background: 'linear-gradient(135deg, #ffffff 30.3%, rgba(255, 255, 255, 0) 100%), #f0f8ff',
    borderRadius: '8px',
  };

  return (
    <div>
      {/* Welcome Card */}
      <div className="relative w-[972px] h-[164px] bg-white rounded-lg px-6 py-5 mb-8 overflow-hidden shadow-sm">
        <div style={gradientStyle} className="absolute inset-0 z-0" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h1 className="text-[23px] font-semibold leading-[27.6px] text-primary-accent m-0">Selamat Datang di Dimentorin.dev</h1>
            <p className="text-base font-normal leading-[22px] text-text-muted mt-3 m-0 max-w-[620px]">
              Yuk, mulai petualanganmu di menu Skill Discovery untuk dapatkan
              <br />
              roadmap 30 hari yang direkomendasikan AI khusus buat kamu~
            </p>
          </div>
          <button
            onClick={handleStartDiscovery}
            className="w-[178px] h-[30px] mt-3 bg-primary-accent text-white rounded text-xs font-semibold leading-[14.4px] hover:bg-[#1e8cd1] transition-colors cursor-pointer"
          >
            Temukan Roadmapmu^^
          </button>
        </div>
        <img
          src="/image/mascot-character.webp"
          alt="Mascot"
          className="absolute right-[-16px] top-[-28px] w-[371px] h-[212px] z-[1] pointer-events-none"
        />
      </div>

      <div className="grid gap-4 mb-8 grid-cols-[repeat(3,313.33px)]">
        <div className="w-[313.33px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
          <div className="text-[19px] font-semibold text-primary-accent">{data.mentoringSessions}</div>
          <div className="text-base text-text-muted">Mentoring Session</div>
        </div>
        <div className="w-[313.33px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
          <div className="text-[19px] font-semibold text-primary-accent">{data.articleSubmitted}</div>
          <div className="text-base text-text-muted">Article Submitted</div>
        </div>
        <div className="w-[313.33px] h-[100px] bg-white rounded-sm p-5 flex flex-col justify-end gap-1 shadow-sm">
          <div className="text-[19px] font-semibold text-primary-accent">{data.articlePublished}</div>
          <div className="text-base text-text-muted">Article Published</div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-[19px] font-semibold text-text-label mb-4">Your Roadmap</h2>
        <div>
          {data.roadmap.map((item) => (
            <div key={item.id} className="w-[972px] h-[140px] bg-white rounded-sm px-5 py-4 flex flex-col justify-between shadow-sm mb-4">
              <h3 className="text-base font-medium text-text-muted m-0">{item.name}</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-medium text-neutral-600">
                  <span>1/{item.durationDays} days milestones completed</span>
                  <span>{item.completionPercentage}%</span>
                </div>
                <div className="w-full h-[14px] bg-border-light rounded-[2px] overflow-hidden">
                  <div
                    className="h-full rounded-[2px]"
                    style={{ width: `${item.completionPercentage}%`, background: 'linear-gradient(90deg, #87c7ed 0%, #23a1eb 100%)' }}
                  />
                </div>
              </div>
              <button
                onClick={handleContinueLearning}
                className="w-[120px] h-[30px] bg-white border border-primary-accent rounded-sm text-primary-accent font-semibold text-xs leading-[14.4px] cursor-pointer"
              >
                Lanjut Belajar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[19px] font-semibold text-text-label mb-4">Your Articles</h2>
        <div className="w-[972px] bg-white rounded-sm shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-50">
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">No.</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Judul Artikel</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Materi</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Submit Date</th>
                <th className="text-left text-xs font-semibold text-text-label px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.articles.slice(0, 10).map((article) => (
                <tr key={article.id} className="border-t border-neutral-100">
                  <td className="text-xs text-text-muted px-4 py-3">{article.no}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{article.judul}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{article.materi}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{article.status}</td>
                  <td className="text-xs text-text-muted px-4 py-3">{article.submitDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="h-7 px-2 rounded-sm border border-primary-accent text-primary-accent text-[10px] font-semibold cursor-pointer">Edit</button>
                      <button className="h-7 px-2 rounded-sm border border-danger-200 text-danger-500 text-[10px] font-semibold cursor-pointer">Delete</button>
                      <button className="h-7 px-2 rounded-sm border border-border-light text-text-label text-[10px] font-semibold cursor-pointer">View</button>
                      <button className="h-7 px-2 rounded-sm bg-primary-accent text-white text-[10px] font-semibold cursor-pointer">Submit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
