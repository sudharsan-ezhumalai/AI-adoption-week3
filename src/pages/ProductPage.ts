import { Page, Locator, expect } from '@playwright/test';
import { APP_CONSTANTS } from '../data/app_constants';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly ProductCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('.overlay-content > .btn').first();
    this.viewCartButton = page.getByText('View Cart');
    this.ProductCard = page.locator("//div[@class='single-products']");
  }

  async addFirstProductToCart() {
    const firstProductCard = this.ProductCard.first();
    await expect(firstProductCard).toBeVisible();
    await firstProductCard.hover();
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
    await expect(this.viewCartButton).toBeVisible();
    await this.viewCartButton.waitFor({ state: 'visible' });
    await this.viewCartButton.click();
  }
} 