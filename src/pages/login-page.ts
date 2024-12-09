import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  // Define selectors as private readonly properties for maintainability
  private readonly selectors = {
    usernameInput: 'input[id="username"]',
    passwordInput: 'input[id="password"]',
    loginButton: 'button[type="submit"]',
    errorMessage: '.error-message',
    dashboardContainer: '//h1[text()="Projects"]'
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin() {
    try {
      await this.page.goto('/');
      console.log('Successfully navigated to homepage:', this.page.url());
    } catch (error) {
      console.error('Failed to navigate to homepage:', error);
      throw error;
    }
  }

  /**
   * Perform login with given credentials
   * @param username - User username
   * @param password - User password
   */
  async login(username: string, password: string) {
    // Wait for the username input to be visible before starting
    await this.page.waitForSelector(this.selectors.usernameInput);
    
    // Fill in login credentials
    await this.typeText(this.selectors.usernameInput, username);
    await this.typeText(this.selectors.passwordInput, password);
    
    // Click login and wait for navigation or error
    await Promise.race([
      this.clickElement(this.selectors.loginButton),
      this.page.waitForNavigation(),
      this.page.waitForSelector(this.selectors.errorMessage, { timeout: 5000 }).catch(() => null)
    ]);
  }

  /**
   * Get error message text if present
   * @returns Promise<string | null>
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      const errorElement = await this.page.waitForSelector(this.selectors.errorMessage, { timeout: 5000 });
      return errorElement ? await errorElement.textContent() : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is successfully logged in
   * @returns Promise<boolean>
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.selectors.dashboardContainer, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}