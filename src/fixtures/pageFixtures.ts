import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { env } from '../../environment/env';

// Extend the base test with custom fixtures
export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  page: async ({ page }, use) => {
    page.setDefaultTimeout(env.TIMEOUT);
    page.setDefaultNavigationTimeout(env.TIMEOUT);
    await page.goto(env.BASE_URL);
    await use(page);
  },
});

export { expect } from '@playwright/test';
export { test as baseTest } from '@playwright/test'; 