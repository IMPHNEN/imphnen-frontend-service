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
        await page.goto(`${baseURL}${route}`, { 
          waitUntil: 'networkidle',
          timeout: 30000 
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
      } catch (error) {
        console.error(`Failed to capture ${route}:`, error.message);
      }
    });
  }
});
