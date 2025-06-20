import { Page, Locator, expect } from '@playwright/test';
//import { LOCATORS } from './locator_constants';
import { APP_CONSTANTS } from '../data/app_constants';
import { VALIDATION_MESSAGES } from '../data/validation_messages_constants';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.login-form p');
  }

  /**
   * Navigate to the login page
   */
  async gotoLogin() {
    await this.page.getByRole('link', { name: /Signup \/ Login/i }).click();
  }

  /**
   * Fill in login credentials
   */
  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Perform login with valid credentials from constants
   */
  async loginWithValidCredentials() {
    await this.login(
      APP_CONSTANTS.TEST_USER.VALID_USERNAME,
      APP_CONSTANTS.TEST_USER.VALID_PASSWORD
    );
  }

  /**
   * Perform login with invalid credentials from constants
   */
  async loginWithInvalidCredentials() {
    await this.login(
      APP_CONSTANTS.TEST_USER.INVALID_USERNAME,
      APP_CONSTANTS.TEST_USER.INVALID_PASSWORD
    );
  }

  /**
   * Assert logged in
   */
  async assertLoggedIn(name: string) {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
  }

  /**
   * Assert login error
   */
  async assertLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Verify error message matches expected validation message
   */
  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  /**
   * Verify invalid credentials error message
   */
  async verifyInvalidCredentialsError() {
    await this.verifyErrorMessage(VALIDATION_MESSAGES.LOGIN.INVALID_CREDENTIALS);
  }

  /**
   * Verify empty username error message
   */
  async verifyEmptyUsernameError() {
    await this.verifyErrorMessage(VALIDATION_MESSAGES.LOGIN.EMPTY_USERNAME);
  }

  /**
   * Verify empty password error message
   */
  async verifyEmptyPasswordError() {
    await this.verifyErrorMessage(VALIDATION_MESSAGES.LOGIN.EMPTY_PASSWORD);
  }

  /**
   * Clear email field
   */
  async clearEmail() {
    await this.emailInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Get email field value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Wait for successful login redirect
   */
  async waitForSuccessfulLogin() {
    await this.page.waitForURL('**/dashboard', { timeout: APP_CONSTANTS.DEFAULT_TIMEOUT });
  }
} 