import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOutlined, TrophyOutlined, ClockCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { For } from '@imphnen-frontend-service/utils';

type TabType = 'overview' | 'certificates' | 'activity' | 'mentoring';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOutlined },
  { id: 'certificates', label: 'Certificates', icon: SafetyCertificateOutlined },
  { id: 'activity', label: 'Activity', icon: ClockCircleOutlined },
  { id: 'mentoring', label: 'Mentoring', icon: TrophyOutlined },
] as const;

const certificates = [
  {
    id: 1,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google',
    date: 'March 2024',
    image: '/image/certificate-placeholder.jpg'
  },
  {
    id: 2,
    title: 'Advanced Figma Techniques',
    issuer: 'Coursera',
    date: 'February 2024',
    image: '/image/certificate-placeholder.jpg'
  }
];

const activities = [
  {
    id: 1,
    type: 'mentoring',
    title: 'Completed mentoring session with Riko',
    date: '2 hours ago',
    icon: TrophyOutlined
  },
  {
    id: 2,
    type: 'certificate',
    title: 'Earned UI/UX Design Fundamentals certificate',
    date: '1 day ago',
    icon: SafetyCertificateOutlined
  },
  {
    id: 3,
    type: 'mentoring',
    title: 'Started new mentoring session',
    date: '3 days ago',
    icon: TrophyOutlined
  }
];

const mentoringStats = [
  { label: 'Total Sessions', value: '15', change: '+3 this month' },
  { label: 'Average Rating', value: '4.8/5', change: '+0.2 from last month' },
  { label: 'Total Hours', value: '45h', change: '+12h this month' },
  { label: 'Active Mentees', value: '8', change: '+2 this month' }
];

export const ProfileTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">About Me</h3>
              <p className="text-neutral-600 leading-relaxed">
                Passionate UI/UX Designer with 5+ years of experience creating user-centered designs
                for web and mobile applications. I love mentoring aspiring designers and sharing
                knowledge about design thinking, prototyping, and user research methodologies.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Recent Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrophyOutlined className="text-primary-500" />
                    <h4 className="font-medium text-neutral-800">Top Mentor</h4>
                  </div>
                  <p className="text-sm text-neutral-600">Ranked #1 in UI/UX mentoring this month</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <SafetyCertificateOutlined className="text-green-500" />
                    <h4 className="font-medium text-neutral-800">New Certificate</h4>
                  </div>
                  <p className="text-sm text-neutral-600">Google UX Design Professional Certificate</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'certificates':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">My Certificates</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <For data={certificates}>
                  {(cert) => (
                    <div key={cert.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="w-full h-32 bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                        <SafetyCertificateOutlined className="text-4xl text-neutral-400" />
                      </div>
                      <h4 className="font-medium text-neutral-800 mb-1">{cert.title}</h4>
                      <p className="text-sm text-neutral-600">{cert.issuer}</p>
                      <p className="text-xs text-neutral-500 mt-2">{cert.date}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </motion.div>
        );

      case 'activity':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <For data={activities}>
                  {(activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-neutral-100 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <activity.icon className="text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-800">{activity.title}</p>
                        <p className="text-sm text-neutral-500">{activity.date}</p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </motion.div>
        );

      case 'mentoring':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Mentoring Statistics</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <For data={mentoringStats}>
                  {(stat) => (
                    <div key={stat.label} className="p-4 border border-neutral-200 rounded-lg">
                      <h4 className="text-2xl font-bold text-primary-500 mb-1">{stat.value}</h4>
                      <p className="font-medium text-neutral-800 mb-1">{stat.label}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Mentoring Feedback</h3>
              <div className="space-y-4">
                <div className="p-4 border border-neutral-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                    <span className="text-sm text-neutral-600">5.0</span>
                  </div>
                  <p className="text-neutral-700 mb-2">
                    "Excellent mentor! Very patient and explains concepts clearly."
                  </p>
                  <p className="text-sm text-neutral-500">- Riko, Junior Developer</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8 px-6 py-4 overflow-x-auto">
          <For data={tabs}>
            {(tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                  }`}
                >
                  <Icon className="text-sm" />
                  {tab.label}
                </button>
              );
            }}
          </For>
        </nav>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};
