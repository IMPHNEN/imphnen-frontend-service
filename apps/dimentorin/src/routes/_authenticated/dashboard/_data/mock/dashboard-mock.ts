import type {
  UserDashboardData,
  MentorDashboardData,
  MentorPaymentRecord,
  MentorTopicChip,
} from './types';

/**
 * Mock data for user dashboard.
 * Used during development before API integration.
 */
export const mockUserDashboardData: UserDashboardData = {
  mentoringSessions: 0,
  articleSubmitted: 0,
  articlePublished: 0,
  roadmap: [
    {
      id: 'roadmap-1',
      name: 'Front End Basic',
      completionPercentage: 50,
      durationDays: 30,
    },
    {
      id: 'roadmap-2',
      name: 'React Fundamentals',
      completionPercentage: 25,
      durationDays: 21,
    },
    {
      id: 'roadmap-3',
      name: 'TypeScript Essentials',
      completionPercentage: 10,
      durationDays: 14,
    },
  ],
  articles: [
    {
      id: 'article-1',
      no: 1,
      judul: 'How to install linux dist',
      materi: 'Day 1',
      status: 'Published',
      submitDate: '2025-04-10',
    },
    {
      id: 'article-2',
      no: 2,
      judul: 'Mastering CSS Grid Layout',
      materi: 'Day 2',
      status: 'Published',
      submitDate: '2025-04-08',
    },
    {
      id: 'article-3',
      no: 3,
      judul: 'React Hooks Deep Dive',
      materi: 'Day 5',
      status: 'Submitted',
      submitDate: '2025-04-05',
    },
    {
      id: 'article-4',
      no: 4,
      judul: 'Understanding Async/Await',
      materi: 'Day 3',
      status: 'Draft',
      submitDate: '2025-04-03',
    },
    {
      id: 'article-5',
      no: 5,
      judul: 'TypeScript Advanced Types',
      materi: 'Day 7',
      status: 'Rejected',
      submitDate: '2025-04-01',
    },
  ],
};

/**
 * Mock mentor topics for chips display.
 */
const mockMentorTopics: MentorTopicChip[] = [
  { id: 'topic-1', label: 'Basic IT' },
  { id: 'topic-2', label: 'Career & Self Development' },
  { id: 'topic-3', label: 'PM & IT Tools' },
  { id: 'topic-4', label: 'Programming' },
  { id: 'topic-5', label: 'Industry Insight' },
  { id: 'topic-6', label: 'AI Tips' },
  { id: 'topic-7', label: 'Data & Database' },
];

/**
 * Mock payments history for mentor dashboard.
 * Sorted by tanggalMentoring in descending order (newest first).
 */
const mockMentorPayments: MentorPaymentRecord[] = [
  {
    id: 'payment-1',
    no: 1,
    tanggalMentoring: '28-01-2025',
    sesi: 'Senin, 19:00 - 19:45',
    namaMentee: 'Firdaus Wijaya',
    jumlah: 'Rp.100.000',
  },
  {
    id: 'payment-2',
    no: 2,
    tanggalMentoring: '27-01-2025',
    sesi: 'Minggu, 14:00 - 14:45',
    namaMentee: 'Ahmad Rizki',
    jumlah: 'Rp.100.000',
  },
  {
    id: 'payment-3',
    no: 3,
    tanggalMentoring: '25-01-2025',
    sesi: 'Jumat, 19:00 - 19:45',
    namaMentee: 'Siti Nurhaliza',
    jumlah: 'Rp.150.000',
  },
  {
    id: 'payment-4',
    no: 4,
    tanggalMentoring: '24-01-2025',
    sesi: 'Kamis, 18:00 - 18:45',
    namaMentee: 'Budi Santoso',
    jumlah: 'Rp.100.000',
  },
  {
    id: 'payment-5',
    no: 5,
    tanggalMentoring: '22-01-2025',
    sesi: 'Selasa, 19:00 - 19:45',
    namaMentee: 'Eka Suryanto',
    jumlah: 'Rp.120.000',
  },
];

/**
 * Mock data for mentor dashboard.
 * Used during development before API integration.
 */
export const mockMentorDashboardData: MentorDashboardData = {
  rating: 0,
  sessionComplete: 0,
  menteeImpacted: 0,
  totalFeedback: 0,
  topics: mockMentorTopics,
  mentoringSetup: {
    sessionRate: 'Rp.100.000/sesi',
    availability: 'Senin-Jumat, 19:00-21:00',
    expertise: ['JavaScript', 'React', 'TypeScript', 'Backend',  'System Design'],
    experienceLevel: 'Senior',
    status: 'Complete',
  },
  payments: mockMentorPayments,
};

/**
 * Get mock user dashboard data.
 * Can be extended to support filtering/pagination.
 */
export function getUserMockDashboardData(): UserDashboardData {
  return mockUserDashboardData;
}

/**
 * Get mock mentor dashboard data.
 * Can be extended to support filtering/pagination.
 */
export function getMentorMockDashboardData(): MentorDashboardData {
  return mockMentorDashboardData;
}
