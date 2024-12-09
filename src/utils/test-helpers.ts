export class TestHelpers {
    static async retry<T>(
      fn: () => Promise<T>,
      maxAttempts = 3,
      delay = 1000
    ): Promise<T> {
      let lastError;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await fn();
        } catch (error) {
          lastError = error;
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw lastError;
    }
  }