# idelsoft-sdet-playwright-challenge

This repository contains an automated testing framework for a web application, built using [Playwright](https://playwright.dev/) and TypeScript. It covers UI, API, and integration tests, and is structured for scalability and maintainability.
Also is created to solve the Idelsoft QA Automation Challenge using [This Test Suite](https://docs.google.com/document/d/15XUldXCAw9fpghxHO4nSr4d-E6PptHtaY3-VHkxFKmQ/edit?usp=sharing)
## Project Structure

```
├── fixtures/         # Custom Playwright fixtures for test setup and utilities
├── pages/            # Page Object Model (POM) classes for UI abstraction
├── services/         # API service classes and types for backend interaction
├── testData/         # Static test data (users, books, secrets)
├── tests/            # Test suites organized by type
│   ├── api/          # API tests
│   ├── integration/  # End-to-end/integration tests
│   └── ui/           # UI tests
├── utils/            # Utility scripts (e.g., data generators)
├── playwright.config.ts # Playwright configuration
├── package.json      # Project metadata and scripts
├── pnpm-lock.yaml    # Dependency lock file
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (recommended)

### Installation

```sh
pnpm install
```

### Running Tests

- Run all tests:
	```sh
	pnpm test
	```
- Run only UI tests:
	```sh
	pnpm test:ui
	```
- Run only API tests:
	```sh
	pnpm test:api
	```
- Run only integration tests:
	```sh
	pnpm test:integration
	```
- Run smoke tests:
	```sh
	pnpm test:smoke
	```

Test results and HTML reports are generated in the `playwright-report/` and `test-results/` folders.

## Test Organization

- **fixtures/**: Custom Playwright fixtures for reusable setup logic (e.g., login, API mocks).
- **pages/**: Implements the Page Object Model for UI automation (e.g., `LoginPage`, `CartPage`).
- **services/**: API client classes and type definitions for backend testing.
- **testData/**: Static data for tests (users, books, secrets).
- **tests/**: Contains all test suites:
	- **api/**: API endpoint tests (e.g., login, registration).
	- **integration/**: End-to-end scenarios (e.g., complete checkout flow).
	- **ui/**: UI interaction tests (e.g., add book to cart, login, search bar).
- **utils/**: Helper scripts (e.g., data generators).

## Configuration

- **playwright.config.ts**: Main Playwright configuration (test directory, retries, reporters, browser projects, environment variables).
- **.env**: (Optional) Place environment variables here for local development.

## Continuous Integration

GitHub Actions workflows are provided in `.github/workflows/` for CI/CD, including Playwright test runs and report uploads.

## Dependencies

- [@playwright/test](https://playwright.dev/docs/test-intro)
- [@faker-js/faker](https://fakerjs.dev/) (for generating fake data)
- [dotenv](https://github.com/motdotla/dotenv) (for environment variable management)

## License

ISC