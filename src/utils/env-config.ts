export class EnvConfig {
    static getBaseUrl(): string {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        throw new Error('BASE_URL environment variable is not set');
      }
      return baseUrl;
    }
  
    static getCredentials(): { username: string; password: string } {
      const username = process.env.USERNAME;
      const password = process.env.PASSWORD;
      
      if (!username || !password) {
        throw new Error('Username or password environment variables are not set');
      }
      
      return { username, password };
    }
  }