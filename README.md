# Netlify E2E Test Suite

## Overview
End-to-end test automation framework for Netlify website featuring:
- Playwright with TypeScript
- Page Object Model (POM) architecture
- Automated form validation
- SEO verification
- Link checking

## Installation Guide

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Windows 10/11
- Visual Studio Code

### Setup Steps

1. Install Playwright
```bash
npm init playwright@latest
```
2. Install browser drivers
```bash
npx playwright install
```
3. Install specific browsers 
```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```
4. Install VS Code Extension
* Open VS Code
* Go to Extensions (Ctrl+Shift+X)
* Search for "Playwright Test for VSCode"
* Click `Install`
  
5. Verify Installation

```bash
# Check Playwright version
npx playwright --version

# Run test to verify setup
npx playwright test --headed
```

### Test execution

```bash
# Run all tests
npx playwright test
```

```bash
# Run specific test file
npx playwright test netlify.spec.ts
```

```bash
# Run with UI Mode
npx playwright test --ui
```

```bash
# Show report
npx playwright show-report
```

## Test Architecture

### Page Object Models
- `BasePage`: Base class with common navigation methods
- `HomePage`: Newsletter form interactions and validations
- `NavigationPage`: Link verification and site navigation

### Test Categories
- Lead Capture Form Validation
- Link Verification
- Sitemap and Crawlability Tests

## Playwright Project Structure

📦 **playwright**  
┣ 📂 **tests**  
┃ ┣ 📂 **pom**  
┃ ┃ ┣ 📄 *BasePage.ts* - Base class with common methods  
┃ ┃ ┣ 📄 *HomePage.ts* - Home page interactions  
┃ ┃ ┗ 📄 *NavigationPage.ts* - Navigation and link handling  
┃ ┗ 📄 *netlify.spec.ts* - Main test specifications  
┣ 📄 *playwright.config.ts* - Test runner configuration  
┣ 📄 *package.json* - Project dependencies  
┣ 📄 *tsconfig.json* - TypeScript configuration  
┗ 📄 *README.md* - Project documentation  

### Project dependecies
```typescript
{
  "dependencies": {
    "@playwright/test": "^1.40.0",
    "typescript": "^5.0.0"
  }
}
```

### Configuration
#### Test Settings 

Framework is configured to use following settings:
* Global timeout 60 seconds
* Expect assertion timeout is 10 seconds
* 2 paralell workers (browser instances) 
* 2 different browsers Chrome, Firefox
* Each test will be retired 2 times on failure
* Tracing in `on` for all test runs (`passed`, `failed` `retried`)
* Screenshot will be taken only on `failed` tests which also failed 2 `retries`
* Video recording is `on` for failed tests
* Testing report is opened automatically after test execution

Settings are configured in `playwright.config.ts` configuration
```typescript

  //  Add timeout configurations
  timeout: 60000, // Global timeout of 60 seconds
  expect: {
    timeout: 10000  // Expect assertion timeout
  },

  // Output folders configuration
  outputDir: './test-results',
  snapshotDir: './test-results/snapshots',

workers: 2,
retries: 2,
reporter: 'html',
use: {
  trace: 'on',
  screenshot: 'only-on-failure'
}

```
Other setting
