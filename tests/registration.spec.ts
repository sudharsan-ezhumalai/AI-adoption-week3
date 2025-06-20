import { test, expect } from '@playwright/test';
import { SignupPage } from '../src/pages/SignupPage';
import { env } from '../environment/env';
import fs from 'fs';
import path from 'path';

function generateRandomUser() {
  const random = Math.floor(Math.random() * 1000000);
  return {
    name: `TestUser${random}`,
    email: `testuser${random}@yopmail.com`,
    password: 'Password@123',
    day: '13',
    month: '4',
    year: '1997',
    firstName: 'Test',
    lastName: `User${random}`,
    address: '123 park avenue',
    state: 'TN',
    city: 'Chennai',
    zipcode: '600001',
    mobile: '1234567890',
  };
}

test('User registration flow (dynamic data)', async ({ page }) => {
  const user = generateRandomUser();
  // Go to home and click Signup/Login
  await page.goto(env.BASE_URL);
  await page.getByRole('link', { name: /Signup \/ Login/i }).click();

  // Register new user
  const signupPage = new SignupPage(page);
  await signupPage.register(user);

  // Assert user is logged in ("Logged in as ..." is visible)
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

  // Save user data to JSON file
  const userDataPath = path.join(__dirname, '../test-data/created-users.json');
  let users: any[] = [];
  if (fs.existsSync(userDataPath)) {
    users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
  }
  users.push({ name: user.name, email: user.email, password: user.password });
  fs.mkdirSync(path.dirname(userDataPath), { recursive: true });
  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
}); 