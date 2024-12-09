import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { BoardPage } from '../../src/pages/board-page';
import { DataLoader } from '../../src/utils/data-loader';
import { EnvConfig } from '../../src/utils/env-config';



// Load test data from our JSON file
const { loginTests, tasks, columns } = DataLoader.loadTestData('login-tests.json');

test.describe('Task Management Tests @tm', () => {
  let loginPage: LoginPage;
  let boardPage: BoardPage;

  // Before all tests in this file
  test.beforeAll(async () => {
    console.log('Starting Task Management test suite');
  });

  // Before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    boardPage = new BoardPage(page);
    const { username, password } = EnvConfig.getCredentials();


    // Setup steps
    await page.goto('/');
    await loginPage.login(username, password);
  });

  // After each test
  test.afterEach(async ({ page }) => {
    // Cleanup or verification steps
    console.log('Test completed:', await page.title());
  });

  // After all tests
  test.afterAll(async () => {
    console.log('Completed Task Management test suite');
  });

  // Test case 1
  test('Verify user authentication task in Todo column', async () => {
    const { userAuthentication } = tasks;
    await boardPage.verifyTaskInColumn(userAuthentication.name, userAuthentication.expectedColumn);
    await boardPage.verifyTaskTags(userAuthentication.name, userAuthentication.tags);
  });

  // Test case 2
  test('Verify fix navigation bug task in Todo column', async () => {
    const { navigationBug } = tasks;
    await boardPage.verifyTaskInColumn(navigationBug.name, navigationBug.expectedColumn);
    await boardPage.verifyTaskTags(navigationBug.name, navigationBug.tags);
  });
    
  // Test case 3
  test('Verify fix navigation bug task in In Progres column', async () => {
    const { systemUpdate } = tasks;
    await boardPage.verifyTaskInColumn(systemUpdate.name, systemUpdate.expectedColumn);
    await boardPage.verifyTaskTags(systemUpdate.name, systemUpdate.tags);
  });
  
  // Test case 4
  test('Verify Push notification systemn task in Todo column', async () => {
    const { pushNotification } = tasks;
    await boardPage.navigateToMobileApplication();
    await boardPage.verifyTaskInColumn(pushNotification.name, pushNotification.expectedColumn);
    await boardPage.verifyTaskTags(pushNotification.name, pushNotification.tags);
  });
    
  // Test case 5
  test('Verify Offline mode task in In Progress column', async () => {
    const { offlineMode } = tasks;
    await boardPage.navigateToMobileApplication();
    await boardPage.verifyTaskInColumn(offlineMode.name, offlineMode.expectedColumn);
    await boardPage.verifyTaskTags(offlineMode.name, offlineMode.tags);
  });
    
  // Test case 6
  test('Verify API icon design task in Done column', async () => {
    const { iconDesign } = tasks;
    await boardPage.navigateToMobileApplication();
    await boardPage.verifyTaskInColumn(iconDesign.name, iconDesign.expectedColumn);
    await boardPage.verifyTaskTags(iconDesign.name, iconDesign.tags);
  });

  
});
