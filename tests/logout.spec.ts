import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { env } from '../environment/env';
import fs from 'fs';
import path from 'path';

// Use the latest created user from the JSON file
const userDataPath = path.join(__dirname, '../test-data/created-users.json');
const users = fs.existsSync(userDataPath) ? JSON.parse(fs.readFileSync(userDataPath, 'utf-8')) : [];
const user = users.length > 0 ? users[users.length - 1] : { name: 'TestUser', email: 'test@example.com', password: 'Password@123' };

test('User logout flow', async ({ page }) => {
  await page.goto(env.BASE_URL);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.login(user.email, user.password);
  await loginPage.assertLoggedIn(user.name);

  // Logout
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.logout();

  // Assert user is logged out (Signup/Login link is visible)
  await expect(page.getByRole('link', { name: /Signup \/ Login/i })).toBeVisible();
}); 