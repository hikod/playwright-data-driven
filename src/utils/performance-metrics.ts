import { Page } from "@playwright/test";

export class PerformanceMetrics {
    static async capturePageMetrics(page: Page) {
      const metrics = await page.evaluate(() => ({
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      }));
      
      return metrics;
    }
  
    static async monitorApiResponse(request: any) {
      const startTime = Date.now();
      const response = await request;
      const duration = Date.now() - startTime;
      
      return {
        duration,
        status: response.status(),
        size: response.headers()['content-length'] || 0
      };
    }
  }
  