import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}
  
    async navigate(url: string) {
      await this.page.goto(url);
    }
  
    async waitForElement(selector: string) {
      await this.page.waitForSelector(selector);
    }
  
    async getText(selector: string) {
      return await this.page.locator(selector).textContent();
    }
  
    async clickElement(selector: string) {
      await this.page.click(selector);
    }
  
    async typeText(selector: string, text: string) {
      await this.page.fill(selector, text);
    }
  }