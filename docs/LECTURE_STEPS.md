# Section 04: Building a Framework


## Visual Project Tree

```
PW-API-TESTING/
│
├── 📁 docs/
│   └── 📄 LECTURE_STEPS.md                    # Lecture notes and examples for Section 04
│
├── 📁 node_modules/                           # Node.js dependencies (excluded from git)
│
├── 📁 playwright-report/                      # Playwright HTML test reports
│   └── 📄 index.html                          # Test execution report
│
├── 📁 test-results/                           # Test execution artifacts (excluded from git)
│
├── 📁 tests/                                  # Test suite directory
│   ├── 📄 01-example.spec.ts                  # Basic API test examples (GET, POST, PUT, DELETE)
│   ├── 📄 02-hooks.spec.ts                    # Tests demonstrating beforeAll/afterAll hooks
│   ├── 📄 03-smokeTest.spec.ts                # Smoke tests for API endpoints
│   └── 📄 04-smokeTestWithFixture.spec.ts     # Tests using custom fixtures
│
├── 📁 utils/                                  # Utility modules
│   ├── 📄 fixtures.ts                         # Playwright custom fixtures definition
│   └── 📄 request-handler.ts                  # RequestHandler class for API request building
│
├── 📄 .gitignore                              # Git ignore rules
├── 📄 package.json                            # Node.js project configuration
├── 📄 package-lock.json                       # Dependency lock file
├── 📄 playwright.config.ts                    # Playwright test configuration
├── 📄 README.md                               # Project documentation
└── 📄 PROJECT_STRUCTURE.md                     # This file - project structure documentation
```

## Project Overview

### Purpose
This is a **Playwright API Testing** project designed to test REST API endpoints using Playwright's request API. The project demonstrates various testing patterns including basic API tests, hooks, and custom fixtures.

### Technology Stack
- **Testing Framework**: Playwright Test (`@playwright/test`)
- **Language**: TypeScript
- **Node.js**: TypeScript support via `@types/node`

### Key Components

#### 📁 Configuration Files
- **`playwright.config.ts`**: Main Playwright configuration
  - Test directory: `./tests`
  - Parallel execution enabled
  - HTML and list reporters configured
  - Chromium browser project configured

- **`package.json`**: Project metadata and dependencies
  - Project name: `pw-api-testing`
  - Version: `1.0.0`
  - Dependencies: `@playwright/test`, `@types/node`

#### 📁 Test Files (`tests/`)
1. **`01-example.spec.ts`**: Comprehensive API test examples
   - GET tags endpoint test
   - GET articles endpoint test
   - POST and GET article flow
   - POST and DELETE article flow
   - POST, PUT (PATCH), and DELETE article flow

2. **`02-hooks.spec.ts`**: Demonstrates test hooks
   - `beforeAll`: Authentication setup (runs once before all tests)
   - `afterAll`: Cleanup (runs once after all tests)
   - Multiple test cases using shared authentication token

3. **`03-smokeTest.spec.ts`**: Smoke tests for critical API endpoints
   - Similar structure to `01-example.spec.ts` but focused on smoke testing

4. **`04-smokeTestWithFixture.spec.ts`**: Tests using custom fixtures
   - Uses custom `api` fixture from `utils/fixtures.ts`
   - Demonstrates RequestHandler usage

#### 📁 Utility Modules (`utils/`)
1. **`fixtures.ts`**: Custom Playwright fixtures
   - Extends base Playwright test with custom `api` fixture
   - Provides `RequestHandler` instance to all tests

2. **`request-handler.ts`**: API request builder class
   - Fluent API for building HTTP requests
   - Methods: `url()`, `path()`, `params()`, `headers()`, `body()`
   - Default base URL: `https://conduit-api.bondaracademy.com/api`
   - Private `getUrl()` method for URL construction

#### 📁 Documentation (`docs/`)
- **`LECTURE_STEPS.md`**: Educational content
  - Section 04: Building a Framework
  - Lecture 029: URL Builder
  - Examples and explanations of URL building logic

### API Endpoints Tested
The project tests the **Conduit API** (`https://conduit-api.bondaracademy.com/api`):
- `/api/tags` - GET tags
- `/api/articles` - GET articles (with pagination)
- `/api/articles/` - POST new article
- `/api/articles/{slug}` - GET, PUT, DELETE article by slug
- `/api/users/login` - POST user authentication

### Test Execution
Run tests using:
```bash
npx playwright test
```

### Generated Directories
- **`test-results/`**: Test execution artifacts (screenshots, traces, videos)
- **`playwright-report/`**: HTML test reports

### Git Status
- Current branch: `feature/section04`
- Modified files: `tests/04-smokeTestWithFixture.spec.ts`, `utils/request-handler.ts`
- Untracked: `docs/` directory



## Lecture 029: URL Builder

### 1. Full Example and Result

#### Let’s assume the following values:

```ts
this.baseUrl = "https://api.example.com";
this.apiPath = "/articles";
this.queryParams = { limit: 10, tag: "js", featured: true };
```

#### First, the getUrl() method builds the base URL:
```ts
const url = new URL("https://api.example.com/articles");
```

#### Then the `for` loop will perform 3 iterations:
* Iteration 1: `key = "limit"`, `value = 10` → adds `?limit=10`
* Iteration 2: `key = "tag"`, `value = "js"` → adds `&tag=js`
* Iteration 3: `key = "featured"`, `value = true` → adds `&featured=true`

#### Final Result:
```bash
https://api.example.com/articles?limit=10&tag=js&featured=true
```

### 2. fixture:
```ts
/* utils/fixtures.ts */
import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";

export type TestOptions = {
  api: RequestHandler
}

export const test = base.extend<TestOptions>({
  api: async ({ }, use) => {
    const requestHandler = new RequestHandler();
    await use(requestHandler);
  }
})
```

### 3. Request-handler
```ts
/* utils/request-handler.ts */
export class RequestHandler {
  private baseUrl: string = "";
  private defaultBaseUrl: string = "https://conduit-api.bondaracademy.com/api";
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: object = {};
  private apiBody: object = {};

  url(url: string) {
    this.baseUrl = url;
    return this;
  }

  path(path: string) {
    this.apiPath = path;
    return this;
  }

  params(params: object) {
    this.queryParams = params;
    return this;
  }

  headers(headers: object) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);

    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    console.log("\n🚀 url: ", url.toString(), "\n");
  }
}
```


### 4. SmokeTextqWithFixture.spec.ts:
```ts
/* tests/04-smokeTestWithFixture.spec.ts */
import { test } from "../utils/fixtures";

test("First Test using RequestHandler class", async ({ api }) => {
  api
    .url("https://random-url.com/api")
    .path("/articles")
    .params({ limit: 10, offset: 0, foo: "bar" })
    .headers({ Authorization: "authToken" })
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } })
    .getUrl();  // 💥
});
```