import { test, expect } from '@playwright/test';
import { parseStringPromise } from 'xml2js';
import { HomePage } from './pom/HomePage';
import { NavigationPage } from './pom/NavigationPage';

test.describe('Lead Capture Form Validation', () => {
    let homePage: HomePage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        navigationPage = new NavigationPage(page);
        await homePage.navigate('/');
    });

    test('Newsletter form should be present and functional', async () => {
        // Verify form elements
        const heading = await homePage.getNewsletterHeading();
        await expect(heading).toBeVisible();

        // Submit form
        await homePage.submitNewsletterForm('test@123.com');

        // Wait for page load (sometimes loading takes too much time and hit's expect timeout of 10 sec)
        await homePage.waitPageLoad();
      

        // Verify success
        const thankYouMessage = await homePage.getThankYouMessage();
        await expect(thankYouMessage).toBeVisible();
    });

    test('Newsletter form with invalid email', async () => {
      // Verify form elements
      const heading = await homePage.getNewsletterHeading();
      await expect(heading).toBeVisible();

      // Submit form
      await homePage.submitNewsletterForm('test@123');

      
        // Wait for page load (sometimes loading takes too much time and hit's expect timeout of 10 sec)
        await homePage.waitPageLoad();

      // Verify success
      const thankYouMessage = await homePage.getThankYouMessage();
      await expect(thankYouMessage).not.toBeVisible();
  });
});

test.describe('Sitemap and Crawlability Verification', () => {
  // Verify that sitemap.xml exists
  test('Verify that sitemap.xml exists', async ({ page }) => {
    const response = await page.request.get('https://www.netlify.com/sitemap.xml');
    expect(response.status()).toBe(200);
  });


  // Verify that important pages are crawlable according to robots.txt
  test('Verify that important pages are crawlable as per robots.txt', async ({ page }) => {
    const response = await page.request.get('https://www.netlify.com/robots.txt');
    expect(response.status()).toBe(200);
    const robotsTxt = await response.text();

    const disallowedPaths = robotsTxt
      .split('\n')
      .filter(line => line.trim().startsWith('Disallow:'))
      .map(line => line.replace('Disallow:', '').trim())
      .filter(Boolean);

    const importantPaths = ['/', '/about/', '/features/'];

    for (const impPath of importantPaths) {
      for (const disallowed of disallowedPaths) {
        expect(impPath.startsWith(disallowed)).toBeFalsy();
      }
    }
  });

  // 5. Sitemap accessibility check
  test('Sitemap accessibility check', async ({ request }) => {
    // Request sitemap
    const response = await request.get('/sitemap.xml');
    
    // Verify response status and headers
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');
    
    // Basic content check
    const text = await response.text();
    expect(text).toContain('<?xml');
    expect(text).toContain('<urlset');
  });

  // Verify basic site crawlability
  test('Verify basic site crawlability', async ({ request }) => {
    // Check robots.txt exists and is accessible
    const robotsTxt = await request.get('/robots.txt');
    expect(robotsTxt.status()).toBe(200);
    
    // Test critical pages are allowed
    const criticalPaths = [
      '/',
      '/products',
      '/pricing',
      '/contact'
    ];

    // Verify each path is accessible
    for (const path of criticalPaths) {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    }
  });
});

test.describe('Link Verification', () => {
    test('Check that all links on the homepage do not lead to 404', async ({ page }) => {
        const navigationPage = new NavigationPage(page);
        await navigationPage.navigate('/');
        
        const links = await navigationPage.getAllLinks();
        
        for (const link of links) {
            const response = await navigationPage.checkPath(link);
            expect(response.status()).not.toBe(404);
        }
    });
});
