import { describe, it, expect } from 'vitest';
import {
  getUserMockDashboardData,
  getMentorMockDashboardData,
  mockUserDashboardData,
  mockMentorDashboardData,
} from './dashboard-mock';
import { resolvePersona, parseSearchParams } from '../persona-resolver';
import type { TUserItem } from '@imphnen-frontend-service/service';

describe('Dashboard Mock Data', () => {
  describe('getUserMockDashboardData', () => {
    it('should return user dashboard data with correct structure', () => {
      const data = getUserMockDashboardData();

      expect(data).toHaveProperty('mentoringSessions');
      expect(data).toHaveProperty('articleSubmitted');
      expect(data).toHaveProperty('articlePublished');
      expect(data).toHaveProperty('roadmap');
      expect(data).toHaveProperty('articles');
    });

    it('should include numeric metrics', () => {
      const data = getUserMockDashboardData();

      expect(typeof data.mentoringSessions).toBe('number');
      expect(typeof data.articleSubmitted).toBe('number');
      expect(typeof data.articlePublished).toBe('number');
    });

    it('should include roadmap items with required fields', () => {
      const data = getUserMockDashboardData();

      expect(data.roadmap.length).toBeGreaterThan(0);
      data.roadmap.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('completionPercentage');
        expect(item).toHaveProperty('durationDays');
        expect(typeof item.completionPercentage).toBe('number');
      });
    });

    it('should include articles with required fields', () => {
      const data = getUserMockDashboardData();

      expect(data.articles.length).toBeGreaterThan(0);
      data.articles.forEach((article) => {
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('no');
        expect(article).toHaveProperty('judul');
        expect(article).toHaveProperty('materi');
        expect(article).toHaveProperty('status');
        expect(article).toHaveProperty('submitDate');
      });
    });

    it('should have sample row matching spec', () => {
      const data = getUserMockDashboardData();
      const firstArticle = data.articles[0];

      expect(firstArticle.judul).toContain('How to install linux dist');
      expect(firstArticle.materi).toBe('Day 1');
    });
  });

  describe('getMentorMockDashboardData', () => {
    it('should return mentor dashboard data with correct structure', () => {
      const data = getMentorMockDashboardData();

      expect(data).toHaveProperty('rating');
      expect(data).toHaveProperty('sessionComplete');
      expect(data).toHaveProperty('menteeImpacted');
      expect(data).toHaveProperty('totalFeedback');
      expect(data).toHaveProperty('topics');
      expect(data).toHaveProperty('mentoringSetup');
      expect(data).toHaveProperty('payments');
    });

    it('should include numeric metrics in valid ranges', () => {
      const data = getMentorMockDashboardData();

      expect(data.rating).toBeGreaterThanOrEqual(0);
      expect(data.rating).toBeLessThanOrEqual(5);
      expect(data.sessionComplete).toBeGreaterThanOrEqual(0);
      expect(data.menteeImpacted).toBeGreaterThanOrEqual(0);
      expect(data.totalFeedback).toBeGreaterThanOrEqual(0);
    });

    it('should include topic chips', () => {
      const data = getMentorMockDashboardData();

      expect(data.topics.length).toBeGreaterThan(0);
      data.topics.forEach((topic) => {
        expect(topic).toHaveProperty('id');
        expect(topic).toHaveProperty('label');
        expect(typeof topic.label).toBe('string');
      });
    });

    it('should include mentoring setup config', () => {
      const data = getMentorMockDashboardData();
      const setup = data.mentoringSetup;

      expect(setup).toHaveProperty('sessionRate');
      expect(setup).toHaveProperty('availability');
      expect(setup).toHaveProperty('expertise');
      expect(setup).toHaveProperty('experienceLevel');
      expect(setup).toHaveProperty('status');
      expect(['Incomplete', 'Complete']).toContain(setup.status);
    });

    it('should include payments with required fields', () => {
      const data = getMentorMockDashboardData();

      expect(data.payments.length).toBeGreaterThan(0);
      data.payments.forEach((payment) => {
        expect(payment).toHaveProperty('id');
        expect(payment).toHaveProperty('no');
        expect(payment).toHaveProperty('tanggalMentoring');
        expect(payment).toHaveProperty('sesi');
        expect(payment).toHaveProperty('namaMentee');
        expect(payment).toHaveProperty('jumlah');
      });
    });

    it('should have sample payment row matching spec', () => {
      const data = getMentorMockDashboardData();
      const firstPayment = data.payments[0];

      expect(firstPayment.no).toBe(1);
      expect(firstPayment.tanggalMentoring).toBe('28-01-2025');
      expect(firstPayment.sesi).toBe('Senin, 19:00 - 19:45');
      expect(firstPayment.namaMentee).toBe('Firdaus Wijaya');
      expect(firstPayment.jumlah).toBe('Rp.100.000');
    });

    it('should sort payments by date descending (newest first)', () => {
      const data = getMentorMockDashboardData();

      for (let i = 0; i < data.payments.length - 1; i++) {
        const current = new Date(data.payments[i].tanggalMentoring.split('-').reverse().join('-'));
        const next = new Date(data.payments[i + 1].tanggalMentoring.split('-').reverse().join('-'));
        expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
      }
    });
  });

  describe('Mock data completeness', () => {
    it('user dashboard should have consistent data', () => {
      const data = mockUserDashboardData;
      expect(data.articles.length).toBeGreaterThan(0);
      expect(data.roadmap.length).toBeGreaterThan(0);
    });

    it('mentor dashboard should have consistent data', () => {
      const data = mockMentorDashboardData;
      expect(data.payments.length).toBeGreaterThan(0);
      expect(data.topics.length).toBeGreaterThan(0);
    });
  });
});

