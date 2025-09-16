export interface HackathonSubmission {
  team_name: string;
  project_title: string;
  description: string;
  repo_link: string;
  screenshot: string;
  file_name: string;
}

export interface HackathonPartner {
  name: string;
  logo: string;
  link: string;
}

export interface HackathonPrize {
  position: string;
  amount: string;
  description?: string;
}

export interface HackathonTimeWindow {
  start: string; // ISO date string
  end: string;   // ISO date string
}

export interface HackathonJudge {
  name: string;
  title: string;
  company?: string;
  avatar?: string;
  bio?: string;
}

export interface HackathonSponsor {
  name: string;
  logo: string;
  link: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface HackathonRequirement {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
}

export interface HackathonMetadata {
  slug: string;
  name: string;
  cover: string;
  description?: string;
  theme?: string;
  status: 'draft' | 'upcoming' | 'active' | 'ended';
  
  // Prizes and competition details
  prize?: string; // Main prize display text
  prizes?: HackathonPrize[];
  
  // Tags and categorization
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  
  // Time windows
  registrationStart?: string;
  registrationEnd?: string;
  submissionWindow?: HackathonTimeWindow;
  judgingWindow?: HackathonTimeWindow;
  
  // Participation
  partnersCount?: number;
  submissionsCount?: number;
  maxTeamSize?: number;
  minTeamSize?: number;
  
  // Relations
  partners?: HackathonPartner[];
  submissions?: HackathonSubmission[];
  judges?: HackathonJudge[];
  sponsors?: HackathonSponsor[];
  requirements?: HackathonRequirement[];
  
  // Content metadata
  contentPath?: string;
  lastModified?: string;
  featured?: boolean;
  
  // SEO and social
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
}

export interface HackathonContent {
  metadata: HackathonMetadata;
  content: string; // MDX content as string
  compiledContent?: React.ComponentType; // Compiled MDX component
}

export interface HackathonSummary {
  slug: string;
  name: string;
  cover: string;
  description?: string;
  prize?: string;
  tags?: string[];
  theme?: string;
  status?: string;
  partnersCount?: number;
  submissionsCount?: number;
  registrationStart?: string;
  registrationEnd?: string;
  submissionWindow?: HackathonTimeWindow;
}

export interface HackathonApiResponse {
  data: HackathonSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface HackathonFilterOptions {
  status?: string[];
  tags?: string[];
  difficulty?: string[];
  featured?: boolean;
  search?: string;
}

export interface HackathonSortOptions {
  field: 'name' | 'registrationStart' | 'registrationEnd' | 'status' | 'featured';
  direction: 'asc' | 'desc';
}

export type HackathonStatus = 'draft' | 'upcoming' | 'active' | 'ended';