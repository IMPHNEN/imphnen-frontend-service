import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserDashboard } from '../../routes/_authenticated/dashboard_/_components/user/user-dashboard';
import { MentorDashboard } from '../../routes/_authenticated/dashboard_/_components/mentor/mentor-dashboard';
import { LearningPathPage } from '../../routes/_authenticated/dashboard/learning-path';
import { MentoringPage } from '../../routes/_authenticated/dashboard/mentoring';
import { RoadmapDiscoveryPage } from '../../routes/_authenticated/dashboard/roadmap-discovery';

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

    it('should display overview metrics', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Mentoring Session')).toBeDefined();
      expect(screen.getByText('Article Submitted')).toBeDefined();
      expect(screen.getByText('Article Published')).toBeDefined();
    });

    it('should display roadmap progress and label', async () => {
      render(<UserDashboard />);
      await waitFor(() => {
        expect(screen.getByText('Roadmaps')).toBeDefined();
        expect(screen.getByText('Front End Basic')).toBeDefined();
        expect(screen.getByText('1/30 days milestones completed')).toBeDefined();
      });
    });

    it('should display article table headers', () => {
      render(<UserDashboard />);
      expect(screen.getByText('Your Articles')).toBeDefined();
      expect(screen.getByText('Judul Artikel')).toBeDefined();
      expect(screen.getByText('Materi')).toBeDefined();
      expect(screen.getByText('Submit Date')).toBeDefined();
    });
  });

  describe('LearningPathPage Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render roadmap tab by default', () => {
      render(<LearningPathPage />);
      expect(screen.getByText('Roadmap Kamu')).toBeDefined();
      expect(screen.getByText('Day 1 - Materi A')).toBeDefined();
    });

    it('should switch to article tab and show article table', () => {
      render(<LearningPathPage />);
      const articleTab = screen.getByRole('button', { name: /Article/i });
      fireEvent.click(articleTab);
      expect(screen.getByText('Judul Artikel')).toBeDefined();
      expect(screen.getByText('Cek Detail')).toBeDefined();
    });
  });

  describe('MentoringPage Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render search input and table headings', () => {
      render(<MentoringPage />);
      expect(screen.getByPlaceholderText('Cari berdasarkan nama item')).toBeDefined();
      expect(screen.getByText('Nama Mentor')).toBeDefined();
      expect(screen.getByText('Sesi Mentoring')).toBeDefined();
    });

    it('should display action buttons for mentoring rows', async () => {
      render(<MentoringPage />);
      await waitFor(() => {
        expect(screen.getByText('Cek Detail')).toBeDefined();
        expect(screen.getByText('Kirim Feedback')).toBeDefined();
      });
    });
  });

  describe('RoadmapDiscoveryPage Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render discovery header and generate button', () => {
      render(<RoadmapDiscoveryPage />);
      expect(screen.getByText('Start your Journey')).toBeDefined();
      expect(screen.getByRole('button', { name: /Generate/i })).toBeDefined();
      expect(screen.getByPlaceholderText('Mau belajar roadmap apa?')).toBeDefined();
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

    it('should display Overviews tab', () => {
      render(<MentorDashboard />);
      expect(screen.getByText('Overviews')).toBeDefined();
    });
  });
});
