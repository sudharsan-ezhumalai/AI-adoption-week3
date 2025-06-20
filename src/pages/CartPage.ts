import { Page, Locator, expect } from '@playwright/test';
import { APP_CONSTANTS } from '../data/app_constants';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly placeOrderButton: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;
  readonly orderPlacedText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: /Cart/ });
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    this.nameOnCardInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.getByRole('textbox', { name: 'ex.' });
    this.expiryMonthInput = page.getByRole('textbox', { name: 'MM' });
    this.expiryYearInput = page.getByRole('textbox', { name: 'YYYY' });
    this.payAndConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
    this.orderPlacedText = page.getByText('Order Placed!');
  }

  async goToCart() {
    await expect(this.cartLink.first()).toBeVisible();
    await this.cartLink.first().waitFor({ state: 'visible' });
    await this.cartLink.first().click();
  }

  async proceedToCheckout() {
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.waitFor({ state: 'visible' });
    await this.proceedToCheckoutButton.click();
  }

  async placeOrder() {
    await expect(this.placeOrderButton).toBeVisible();
    await this.placeOrderButton.waitFor({ state: 'visible' });
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails({ name, cardNumber, cvc, month, year }: any) {
    await expect(this.nameOnCardInput).toBeVisible();
    await this.nameOnCardInput.waitFor({ state: 'visible' });
    await this.nameOnCardInput.fill(name);
    await expect(this.cardNumberInput).toBeVisible();
    await this.cardNumberInput.waitFor({ state: 'visible' });
    await this.cardNumberInput.fill(cardNumber);
    await expect(this.cvcInput).toBeVisible();
    await this.cvcInput.waitFor({ state: 'visible' });
    await this.cvcInput.fill(cvc);
    await expect(this.expiryMonthInput).toBeVisible();
    await this.expiryMonthInput.waitFor({ state: 'visible' });
    await this.expiryMonthInput.fill(month);
    await expect(this.expiryYearInput).toBeVisible();
    await this.expiryYearInput.waitFor({ state: 'visible' });
    await this.expiryYearInput.fill(year);
    await expect(this.payAndConfirmButton).toBeVisible();
    await this.payAndConfirmButton.waitFor({ state: 'visible' });
    await this.payAndConfirmButton.click();
  }

  async assertOrderPlaced() {
    await expect(this.orderPlacedText).toBeVisible();
    await this.orderPlacedText.waitFor({ state: 'visible' });
  }
} 