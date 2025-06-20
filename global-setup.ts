import { chromium, FullConfig } from '@playwright/test';
import { env } from './environment/env';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  
  // Only run setup if we have a base URL
  if (!baseURL) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the application
  await page.goto(baseURL);

  // Perform any global setup tasks here
  // For example:
  // - Create test data
  // - Set up authentication state
  // - Initialize test database
  // - Set up mock services

  console.log('Global setup completed');
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(`Base URL: ${env.BASE_URL}`);

  await browser.close();
}

export default globalSetup; 