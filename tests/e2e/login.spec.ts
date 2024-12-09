import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { DataLoader } from '../../src/utils/data-loader';
import { EnvConfig } from '../../src/utils/env-config';


// Load test data from our JSON file
const { loginTests } = DataLoader.loadTestData('login-tests.json');

test.describe('Login Functionality @login', () => {

  // Test each scenario from our test data
  loginTests.forEach(testCase => {
    test(testCase.name, async ({ page }) => {
      // Create a new instance of our login page
      const loginPage = new LoginPage(page);
      const { username, password } = EnvConfig.getCredentials();
    
      console.log('Navigating to:', EnvConfig.getBaseUrl());

      // Navigate to the login page
      await loginPage.navigateToLogin();
      
      // Perform login with test case credentials
      await loginPage.login(username, password);
      
        // For successful login cases
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });
  });
});
