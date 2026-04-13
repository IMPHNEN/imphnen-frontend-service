import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Dynamically extract all routes from the TanStack Router generated file.
 */
function getDynamicRoutes(): string[] {
  const routeTreePath = path.resolve(__dirname, '../src/routeTree.gen.ts');
  if (!fs.existsSync(routeTreePath)) {
    console.warn('Route tree file not found, falling back to basic routes');
    return ['/'];
  }

  const content = fs.readFileSync(routeTreePath, 'utf-8');
  
  // Extract the FileRoutesByFullPath interface block
  const interfaceMatch = content.match(/export interface FileRoutesByFullPath \{([\s\S]*?)\}/);
  if (!interfaceMatch) return ['/'];

  const block = interfaceMatch[1];
  
  // Extract all strings in single quotes
  const routeMatches = block.match(/'([^']+)'/g);
  if (!routeMatches) return ['/'];

  return routeMatches.map(m => {
    let route = m.replace(/'/g, '');
    
    // Normalize trailing slashes (Optional cleanup)
    if (route !== '/' && route.endsWith('/')) {
        route = route.slice(0, -1);
    }

    // Replace dynamic parameters with sample values
    return route
      .replace(/\$slug/g, 'sample-article')
      .replace(/\$id/g, 'sample-id')
      .replace(/\$taskId/g, 'sample-task');
  });
}

