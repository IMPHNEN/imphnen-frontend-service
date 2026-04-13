import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserDashboard } from '../../routes/_authenticated/dashboard_/_components/user/user-dashboard';
import { MentorDashboard } from '../../routes/_authenticated/dashboard_/_components/mentor/mentor-dashboard';

/**
 * Dashboard Route/Persona Render Tests
 * Tests component-level rendering of user and mentor dashboards.
 * Note: These are component tests, not full route tests (route integration tests may require heavier harness).
 */

describe('Dashboard Persona Rendering', () => {
  describe('UserDashboard Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render welcome card title', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Selamat Datang di Dimentorin.dev')).toBeDefined();
    });

    it('should display welcome card body text', () => {
      render(<UserDashboard />);
      expect(screen.getByText(/Yuk, mulai petualanganmu di menu Skill Discovery/)).toBeDefined();
    });

    it('should display CTA button', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Temukan Roadmapmu^^')).toBeDefined();
    });

    it('should display overview metrics', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Mentoring Session')).toBeDefined();
      expect(screen.getByText('Article Submitted')).toBeDefined();
      expect(screen.getByText('Article Published')).toBeDefined();
    });

    it('should display metrics with zero values', () => {
      render(<UserDashboard />);
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThan(0);
    });

    it('should display roadmap section', async () => {
      render(<UserDashboard />);
      await waitFor(() => {
        expect(screen.getByText('Your Roadmap')).toBeDefined();
        expect(screen.getByText('Front End Basic')).toBeDefined();
      });
    });

    it('should display progress labels on roadmap', async () => {
      render(<UserDashboard />);
      await waitFor(() => {
        expect(screen.getByText('1/30 days milestones completed')).toBeDefined();
        expect(screen.getByText('50%')).toBeDefined();
      });
    });

    it('should display roadmap action button', async () => {
      render(<UserDashboard />);
      await waitFor(() => {
        expect(screen.getAllByText('Lanjut Belajar').length).toBeGreaterThan(0);
      });
    });

    it('should display articles table section and headers', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Your Articles')).toBeDefined();
      expect(screen.getByText('No.')).toBeDefined();
      expect(screen.getByText('Judul Artikel')).toBeDefined();
      expect(screen.getByText('Materi')).toBeDefined();
      expect(screen.getByText('Status')).toBeDefined();
      expect(screen.getByText('Submit Date')).toBeDefined();
      expect(screen.getByText('Action')).toBeDefined();
    });
  });

  describe('MentorDashboard Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render welcome card title', () => {
      render(<MentorDashboard />);
      expect(screen.getByText('Selamat Datang di Dimentorin.dev')).toBeDefined();
    });

    it('should display welcome card body text', () => {
      render(<MentorDashboard />);
      expect(screen.getByText(/Senpai~ saatnya kamu bantu para junior/)).toBeDefined();
    });

    it('should display Overviews tab', () => {
      render(<MentorDashboard />);
      expect(screen.getByText('Overviews')).toBeDefined();
    });

    it('should display Analytics tab', () => {
      render(<MentorDashboard />);
      expect(screen.getByText('Analytics')).toBeDefined();
    });

    it('should display overview metrics labels', () => {
      render(<MentorDashboard />);
      expect(screen.getByText('Your Rating')).toBeDefined();
      expect(screen.getByText('Session Complete')).toBeDefined();
      expect(screen.getByText('Mentee Impacted')).toBeDefined();
      expect(screen.getByText('Total Feedback')).toBeDefined();
    });

    it('should display metrics with zero values', () => {
      render(<MentorDashboard />);
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThan(0);
    });

    it('should display Topics chart on analytics tab', async () => {
      render(<MentorDashboard />);
      const analyticsTab = screen.getByText('Analytics');
      fireEvent.click(analyticsTab);
      await waitFor(() => {
        expect(screen.getByText('Topics')).toBeDefined();
        expect(screen.getByText('Basic IT')).toBeDefined();
        expect(screen.getByText('Career & Self...')).toBeDefined();
      });
    });

    it('should display Session Time Preference chart on analytics tab', async () => {
      render(<MentorDashboard />);
      const analyticsTab = screen.getByText('Analytics');
      fireEvent.click(analyticsTab);
      await waitFor(() => {
        expect(screen.getByText('Session Time Preference')).toBeDefined();
        expect(screen.getByText('17:00 - 17:45')).toBeDefined();
        expect(screen.getByText('19:00 - 19:45')).toBeDefined();
      });
    });
  });
});
