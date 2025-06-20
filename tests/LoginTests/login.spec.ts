import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import fs from 'fs';
import path from 'path';
import { env } from '../../environment/env';
import { APP_CONSTANTS } from '../../src/data/app_constants';
import { VALIDATION_MESSAGES } from '../../src/data/validation_messages_constants';

test.describe('Login Functionality', () => {
  // Use the latest created user from the JSON file
  const userDataPath = path.join(__dirname, '../../test-data/created-users.json');
  const users = fs.existsSync(userDataPath) ? JSON.parse(fs.readFileSync(userDataPath, 'utf-8')) : [];
  const user = users.length > 0 ? users[users.length - 1] : { name: 'TestUser', email: 'test@example.com', password: 'Password@123' };

  test('should login with valid credentials', async ({ page }) => {
    await page.goto(env.BASE_URL);
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(user.email, user.password);
    await loginPage.assertLoggedIn(user.name);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto(env.BASE_URL);
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login('invalid@example.com', 'WrongPassword');
    await loginPage.assertLoginError();
  });


  


}); 