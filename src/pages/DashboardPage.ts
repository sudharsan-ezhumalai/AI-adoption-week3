import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('link', { name: /Logout/i });
  }

  /**
   * Perform logout
   */
  async logout() {
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
} 