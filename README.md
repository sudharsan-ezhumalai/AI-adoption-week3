# Playwright Test Automation Framework

A comprehensive Playwright test automation framework with environment configuration, page object model, and CI/CD integration.

## Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD workflow
├── environment/
│   ├── .env.staging               # Staging environment variables
│   └── env.ts                     # Environment configuration module
├── src/
│   ├── data/
│   │   ├── app_constants.ts       # Application constants and test data
│   │   └── validation_messages_constants.ts  # Validation message constants
│   ├── fixtures/
│   │   └── pageFixtures.ts        # Custom Playwright fixtures
│   ├── pages/
│   │   ├── locator_constants.ts   # Centralized locator definitions
│   │   ├── HomePage.ts            # Home page object
│   │   ├── LoginPage.ts           # Login page object
│   │   └── DashboardPage.ts       # Dashboard page object
├── tests/
│   ├── LoginTests/
│   │   └── login.spec.ts          # Login functionality tests
│   └── PurchaseProductTests/
│       └── purchase-product.spec.ts  # Purchase flow tests
├── playwright.config.ts           # Playwright configuration
├── global-setup.ts                # Global test setup
├── global-teardown.ts             # Global test teardown
└── package.json
```

## Environment Configuration

The framework uses a flexible environment configuration system that allows you to run tests against different environments (development, staging, production).

### Environment Variables

The `environment/env.ts` module loads environment variables based on the `NODE_ENV` setting:

- **Development**: Uses `.env.local` (if exists) or default values
- **Staging**: Uses `.env.staging`
- **Production**: Uses `.env.production`

### Key Environment Variables

```typescript
interface EnvironmentConfig {
  NODE_ENV: string;           // Environment name (development, staging, production)
  BASE_URL: string;           // Base URL for the application
  USERNAME: string;           // Test username
  PASSWORD: string;           // Test password
  API_BASE_URL: string;       // API base URL
  TIMEOUT: number;            // Default timeout in milliseconds
  HEADLESS: boolean;          // Run tests in headless mode
  SLOW_MO: number;            // Slow down test execution (for debugging)
}
```

### How Environment Configuration Works

1. **Environment Detection**: The framework automatically detects the environment based on `NODE_ENV`
2. **Variable Loading**: Environment-specific `.env` files are loaded using dotenv
3. **Default Values**: If environment variables are not set, sensible defaults are used
4. **Type Safety**: All environment variables are typed using TypeScript interfaces
5. **Validation**: Required environment variables are validated with warnings

### Usage Examples

```bash
# Run tests in development environment
npm test

# Run tests in staging environment
npm run test:staging

# Run tests with custom environment
NODE_ENV=staging BASE_URL=https://staging.example.com npm test
```

## Page Object Model

The framework implements a robust Page Object Model (POM) pattern:

### Locator Constants (`src/pages/locator_constants.ts`)

Centralized locator definitions using data-testid attributes:

```typescript
export const LOCATORS = {
  LOGIN: {
    FORM: '[data-testid="login-form"]',
    USERNAME_INPUT: '[data-testid="username-input"]',
    PASSWORD_INPUT: '[data-testid="password-input"]',
    LOGIN_BUTTON: '[data-testid="login-button"]',
  },
  // ... more locators
};
```

### Page Objects

Each page has its own class with methods for common interactions:

```typescript
export class LoginPage {
  constructor(page: Page) {
    this.loginForm = page.locator(LOCATORS.LOGIN.FORM);
    this.usernameInput = page.locator(LOCATORS.LOGIN.USERNAME_INPUT);
    // ... more locators
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Custom Fixtures (`src/fixtures/pageFixtures.ts`)

Custom Playwright fixtures that provide page objects to tests:

```typescript
export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  // ... more fixtures
});
```

## Test Organization

### Test Structure

Tests are organized by functionality:

- **LoginTests**: Authentication and login-related tests
- **PurchaseProductTests**: E-commerce purchase flow tests
- **API Tests**: API endpoint tests (if needed)
- **Visual Tests**: Visual regression tests (if needed)

### Test Examples

```typescript
test.describe('Login Functionality', () => {
  test('should login with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.loginWithValidCredentials();
    await loginPage.waitForSuccessfulLogin();
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });
});
```

## CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/playwright.yml` file provides:

- **Parallel Test Execution**: Tests run in parallel using sharding
- **Environment-Specific Testing**: Different configurations for different environments
- **Artifact Upload**: Test reports and screenshots are uploaded as artifacts
- **Retry Logic**: Failed tests are retried on CI
- **Matrix Strategy**: Tests run on multiple browsers

### Workflow Features

1. **Test Sharding**: Tests are distributed across multiple runners for faster execution
2. **Environment Secrets**: Sensitive data is stored as GitHub secrets
3. **Conditional Execution**: Staging tests only run on main branch
4. **Artifact Management**: Test results are preserved for analysis

## Running Tests

### Available Scripts

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests against staging environment
npm run test:staging

# Open Playwright UI for interactive testing
npm run test:ui

# Show test report
npm run test:report

# Install Playwright browsers
npm run test:install

# Generate test code
npm run test:codegen

# Show trace viewer
npm run test:trace
```

### Environment-Specific Commands

```bash
# Development
npm test

# Staging
NODE_ENV=staging npm test

# Production
NODE_ENV=production npm test
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

The configuration includes:

- **Environment Integration**: Uses environment variables for configuration
- **Multiple Projects**: Different configurations for different environments
- **Reporting**: HTML, JSON, and JUnit reporters
- **Global Setup/Teardown**: Environment setup and cleanup
- **Screenshot/Video Capture**: Automatic capture on test failure

### Browser Configuration

```typescript
projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      headless: env.HEADLESS,
    },
  },
  {
    name: 'staging',
    use: { 
      ...devices['Desktop Chrome'],
      headless: true,
      baseURL: env.API_BASE_URL,
    },
    testMatch: /.*staging\.spec\.ts/,
  },
]
```

## Best Practices

### 1. Environment Management
- Use environment variables for configuration
- Never commit sensitive data to version control
- Use different configurations for different environments

### 2. Page Object Model
- Keep locators centralized in `locator_constants.ts`
- Use data-testid attributes for reliable element selection
- Implement reusable page object methods

### 3. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent and isolated

### 4. Error Handling
- Use proper wait strategies
- Implement retry logic for flaky tests
- Capture screenshots and videos on failure

### 5. CI/CD
- Use parallel execution for faster feedback
- Implement proper artifact management
- Use environment-specific configurations

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Check that `NODE_ENV` is set correctly
   - Verify `.env` file exists and is properly formatted
   - Ensure dotenv is installed

2. **Tests Failing on CI**
   - Check that all required environment variables are set in GitHub secrets
   - Verify that the application is accessible from CI environment
   - Review test timeouts and retry settings

3. **Locator Issues**
   - Ensure elements have proper `data-testid` attributes
   - Check that locators are updated when UI changes
   - Use Playwright Inspector for debugging

### Debugging Tips

- Use `npm run test:debug` for step-by-step debugging
- Use `npm run test:ui` for interactive testing
- Check test reports with `npm run test:report`
- Use trace viewer with `npm run test:trace`

## Contributing

1. Follow the existing code structure and patterns
2. Add tests for new functionality
3. Update documentation when adding new features
4. Use conventional commit messages
5. Ensure all tests pass before submitting PR

## License

ISC License 