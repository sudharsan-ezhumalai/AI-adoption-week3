import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;
  readonly logo: Locator;
  readonly mainNavigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.cartIcon = page.getByRole('link', { name: /Cart/ });
    this.logo = page.locator('.navbar-brand');
    this.mainNavigation = page.locator('.navbar-nav');
  }

  /**
   * Navigate to the home page
   */
  async goto(baseUrl: string) {
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search for a product
   */
  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on cart icon
   */
  async clickCartIcon() {
    await this.cartIcon.first().click();
  }

  /**
   * Click on logo to go to home page
   */
  async clickLogo() {
    await this.logo.click();
    await this.page.waitForLoadState('networkidle');
  }
} 