test.describe('Automated Route Discovery & Screenshots', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const screenshotDir = path.resolve(__dirname, '../screenshots');
  const routes = [...new Set(getDynamicRoutes())]; // Unique routes

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  console.log(`Discovered ${routes.length} routes for processing.`);

  for (const route of routes) {
    test(`capture screenshot: ${route}`, async ({ page }) => {
      console.log(`Processing: ${baseURL}${route}`);
      
      try {
        // Mock auth session if accessing protected routes
        if (route.startsWith('/dashboard') || route.startsWith('/profile')) {
          await page.addInitScript(() => {
            window.localStorage.setItem('auth-storage', JSON.stringify({
              state: {
                session: {
                  user: {
                    id: 'sample-user-id',
                    fullname: 'John Doe',
                    email: 'john@example.com',
                    avatar: '/image/mascot-character.webp'
                  },
                  token: 'mock-token'
                }
              },
              version: 0
            }));
          });
        }

        await page.goto(`${baseURL}${route}`, { 
          waitUntil: 'networkidle',
          timeout: 60000 
        });
        
        // Wait for rendering
        await page.waitForTimeout(1500);

        const fileName = route.replace(/\//g, '_').replace(/^_/, '').replace(/[:$]/g, '') || 'home';
        const screenshotPath = path.join(screenshotDir, `${fileName}.png`);
        
        await page.screenshot({ 
          path: screenshotPath, 
          fullPage: true 
        });
        
        console.log(`Success: ${fileName}.png`);

        // --- Custom logic for Modals and Tabs ---
        
        // 1. Mentoring Modals
        if (route === '/dashboard/mentoring') {
          // Detail modal
          const detailButton = page.getByRole('button', { name: 'Cek Detail' }).first();
          if (await detailButton.isVisible()) {
            await detailButton.click({ timeout: 5000 });
            const detailModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Detail Sesi Mentoring' }).first();
            await detailModal.waitFor({ state: 'visible', timeout: 5000 });
            await page.waitForTimeout(500);
            await page.screenshot({ path: path.join(screenshotDir, 'dashboard_mentoring_modal_detail.png') });
            await detailModal.locator('button').first().click({ timeout: 5000 });
            await detailModal.waitFor({ state: 'hidden', timeout: 5000 });
          }

          // Contact modal
          const cancelButton = page.getByRole('button', { name: 'Cancel' }).first();
          if (await cancelButton.isVisible()) {
            await cancelButton.click({ timeout: 5000 });
            const contactModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Hubungi mentor melalui platform berikut' }).first();
            await contactModal.waitFor({ state: 'visible', timeout: 5000 });
            await page.waitForTimeout(500);
            await page.screenshot({ path: path.join(screenshotDir, 'dashboard_mentoring_modal_contact.png') });
            await contactModal.getByRole('button', { name: 'Tutup' }).click({ timeout: 5000 });
            await contactModal.waitFor({ state: 'hidden', timeout: 5000 });
          }

          // Feedback modal
          const feedbackBtn = page.getByRole('button', { name: 'Kirim Feedback' }).first();
          if (await feedbackBtn.isVisible()) {
            await feedbackBtn.click({ timeout: 5000 });
            const feedbackModal = page
              .locator('div.fixed.inset-0')
              .filter({ hasText: /Beri Feedback|Feedback Mentor/ })
              .first();
            await feedbackModal.waitFor({ state: 'visible', timeout: 5000 });
            await page.waitForTimeout(500);
            await page.screenshot({ path: path.join(screenshotDir, 'dashboard_mentoring_modal_feedback.png') });
            const closeFeedbackBtn = feedbackModal.getByRole('button', { name: 'Batal' });
            if (await closeFeedbackBtn.isVisible()) {
              await closeFeedbackBtn.click({ timeout: 5000 });
              await feedbackModal.waitFor({ state: 'hidden', timeout: 5000 });
            }
          }
        }

        // 2. Learning Path Tabs
        if (route === '/dashboard/learning-path') {
          await page.click('button:has-text("Article")');
          await page.waitForTimeout(500);
          await page.screenshot({ path: path.join(screenshotDir, 'dashboard_learning-path_tab_article.png') });
        }

        // 3. Settings Sections & 2FA Modals
        if (route === '/dashboard/settings') {
          const sections = ['Privasi & Keamanan', 'FAQ', 'Laporkan Kendala', 'Umpan Balik'];
          for (const section of sections) {
            const sectionButton = page.getByRole('button', { name: section }).first();
            if (!(await sectionButton.isVisible())) {
              console.warn(`Section button not found: ${section}`);
              continue;
            }

            await sectionButton.click({ timeout: 5000 });
            await page.waitForTimeout(300);
            const slug = section
              .toLowerCase()
              .replace(/&/g, 'and')
              .replace(/\s+/g, '_')
              .replace(/[^a-z0-9_]/g, '');
            await page.screenshot({ path: path.join(screenshotDir, `dashboard_settings_section_${slug}.png`) });
            
            // If in Privacy, test 2FA modal
            if (section === 'Privasi & Keamanan') {
              const enable2FaButton = page.getByRole('button', { name: 'Aktifkan 2FA' }).first();
              if (!(await enable2FaButton.isVisible())) {
                console.warn('2FA trigger button not found');
                continue;
              }

              await enable2FaButton.click({ timeout: 5000 });
              const emailModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Verifikasi Email' }).first();
              await emailModal.waitFor({ state: 'visible', timeout: 5000 });
              await page.waitForTimeout(500);
              await page.screenshot({ path: path.join(screenshotDir, 'dashboard_settings_modal_2fa_step1.png') });

              await emailModal.getByRole('button', { name: 'Kirim Kode' }).click({ timeout: 5000 });
              const otpModal = page.locator('div.fixed.inset-0').filter({ hasText: 'Masukkan Kode OTP' }).first();
              await otpModal.waitFor({ state: 'visible', timeout: 5000 });
              await page.waitForTimeout(500);
              await page.screenshot({ path: path.join(screenshotDir, 'dashboard_settings_modal_2fa_step2.png') });

              await otpModal.locator('button').first().click({ timeout: 5000 });
              await otpModal.waitFor({ state: 'hidden', timeout: 5000 });
            }
          }
        }

        // 4. Header Notifications
        if (route === '/dashboard') {
          const notificationButton = page.locator('header button').first();
          if (await notificationButton.isVisible()) {
            await notificationButton.click({ timeout: 5000 });
            await page.waitForTimeout(500);
            await page.screenshot({ path: path.join(screenshotDir, 'dashboard_header_notifications.png') });
          } else {
            console.warn('Notification button not found on dashboard header');
          }
        }

      } catch (error) {
        console.error(`Failed to capture ${route}:`, error.message);
      }
    });
  }
});
