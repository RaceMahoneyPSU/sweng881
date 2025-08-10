# sweng881

Automated API and UI testing for [LibreTranslate](https://libretranslate.com) using Postman and Playwright, integrated with GitHub Actions.

## Features

- **API Tests:** Runs Postman collections for multiple languages using CSV data files.
- **UI Tests:** Uses Playwright for browser-based testing.
- **GitHub Actions:** Automated workflows for CI/CD, including test result reporting in the GitHub UI.
- **JUnit XML Reporting:** Test results are exported and uploaded as artifacts.
- **Test Results in GitHub UI:** Uses dorny/test-reporter for visible feedback on PRs and commits.

## Getting Started

### Prerequisites

- Node.js (for UI tests)
- Postman CLI
- GitHub repository with Actions enabled

### Running Locally

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/sweng881.git
    cd sweng881
    ```

2. Install dependencies for UI tests:
    ```sh
    npm install
    npx playwright install --with-deps
    ```

3. Run Postman API tests:
    ```sh
    postman collection run <collection-id> -e <environment-id> --iteration-data data/<lang>.csv --reporters cli,junit --reporter-junit-export results/<lang>.xml
    ```

4. Run Playwright UI tests:
    ```sh
    npx playwright test --reporter=junit --output=results
    ```

### GitHub Actions

- On each push, workflows will:
  - Run API tests for each language.
  - Run Playwright UI tests.
  - Upload JUnit XML results as artifacts.
  - Report results in the GitHub Tests UI.

## Authors

Race Mahoney
David Luo

