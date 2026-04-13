/** User Dashboard Mock Data Types */
export interface UserArticle {
  id: string;
  no: number;
  judul: string;
  materi: string;
  status: 'Draft' | 'Submitted' | 'Published' | 'Rejected';
  submitDate: string;
}

export interface UserRoadmapItem {
  id: string;
  name: string;
  completionPercentage: number;
  durationDays: number;
}

export interface UserDashboardData {
  mentoringSessions: number;
  articleSubmitted: number;
  articlePublished: number;
  roadmap: UserRoadmapItem[];
  articles: UserArticle[];
}

/** Mentor Dashboard Mock Data Types */
export interface MentorPaymentRecord {
  id: string;
  no: number;
  tanggalMentoring: string; // DD-MM-YYYY
  sesi: string; // Hari, HH:MM - HH:MM
  namaMentee: string;
  jumlah: string; // Rp.###.###
}

export interface MentorMentoringSetup {
  sessionRate: string; // e.g., "Rp.100.000/sesi"
  availability: string; // e.g., "Senin-Jumat, 19:00-21:00"
  expertise: string[];
  experienceLevel: string; // e.g., "Senior"
  status: 'Incomplete' | 'Complete';
}

export interface MentorTopicChip {
  id: string;
  label: string;
}

export interface MentorDashboardData {
  rating: number; // 0-5
  sessionComplete: number;
  menteeImpacted: number;
  totalFeedback: number;
  topics: MentorTopicChip[];
  mentoringSetup: MentorMentoringSetup;
  payments: MentorPaymentRecord[];
}
