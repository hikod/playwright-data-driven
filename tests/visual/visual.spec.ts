import { test, expect } from '@playwright/test';
import { DataLoader } from '../../src/utils/data-loader';
import { PerformanceMetrics } from '../../src/utils/performance-metrics';

const visualTests = DataLoader.loadTestData('visual-tests.json').visualTests;

test.describe('Visual Regression Tests', () => {
  visualTests.forEach((testCase: { name: string; elements: any; screenshotName: any; }) => {
    test(testCase.name, async ({ page }) => {
      // Capture performance metrics
      const metrics = await PerformanceMetrics.capturePageMetrics(page);
      
      // Take screenshots of specified elements
      for (const element of testCase.elements) {
        const elementHandle = await page.$(element.selector);
        if (elementHandle) {
          await elementHandle.screenshot({
            path: `./test-results/screenshots/${testCase.screenshotName}-${element.name}.png`
          });
        }
      }

      // Compare with baseline using Playwright's built-in comparison
      expect(await page.screenshot())
        .toMatchSnapshot(`${testCase.screenshotName}.png`);
    });
  });
});