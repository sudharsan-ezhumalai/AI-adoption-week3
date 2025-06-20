import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductPage } from '../src/pages/ProductPage';
import { CartPage } from '../src/pages/CartPage';
import { env } from '../environment/env';
import fs from 'fs';
import path from 'path';

// Use the latest created user from the JSON file
const userDataPath = path.join(__dirname, '../test-data/created-users.json');
const users = fs.existsSync(userDataPath) ? JSON.parse(fs.readFileSync(userDataPath, 'utf-8')) : [];
const user = users.length > 0 ? users[users.length - 1] : { name: 'TestUser', email: 'test@example.com', password: 'Password@123' };
const payment = {
  name: user.name,
  cardNumber: '4111111111111111',
  cvc: '123',
  month: '08',
  year: '2030',
};

test('Add product to cart and checkout flow', async ({ page }) => {
  // Login first
  await page.goto(env.BASE_URL);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.login(user.email, user.password);
  await loginPage.assertLoggedIn(user.name);

  // Add first product to cart
  const productPage = new ProductPage(page);
  await productPage.addFirstProductToCart();

  // Go to cart and proceed to checkout
  const cartPage = new CartPage(page);
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();
  await cartPage.placeOrder();

  // Fill payment details and confirm order
  await cartPage.fillPaymentDetails(payment);
  await cartPage.assertOrderPlaced();
}); 