import { HackathonMetadata, HackathonSummary, HackathonTimeWindow, HackathonStatus } from './types';

/**
 * Get the registration window dates for a hackathon
 */
export const getRegistrationWindow = (hackathon: HackathonMetadata | HackathonSummary) => {
  const start = hackathon.submissionWindow?.start || hackathon.registrationStart || undefined;
  const end = hackathon.submissionWindow?.end || hackathon.registrationEnd || undefined;
  return {
    start: start ? new Date(start) : undefined,
    end: end ? new Date(end) : undefined,
  };
};

/**
 * Calculate days left for registration
 */
export const getDaysLeftText = (hackathon: HackathonMetadata | HackathonSummary): string | null => {
  const { end } = getRegistrationWindow(hackathon);
  if (!end) return null;
  
  const now = new Date();
  const ms = end.getTime() - now.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  
  if (days < 0) return 'Registration ended';
  if (days === 0) return 'Ends today';
  return `${days} days left`;
};

/**
 * Calculate registration progress percentage
 */
export const getProgressPercent = (hackathon: HackathonMetadata | HackathonSummary): number | null => {
  const { start, end } = getRegistrationWindow(hackathon);
  if (!start || !end) return null;
  
  const now = Date.now();
  const s = start.getTime();
  const e = end.getTime();
  
  if (now <= s) return 0;
  if (now >= e) return 100;
  
  return Math.min(100, Math.max(0, ((now - s) / (e - s)) * 100));
};

/**
 * Determine hackathon status based on dates
 */
export const calculateHackathonStatus = (hackathon: HackathonMetadata): HackathonStatus => {
  // If status is explicitly set to draft, keep it
  if (hackathon.status === 'draft') return 'draft';
  
  const now = new Date();
  const { start, end } = getRegistrationWindow(hackathon);
  
  if (!start || !end) {
    return hackathon.status || 'upcoming';
  }
  
  if (now < start) return 'upcoming';
  if (now >= start && now <= end) return 'active';
  return 'ended';
};

/**
 * Check if hackathon is currently accepting registrations
 */
export const isRegistrationOpen = (hackathon: HackathonMetadata | HackathonSummary): boolean => {
  const status = typeof hackathon.status === 'string' 
    ? hackathon.status.toLowerCase().trim() 
    : '';
    
  if (status === 'ended' || status === 'draft') return false;
  
  const { start, end } = getRegistrationWindow(hackathon);
  if (!start || !end) return false;
  
  const now = new Date();
  return now >= start && now <= end;
};

/**
 * Format date to readable string
 */
export const formatHackathonDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date range
 */
export const formatDateRange = (window: HackathonTimeWindow): string => {
  const start = formatHackathonDate(window.start);
  const end = formatHackathonDate(window.end);
  return `${start} - ${end}`;
};

/**
 * Generate slug from hackathon name
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Validate hackathon metadata
 */
export const validateHackathonMetadata = (metadata: Partial<HackathonMetadata>): string[] => {
  const errors: string[] = [];
  
  if (!metadata.slug) errors.push('Slug is required');
  if (!metadata.name) errors.push('Name is required');
  if (!metadata.cover) errors.push('Cover image is required');
  
  if (metadata.submissionWindow) {
    const start = new Date(metadata.submissionWindow.start);
    const end = new Date(metadata.submissionWindow.end);
    
    if (start >= end) {
      errors.push('Submission end date must be after start date');
    }
  }
  
  if (metadata.maxTeamSize && metadata.minTeamSize) {
    if (metadata.maxTeamSize < metadata.minTeamSize) {
      errors.push('Max team size must be greater than or equal to min team size');
    }
  }
  
  return errors;
};

/**
 * Convert HackathonMetadata to HackathonSummary
 */
export const toHackathonSummary = (metadata: HackathonMetadata): HackathonSummary => {
  return {
    slug: metadata.slug,
    name: metadata.name,
    cover: metadata.cover,
    description: metadata.description,
    prize: metadata.prize,
    tags: metadata.tags,
    theme: metadata.theme,
    status: metadata.status,
    partnersCount: metadata.partnersCount,
    submissionsCount: metadata.submissionsCount,
    registrationStart: metadata.registrationStart,
    registrationEnd: metadata.registrationEnd,
    submissionWindow: metadata.submissionWindow,
  };
};

/**
 * Filter hackathons based on criteria
 */
export const filterHackathons = (
  hackathons: HackathonSummary[],
  filters: {
    status?: string[];
    tags?: string[];
    search?: string;
    featured?: boolean;
  }
): HackathonSummary[] => {
  return hackathons.filter(hackathon => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      const currentStatus = calculateHackathonStatus(hackathon as HackathonMetadata);
      if (!filters.status.includes(currentStatus)) return false;
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      if (!hackathon.tags || !filters.tags.some(tag => hackathon.tags?.includes(tag))) {
        return false;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        hackathon.name,
        hackathon.description,
        hackathon.theme,
        ...(hackathon.tags || [])
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) return false;
    }
    
    return true;
  });
};

/**
 * Sort hackathons
 */
export const sortHackathons = (
  hackathons: HackathonSummary[],
  sortBy: 'name' | 'registrationStart' | 'status' | 'featured' = 'registrationStart',
  direction: 'asc' | 'desc' = 'desc'
): HackathonSummary[] => {
  return [...hackathons].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'registrationStart': {
        const aDate = getRegistrationWindow(a).start?.getTime() || 0;
        const bDate = getRegistrationWindow(b).start?.getTime() || 0;
        comparison = aDate - bDate;
        break;
      }
      case 'status': {
        const statusOrder = { 'active': 0, 'upcoming': 1, 'ended': 2, 'draft': 3 };
        const aStatus = calculateHackathonStatus(a as HackathonMetadata);
        const bStatus = calculateHackathonStatus(b as HackathonMetadata);
        comparison = (statusOrder[aStatus] || 99) - (statusOrder[bStatus] || 99);
        break;
      }
      default:
        comparison = 0;
    }
    
    return direction === 'desc' ? -comparison : comparison;
  });
};