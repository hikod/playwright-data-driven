import { PlaywrightTestConfig } from '@playwright/test';
import CustomReporter from './src/reporters/custom-reporter';

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Validate required environment variables
const validateEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Get environment variables with validation
const BASE_URL = validateEnvVar('BASE_URL');
const USERNAME = validateEnvVar('USERNAME');
const PASSWORD = validateEnvVar('PASSWORD');

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  
  workers: process.env.CI ? 4 : undefined,
  fullyParallel: true,
  
  reporter: [
    ['list'],
    ['html'],
    ['./src/reporters/custom-reporter.ts']
  ],
  
  use: {
    baseURL: process.env.BASE_URL,
    
    // Configure screenshot behavior
    screenshot: {
      mode: 'only-on-failure', // Take screenshots only when tests fail
      fullPage: true, // Capture the full scrollable page area
    },
    
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    
    viewport: { width: 1280, height: 720 },
    headless: process.env.CI ? true : false,
  },
  // Make environment variables available to tests
  globalSetup: path.join(__dirname, 'global-setup.ts'),
  projects: [
    {
      name: 'e2e',
      testDir: './tests/e2e'
    },
    {
      name: 'visual',
      testDir: './tests/visual',
      use: {
        // Override screenshot settings for visual testing project
        screenshot: {
          mode: 'on', // Always take screenshots for visual tests
          fullPage: true
        }
      }
    },
    {
      name: 'api',
      testDir: './tests/integration'
    }
  ]
};

export default config;