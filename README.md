# Playwright Test Automation Framework
This repository contains an automated testing framework built with Playwright for testing the task management application.

# Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern code editor (VS Code recommended)

# Installation

1. Clone the repository:
```
git clone <repository-url>
cd playwright-data-driven
```
2. Install dependencies:
```
npm install
```
3. npx playwright install
```
npx playwright install
```

# Project Structure

```
playwright-data-driven/
├── src/
│   ├── pages/           # Page Object Models
│   │   ├── base-page.ts
│   │   ├── login.page.ts
│   │   └── board.page.ts
│   ├── fixtures/        # Test Data
│   │   └── test-data/
│   │       └── task-data.ts
│   └── utils/          # Utility functions
│       └── env-config.ts
├── tests/
│   └── e2e/           # End-to-end tests
│       └── task-verification.spec.ts
├── .env               # Environment variables
├── playwright.config.ts
└── README.md

```

# Configuration

1. Create a .env file in the project root:

```
BASE_URL=<url>
USERNAME=<username>
PASSWORD=<password>
```
# Running Tests

Run all tests:
```
npx playwright test
```

Run specific test file:
```
npx playwright test tests/e2e/task-verification.spec.ts
```

# Test Reports

View HTML report:

```
npx playwright show-report
```

# Writing Tests

Example test structure:
```
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { BoardPage } from '../../src/pages/board.page';

test('Verify task in column', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const boardPage = new BoardPage(page);

  await page.goto('/');
  await loginPage.login('<username>', '<password>');
  await boardPage.verifyTaskInColumn('Implement user authentication', 'To Do');
});
```

# Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

# Best Practices

1. Use Page Object Model pattern
2. Keep selectors in page objects
3. Use data-driven approach
4. Add meaningful assertions
5. Write descriptive test names
6. Handle errors gracefully
7. Use environment variables for configuration

# Troubleshooting
Common issues and solutions:

1. Tests failing to start:
    - Check if Playwright browsers are installed
    - Verify environment variables

2. Element not found:
    - Check if selectors are correct
    - Ensure proper wait mechanisms
    - Verify page load state


3. Authentication issues:
    - Verify credentials in .env file
    - Check if login page is accessible

License
This project is licensed under the MIT License - see the LICENSE file for details.