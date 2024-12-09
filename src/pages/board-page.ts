// src/pages/board.page.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class BoardPage extends BasePage {
  private readonly selectors = {
    // Column selectors
    todoColumn: '.bg-gray-50 h2:has-text("To Do")',
    inProgressColumn: '.bg-gray-50 h2:has-text("In Progress")',
    reviewColumn: '.bg-gray-50 h2:has-text("Review")',
    doneColumn: '.bg-gray-50 h2:has-text("Done")',
    
    mobileApplicationLink: '//h2[text()="Mobile Application"]',
    
    // Task card selectors
    taskCard: (taskName: string) => `h3:has-text("${taskName}")`,
    taskDescription: (taskName: string) => `h3:has-text("${taskName}") + p`,
    
    // Tag selectors
    featureTag: 'span.bg-blue-100.text-blue-800:has-text("Feature")',
    highPriorityTag: 'span.bg-orange-100.text-orange-800:has-text("High Priority")',
    bugTag: 'span.bg-red-100.text-red-800:has-text("Bug")',
    designTag: 'span.bg-purple-100.text-purple-800:has-text("Design")',
    
    // Task details selectors
    assignee: '.text-gray-500 svg.lucide-user + span',
    dueDate: '.text-gray-500 svg.lucide-calendar + span',
    
    // Column content selectors
    columnContainer: (columnName: string) => 
      `//div[./h2[contains(text(), "${columnName}")]]`,
    taskCardsInColumn: (columnName: string) => 
      `//div[./h2[contains(text(), "${columnName}")]]/div[@class="flex flex-col gap-3"]//div[contains(@class, "bg-white")]`,
    
    // Tag container
    tagContainer: '.flex.flex-wrap.gap-2'
  };

  constructor(page: Page) {
    super(page);
  }
    
  async navigateToMobileApplication() {
    try {
      await this.page.locator(this.selectors.mobileApplicationLink).click();
      console.log('Successfully clicked on Mobile Application');
    } catch (error) {
      console.error('Failed to click on Mobile Application:', error);
      throw error;
    }
  }

  async getTaskAssignee(taskName: string): Promise<string | null> {
    try {
      const taskCard = await this.page.locator(this.selectors.taskCard(taskName)).locator('..').locator('..');
      const assigneeText = await taskCard.locator(this.selectors.assignee).textContent();
      return assigneeText ? assigneeText.trim() : null;
    } catch (error) {
      console.error(`Error getting assignee for task ${taskName}:`, error);
      return null;
    }
  }

  async getTaskDueDate(taskName: string): Promise<string | null> {
    try {
      const taskCard = await this.page.locator(this.selectors.taskCard(taskName)).locator('..').locator('..');
      const dateText = await taskCard.locator(this.selectors.dueDate).textContent();
      return dateText ? dateText.trim() : null;
    } catch (error) {
      console.error(`Error getting due date for task ${taskName}:`, error);
      return null;
    }
  }

  async verifyTaskInColumn(taskName: string, columnName: string) {
    const column = this.page.locator(this.selectors.columnContainer(columnName));
    const task = column.locator(this.selectors.taskCard(taskName));
    await expect(task).toBeVisible();
  }

  async verifyTaskTags(taskName: string, expectedTags: string[]) {
    const taskCard = await this.page.locator(this.selectors.taskCard(taskName)).locator('..').locator('..');
    
    for (const tag of expectedTags) {
      const tagElement = taskCard.locator(this.selectors.tagContainer)
        .locator(`span:has-text("${tag}")`);
      await expect(tagElement).toBeVisible();
    }
  }

  async getAllTasksInColumn(columnName: string): Promise<string[]> {
    const tasks = await this.page
      .locator(this.selectors.taskCardsInColumn(columnName))
      .locator('h3')
      .allTextContents();
    return tasks;
  }

  async verifyTaskDescription(taskName: string, expectedDescription: string) {
    const description = await this.page
      .locator(this.selectors.taskDescription(taskName))
      .textContent();
    expect(description?.trim()).toBe(expectedDescription);
  }

  async verifyTaskAssignee(taskName: string, expectedAssignee: string) {
    const assignee = await this.getTaskAssignee(taskName);
    expect(assignee).toBe(expectedAssignee);
  }

  async verifyTaskDueDate(taskName: string, expectedDate: string) {
    const dueDate = await this.getTaskDueDate(taskName);
    expect(dueDate).toBe(expectedDate);
  }
}