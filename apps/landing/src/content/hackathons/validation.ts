import { HackathonMetadata } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule<T> {
  name: string;
  validate: (value: T) => ValidationResult;
}

/**
 * Validate required fields
 */
export const validateRequiredFields = (metadata: Partial<HackathonMetadata>): ValidationResult => {
  const errors: string[] = [];
  const requiredFields = [
    { key: 'slug', name: 'Slug' },
    { key: 'name', name: 'Name' },
    { key: 'cover', name: 'Cover image' },
    { key: 'status', name: 'Status' }
  ];

  requiredFields.forEach(({ key, name }) => {
    if (!metadata[key as keyof HackathonMetadata]) {
      errors.push(`${name} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};

/**
 * Validate slug format
 */
export const validateSlug = (slug: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!slug) {
    errors.push('Slug cannot be empty');
  } else {
    // Check slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
    }

    // Check length
    if (slug.length < 3) {
      errors.push('Slug must be at least 3 characters long');
    }

    if (slug.length > 100) {
      errors.push('Slug must be less than 100 characters');
    }

    // Check for consecutive hyphens
    if (slug.includes('--')) {
      errors.push('Slug cannot contain consecutive hyphens');
    }

    // Check start/end
    if (slug.startsWith('-') || slug.endsWith('-')) {
      errors.push('Slug cannot start or end with a hyphen');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validate dates
 */
export const validateDates = (metadata: Partial<HackathonMetadata>): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate submission window
  if (metadata.submissionWindow) {
    const start = new Date(metadata.submissionWindow.start);
    const end = new Date(metadata.submissionWindow.end);

    if (isNaN(start.getTime())) {
      errors.push('Invalid submission start date');
    }

    if (isNaN(end.getTime())) {
      errors.push('Invalid submission end date');
    }

    if (start.getTime() >= end.getTime()) {
      errors.push('Submission end date must be after start date');
    }

    // Check if dates are in the past
    const now = new Date();
    if (end.getTime() < now.getTime()) {
      warnings.push('Submission end date is in the past');
    }

    // Check reasonable duration
    const duration = end.getTime() - start.getTime();
    const durationDays = duration / (1000 * 60 * 60 * 24);

    if (durationDays < 1) {
      warnings.push('Submission window is less than 1 day');
    }

    if (durationDays > 365) {
      warnings.push('Submission window is longer than 1 year');
    }
  }

  // Validate judging window
  if (metadata.judgingWindow) {
    const start = new Date(metadata.judgingWindow.start);
    const end = new Date(metadata.judgingWindow.end);

    if (isNaN(start.getTime())) {
      errors.push('Invalid judging start date');
    }

    if (isNaN(end.getTime())) {
      errors.push('Invalid judging end date');
    }

    if (start.getTime() >= end.getTime()) {
      errors.push('Judging end date must be after start date');
    }

    // Check judging starts after submission ends
    if (metadata.submissionWindow) {
      const submissionEnd = new Date(metadata.submissionWindow.end);
      if (start.getTime() < submissionEnd.getTime()) {
        warnings.push('Judging should start after submission window ends');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validate team size constraints
 */
export const validateTeamSize = (metadata: Partial<HackathonMetadata>): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (metadata.minTeamSize !== undefined && metadata.maxTeamSize !== undefined) {
    if (metadata.minTeamSize < 1) {
      errors.push('Minimum team size must be at least 1');
    }

    if (metadata.maxTeamSize < 1) {
      errors.push('Maximum team size must be at least 1');
    }

    if (metadata.maxTeamSize < metadata.minTeamSize) {
      errors.push('Maximum team size must be greater than or equal to minimum team size');
    }

    if (metadata.maxTeamSize > 20) {
      warnings.push('Maximum team size is unusually large (>20)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validate URLs
 */
export const validateUrls = (metadata: Partial<HackathonMetadata>): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate cover image URL
  if (metadata.cover) {
    try {
      new URL(metadata.cover);
    } catch {
      errors.push('Cover image must be a valid URL');
    }
  }

  // Validate social image URL
  if (metadata.socialImage) {
    try {
      new URL(metadata.socialImage);
    } catch {
      errors.push('Social image must be a valid URL');
    }
  }

  // Validate partner URLs
  if (metadata.partners) {
    metadata.partners.forEach((partner, index) => {
      try {
        new URL(partner.link);
      } catch {
        errors.push(`Partner ${index + 1} link must be a valid URL`);
      }

      try {
        new URL(partner.logo);
      } catch {
        errors.push(`Partner ${index + 1} logo must be a valid URL`);
      }
    });
  }

  // Validate sponsor URLs
  if (metadata.sponsors) {
    metadata.sponsors.forEach((sponsor, index) => {
      try {
        new URL(sponsor.link);
      } catch {
        errors.push(`Sponsor ${index + 1} link must be a valid URL`);
      }

      try {
        new URL(sponsor.logo);
      } catch {
        errors.push(`Sponsor ${index + 1} logo must be a valid URL`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validate status
 */
export const validateStatus = (status: string): ValidationResult => {
  const validStatuses = ['draft', 'upcoming', 'active', 'ended'];
  const errors: string[] = [];

  if (!validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};

/**
 * Comprehensive validation
 */
export const validateHackathon = (metadata: Partial<HackathonMetadata>): ValidationResult => {
  const validations = [
    validateRequiredFields(metadata),
    metadata.slug ? validateSlug(metadata.slug) : { isValid: true, errors: [], warnings: [] },
    validateDates(metadata),
    validateTeamSize(metadata),
    validateUrls(metadata),
    metadata.status ? validateStatus(metadata.status) : { isValid: true, errors: [], warnings: [] }
  ];

  const allErrors = validations.flatMap(v => v.errors);
  const allWarnings = validations.flatMap(v => v.warnings);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
};

/**
 * Validate hackathon content file structure
 */
export const validateHackathonStructure = (directoryPath: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // This would be implemented to check file system structure
  // For now, just return a placeholder

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};