describe('Persona Resolver', () => {
  describe('resolvePersona', () => {
    it('should respect query parameter override to mentor', () => {
      const user: TUserItem = {
        id: '1',
        email: 'user@example.com',
        fullname: 'Test User',
        is_active: true,
        role: { id: 'role-1', name: 'user', permissions: [] },
      };
      const searchParams = new URLSearchParams('persona=mentor');

      const persona = resolvePersona(user, searchParams);
      expect(persona).toBe('mentor');
    });

    it('should respect query parameter override to user', () => {
      const user: TUserItem = {
        id: '1',
        email: 'mentor@example.com',
        fullname: 'Test Mentor',
        is_active: true,
        role: { id: 'role-2', name: 'mentor', permissions: [] },
      };
      const searchParams = new URLSearchParams('persona=user');

      const persona = resolvePersona(user, searchParams);
      expect(persona).toBe('user');
    });

    it('should derive mentor from role name', () => {
      const user: TUserItem = {
        id: '1',
        email: 'mentor@example.com',
        fullname: 'Test Mentor',
        is_active: true,
        role: { id: 'role-2', name: 'mentor', permissions: [] },
      };

      const persona = resolvePersona(user);
      expect(persona).toBe('mentor');
    });

    it('should handle case-insensitive role name', () => {
      const user: TUserItem = {
        id: '1',
        email: 'mentor@example.com',
        fullname: 'Test Mentor',
        is_active: true,
        role: { id: 'role-2', name: 'MENTOR', permissions: [] },
      };

      const persona = resolvePersona(user);
      expect(persona).toBe('mentor');
    });

    it('should return user for non-mentor role', () => {
      const user: TUserItem = {
        id: '1',
        email: 'user@example.com',
        fullname: 'Test User',
        is_active: true,
        role: { id: 'role-1', name: 'user', permissions: [] },
      };

      const persona = resolvePersona(user);
      expect(persona).toBe('user');
    });

    it('should default to user when user is undefined', () => {
      const persona = resolvePersona(undefined);
      expect(persona).toBe('user');
    });

    it('should ignore invalid query parameters', () => {
      const user: TUserItem = {
        id: '1',
        email: 'user@example.com',
        fullname: 'Test User',
        is_active: true,
        role: { id: 'role-1', name: 'user', permissions: [] },
      };
      const searchParams = new URLSearchParams('persona=invalid');

      const persona = resolvePersona(user, searchParams);
      expect(persona).toBe('user');
    });

    it('should ignore missing query parameter', () => {
      const user: TUserItem = {
        id: '1',
        email: 'user@example.com',
        fullname: 'Test User',
        is_active: true,
        role: { id: 'role-1', name: 'user', permissions: [] },
      };
      const searchParams = new URLSearchParams('other=value');

      const persona = resolvePersona(user, searchParams);
      expect(persona).toBe('user');
    });
  });

  describe('parseSearchParams', () => {
    it('should parse query string correctly', () => {
      const result = parseSearchParams('?persona=mentor');
      expect(result.get('persona')).toBe('mentor');
    });

    it('should handle multiple parameters', () => {
      const result = parseSearchParams('?persona=user&other=value');
      expect(result.get('persona')).toBe('user');
      expect(result.get('other')).toBe('value');
    });

    it('should handle empty string', () => {
      const result = parseSearchParams('');
      expect(result.get('persona')).toBeNull();
    });
  });
});
