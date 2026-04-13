import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Test configuration for dashboard screenshot capture
 */
interface DashboardTestCase {
  persona: 'user' | 'mentor';
  viewport: 'desktop' | 'mobile';
  roleName: string;
  waitForText: string;
  screenshotFileName: string;
}

/**
 * Mock authentication token structure
 */
const mockToken = {
  access_token: 'mock_access_token_' + Math.random().toString(36).substring(7),
  refresh_token: 'mock_refresh_token_' + Math.random().toString(36).substring(7),
};

/**
 * Create a mock user object based on persona
 */
function createMockUser(persona: 'user' | 'mentor') {
  const basUser = {
    id: 'mock-user-id',
    email: 'test@imphnen.com',
    fullname: 'Test User',
    is_active: true,
    role: {
      id: 'role-' + persona,
      name: persona === 'mentor' ? 'Mentor Role' : 'User Role',
      permissions: [],
    },
  };
  return basUser;
}

/**
 * Dashboard test cases
 */
const testCases: DashboardTestCase[] = [
  {
    persona: 'user',
    viewport: 'desktop',
    roleName: 'User Role',
    waitForText: 'Roadmaps',
    screenshotFileName: 'dashboard_user_mock_desktop.png',
  },
  {
    persona: 'mentor',
    viewport: 'desktop',
    roleName: 'Mentor Role',
    waitForText: 'Analytics',
    screenshotFileName: 'dashboard_mentor_mock_desktop.png',
  },
  {
    persona: 'user',
    viewport: 'mobile',
    roleName: 'User Role',
    waitForText: 'Roadmaps',
    screenshotFileName: 'dashboard_user_mock_mobile.png',
  },
  {
    persona: 'mentor',
    viewport: 'mobile',
    roleName: 'Mentor Role',
    waitForText: 'Analytics',
    screenshotFileName: 'dashboard_mentor_mock_mobile.png',
  },
];

test.describe('Dashboard Screenshot Capture', () => {
  const screenshotDir = path.resolve(__dirname, '../screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  /**
   * Run test for each dashboard variant
   */
  for (const testCase of testCases) {
    test(`capture ${testCase.persona} ${testCase.viewport} dashboard screenshot`, async ({
      page,
      context,
    }) => {
      // Set viewport size based on device type
      const viewportSize = testCase.viewport === 'desktop' ? { width: 1280, height: 832 } : { width: 375, height: 667 };
      await page.setViewportSize(viewportSize);

      // Set authentication cookie with mock token
      const tokenCookie = {
        name: 'token',
        value: JSON.stringify({ token: mockToken }),
        url: 'http://localhost:3000',
        secure: false,
        httpOnly: false,
        sameSite: 'Strict' as const,
      };
      await context.addCookies([tokenCookie]);

      // Set user in localStorage
      const mockUser = createMockUser(testCase.persona);
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
      await page.evaluate(
        ({ user }) => {
          localStorage.setItem('users', JSON.stringify(user));
        },
        { user: mockUser }
      );

      // Navigate to dashboard with persona parameter for explicit override
      const dashboardUrl = `http://localhost:3000/dashboard?persona=${testCase.persona}`;
      await page.goto(dashboardUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for stable dashboard content
      await page.waitForSelector(
        `text="${testCase.waitForText}"`,
        { timeout: 10000 }
      );

      // Additional wait for content to render
      await page.waitForTimeout(1000);

      // Capture screenshot
      const screenshotPath = path.join(screenshotDir, testCase.screenshotFileName);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      console.log(`✓ Captured: ${testCase.screenshotFileName}`);
    });
  }
});
