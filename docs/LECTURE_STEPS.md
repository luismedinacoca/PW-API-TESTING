x# 👨🏾‍💻 Section 04: Building a Framework


## 📑 Table of Contents

- [🧳 Section 04: Building a Framework](#-section-04-building-a-framework)
  - [📚 Lecture 029: URL Builder](#-lecture-029-url-builder)
    - [🧠 29.1 Context](#-291-context)
    - [⚙️ 29.2 Updating code according the context](#️-292-updating-code-according-the-context)
      - [29.2.1 Full Example and Result](#2921-full-example-and-result)
      - [29.2.2 Fixture Implementation](#2922-fixture-implementation)
      - [29.2.3 Request Handler Implementation](#2923-request-handler-implementation)
      - [29.2.4 Test Implementation](#2924-test-implementation)
    - [🧱 29.3 Pending Fixes (TODO)](#-293-pending-fixes-todo)
  - [📚 Lecture 030: Request Handler Constructor](#-lecture-030-request-handler-constructor)
    - [🧠 30.1 Context](#-301-context)
    - [⚙️ 30.2 Updating code according the context](#️-302-updating-code-according-the-context)
      - [30.2.1 Request Handler Constructor Implementation](#3021-request-handler-constructor-implementation)
      - [30.2.2 Updated Fixture Implementation](#3022-updated-fixture-implementation)
    - [🧱 30.3 Pending Fixes (TODO)](#-303-pending-fixes-todo)
  - [📚 Lecture 031: Get Requester](#-lecture-031-get-requester)
    - [🧠 31.1 Context](#-311-context)
    - [⚙️ 31.2 Updating code according the context](#️-312-updating-code-according-the-context)
      - [31.2.1 Create the `getRequest` Method](#3121-create-the-getrequest-method)
      - [31.2.2 Test Implementation](#3122-test-implementation)
      - [31.2.3 Expected Result](#3123-expected-result)
      - [31.2.4 Adding Assertion to `getRequest` Method](#3124-adding-assertion-to-getrequest-method)
      - [31.2.5 Updated Test with Assertions](#3125-updated-test-with-assertions)
      - [31.2.6 Applying `getRequest` to `/tags` Endpoint](#3126-applying-getrequest-to-tags-endpoint)
    - [🧱 31.3 Pending Fixes (TODO)](#-313-pending-fixes-todo)
  - [📚 Lecture 032: Post, Put, and Delete Requester](#-lecture-032-post-put-and-delete-requester)
    - [🧠 32.1 Context](#-321-context)
    - [⚙️ 32.2 Updating code according the context](#️-322-updating-code-according-the-context)
      - [32.2.1 Create Post, Put, Delete Request Methods](#3221-create-post-put-delete-request-methods)
      - [32.2.2 Test Implementation - Create and Delete Article](#3222-test-implementation---create-and-delete-article)
      - [32.2.3 Test Implementation - Create, Update and Delete Article](#3223-test-implementation---create-update-and-delete-article)
    - [🧱 32.3 Pending Fixes (TODO)](#-323-pending-fixes-todo)
  - [📚 Lecture 033: Custom Logger](#-lecture-033-custom-logger)
    - [🧠 33.1 Context](#-331-context)
    - [⚙️ 33.2 Updating code according the context](#️-332-updating-code-according-the-context)
      - [33.2.1 Problem Illustration](#3321-problem-illustration)
      - [33.2.2 Create `utils/logger.ts` File](#3322-create-utilsloggerts-file)
      - [33.2.3 Logger Implementation](#3323-logger-implementation)
      - [33.2.4 Test Implementation](#3324-test-implementation)
    - [🧱 33.3 Pending Fixes (TODO)](#-333-pending-fixes-todo)
  - [📚 Lecture 034: Status Code Validator](#-lecture-034-status-code-validator)
    - [🧠 34.1 Context](#-341-context)
    - [⚙️ 34.2 Updating code according the context](#️-342-updating-code-according-the-context)
      - [34.2.1 Update Fixture to Include Logger](#3421-update-fixture-to-include-logger)
      - [34.2.2 Update `request-handler.ts` File with Logger Integration](#3422-update-request-handlerts-file-with-logger-integration)
      - [34.2.3 Create Custom Status Code Validator](#3423-create-custom-status-code-validator)
      - [34.2.4 Apply `statusCodeValidator` to All Request Methods](#3424-apply-statuscodevalidator-to-all-request-methods)
    - [🧱 34.3 Pending Fixes (TODO)](#-343-pending-fixes-todo)
  - [📚 Lecture 035: Assertions Enhancement](#-lecture-035-assertions-enhancement)
    - [🧠 35.1 Context](#-351-context)
    - [⚙️ 35.2 Updating code according the context:](#️-352-updating-code-according-the-context)
      - [35.2.1 Create `custom-expect.ts` file:](#3521-create-custom-expectts-file)
      - [35.2.2 Call the `setCustomExpectLogger` method in `utils/fixtures.ts`file:](#3522-call-the-setcustomexpectlogger-method-in-utilsfixturestsfile)
      - [35.2.3 Redefine `toEqual()` method to `shouldEqual()`:](#3523-redefine-toequal-method-to-shouldequal)
      - [35.2.4 Adding the missing logs](#3524-adding-the-missing-logs)
      - [35.2.5 Running negative scenario](#3525-running-negative-scenario)
      - [35.2.6 Adding new logic inside `try` block](#3526-adding-new-logic-inside-try-block)
      - [35.2.6 Fixing the `shouldEqual()` method issue related to recognize as valid method](#3526-fixing-the-shouldequal-method-issue-related-to-recognize-as-valid-method)
      - [35.2.7 Create the `shouldBeLessThanOrEqual()` method](#3527-create-the-shouldbelessthanorequal-method)
      - [35.2.8 Create the `shouldBeLessThanOrEqual()` method](#3528-create-the-shouldbelessthanorequal-method)
    - [🧱 35.3 Pending Fixes (TODO)](#-353-pending-fixes-todo)


## 📚 Visual Project Tree

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
│   ├── 📄 04-smokeTestWithFixture.spec.ts     # Tests using custom fixtures
│   ├── 📄 05-smokeTestFixturePostPutDeleteRequests.spec.ts  # CRUD operations tests
│   ├── 📄 06-TestwithLogger.spec.ts           # Tests demonstrating logger functionality
│   └── 📄 07-TestwithExpectLogger.spec.ts     # Tests using custom expect matchers
│
├── 📁 utils/                                  # Utility modules
│   ├── 📄 fixtures.ts                         # Playwright custom fixtures definition
│   ├── 📄 request-handler.ts                  # RequestHandler class for API request building
│   ├── 📄 logger.ts                           # APILogger class for request/response logging
│   └── 📄 custom-expect.ts                    # Custom expect matchers with logger integration
│
├── 📄 .gitignore                              # Git ignore rules
├── 📄 package.json                            # Node.js project configuration
├── 📄 package-lock.json                       # Dependency lock file
├── 📄 playwright.config.ts                    # Playwright test configuration
├── 📄 README.md                               # Project documentation
└── 📄 PROJECT_STRUCTURE.md                     # This file - project structure documentation
```

## 📚 Project Overview

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
   - HTTP methods: `getRequest()`, `postRequest()`, `putRequest()`, `deleteRequest()`
   - Default base URL: `https://conduit-api.bondaracademy.com/api`
   - Private `getUrl()` method for URL construction
   - Integrated with `APILogger` for request/response logging
   - Custom status code validation with detailed error messages

3. **`logger.ts`**: API logging system
   - Captures request details (method, URL, headers, body)
   - Captures response details (status code, body)
   - Provides `getRecentLogs()` method to retrieve API activity history
   - Used for debugging failed tests

4. **`custom-expect.ts`**: Custom assertion matchers
   - Extends Playwright's `expect` with custom matchers
   - `shouldEqual()`: Custom equality matcher with API logs
   - `shouldBeLessThanOrEqual()`: Custom comparison matcher with API logs
   - Automatically includes API activity logs in error messages
   - Supports both positive and negative assertions

#### 📁 Documentation (`docs/`)
- **`LECTURE_STEPS.md`**: Educational content
  - Section 04: Building a Framework
  - Lectures 029-035: Progressive framework development
  - Examples and explanations of each component
  - Complete code examples and test implementations

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

---

# 🧳 Section 04: Building a Framework

<br>


## 📚 Lecture 029: URL Builder

### 🧠 29.1 Context

This lecture introduces the URL Builder pattern for constructing API endpoints dynamically. The `RequestHandler` class implements a fluent API design that allows chaining methods to build URLs with query parameters. The core functionality includes:

- Building base URLs with optional custom base URLs
- Appending API paths
- Adding query parameters dynamically
- Using a default base URL when none is specified
- Creating a custom fixture to provide the RequestHandler instance to all tests

The `getUrl()` method uses the native `URL` API to properly construct URLs with query parameters, ensuring proper encoding and formatting.

### ⚙️ 29.2 Updating code according the context

#### 29.2.1 Full Example and Result

Let's assume the following values:

```ts
this.baseUrl = "https://api.example.com";
this.apiPath = "/articles";
this.queryParams = { limit: 10, tag: "js", featured: true };
```

First, the getUrl() method builds the base URL:
```ts
const url = new URL("https://api.example.com/articles");
```

Then the `for` loop will perform 3 iterations:
* Iteration 1: `key = "limit"`, `value = 10` → adds `?limit=10`
* Iteration 2: `key = "tag"`, `value = "js"` → adds `&tag=js`
* Iteration 3: `key = "featured"`, `value = true` → adds `&featured=true`

Final Result:
```bash
https://api.example.com/articles?limit=10&tag=js&featured=true
```

#### 29.2.2 Fixture Implementation

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

#### 29.2.3 Request Handler Implementation

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

#### 29.2.4 Test Implementation

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

### 🧱 29.3 Pending Fixes (TODO)

```md
- [ ] The `getUrl()` method is private but called directly in tests - needs to be made public or a public method should wrap it
- [ ] Add proper TypeScript types for `queryParams`, `apiHeaders`, and `apiBody` instead of using `object`
- [ ] Implement error handling for invalid URLs
- [ ] Add validation for required parameters before building URL
```

<br>


## 📚 Lecture 030: Request Handler Constructor

### 🧠 30.1 Context

This lecture addresses the need to share the Playwright `APIRequestContext` (the `request` object) throughout the framework. Previously, the `RequestHandler` class didn't have access to the request context, which is essential for making actual HTTP requests. 

The solution involves:
- Adding a constructor to `RequestHandler` that accepts `APIRequestContext` and a base URL
- Updating the fixture to pass the `request` object from Playwright's test context
- Making the base URL configurable through the constructor instead of hardcoding it

This change enables the `RequestHandler` to make actual API calls using Playwright's request API, setting the foundation for implementing HTTP methods like GET, POST, PUT, and DELETE.

### ⚙️ 30.2 Updating code according the context

#### 30.2.1 Request Handler Constructor Implementation

```ts
/* utils/request-handler.ts */
import { APIRequestContext } from "@playwright/test";  // 👈🏽 ✅

export class RequestHandler {
  private request: APIRequestContext;  // 👈🏽 ✅
  private baseUrl: string;
  private defaultBaseUrl: string = "https://conduit-api.bondaracademy.com/api";
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: object = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string){  // 👈🏽 ✅
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
  }

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

#### 30.2.2 Updated Fixture Implementation

```ts
/* utils/fixtures.ts */
import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";

export type TestOptions = {
  api: RequestHandler;
};

export const test = base.extend<TestOptions>({
  api: async ({ request }, use) => {  // 👈🏽 ✅
    const baseUrl = "https://conduit-api.bondaracademy.com/api";  // 👈🏽 ✅
    const requestHandler = new RequestHandler(request, baseUrl);  // 👈🏽 ✅
    await use(requestHandler);
  },
});
```

### 🧱 30.3 Pending Fixes (TODO)

```md
- [ ] Remove unused `defaultBaseUrl` initialization since it's now set in constructor
- [ ] Add null/undefined checks for `request` parameter in constructor
- [ ] Consider making baseUrl optional with a fallback to default
- [ ] Add JSDoc comments to document constructor parameters
```


<br>

## 📚 Lecture 031: Get Requester

### 🧠 31.1 Context

This lecture implements the first HTTP method (`getRequest`) in the `RequestHandler` class. The implementation includes:

- Creating an async `getRequest()` method that makes actual GET requests using Playwright's request API
- Updating the `getUrl()` method to return the URL string (fixing a missing return statement from the previous lecture)
- Improving type safety by changing `apiHeaders` from `object` to `Record<string, string>`
- Making the `headers()` method accept properly typed headers
- The method sends the request, parses the JSON response, and returns it

This enables the framework to make actual API calls and retrieve data, moving from URL building to functional HTTP requests.

### ⚙️ 31.2 Updating code according the context

#### 31.2.1 Create the `getRequest` Method

```ts
/* utils/request-handler.ts */
import { APIRequestContext } from "@playwright/test";
export class RequestHandler {
  private request: APIRequestContext;
  private baseUrl: string;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};;

  private apiHeaders: Record<string, string> = {};  // 👈🏽 ✅ (2)
  
  private apiBody: object = {};
  constructor(request: APIRequestContext, apiBaseUrl: string) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
  }
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

  headers(headers: Record<string, string>) {  // 👈🏽 ✅ (3)
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest() {  // 👈🏽 ✅ (1)
    const url = this.getUrl();
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });
    const responseJSON = await response.json();
    return responseJSON;
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);

    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    console.log("\n🚀 url: ", url.toString(), "\n");

    return url.toString();  // 👈🏽 ✅ (4) missing part in previous lecture!
  }
}
```

#### 31.2.2 Test Implementation

```ts
/* tests/04-smokeTestWithFixture.spec.ts */
import { test } from "../utils/fixtures";
test("Second Test - GET Articles", async ({ api }) => {  // 👈🏽 ✅ (1)
  const response = await api
                          .path("/articles")
                          .params({ limit: 10, offset: 0 })
                          .getRequest();
  console.log("\n🚀 response: ", response);
});
```

#### 31.2.3 Expected Result

```bash
🚀 url:  https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0 


🚀 response:  {
  articles: [
    {
      slug: 'Discover-Bondar-Academy:-Your-Gateway-to-Efficient-Learning-1',
      title: 'Discover Bondar Academy: Your Gateway to Efficient Learning',
      description: "Discover Bondar Academy's unique place in the educational landscape, where value-focused and efficient learning approaches converge. Our goal is to rapidly enhance your professional technical skills, boosting your market competitiveness and paving the way for higher-paying job opportunities. The speed of your progress is in your hands – you set the pace, and we provide the solutions and support to help you achieve your desired outcomes.",
      body: 'Bondar Academy is a leading platform for efficient education, designed to boost your technical skills and advance your career in Quality Assurance (QA). Our program features a balanced mix of pre-recorded lectures and live sessions, allowing each student to study at their own pace and at a time that suits them. \n' +
        '\n' +
        "Our instructors are readily available on our Slack Workspace for support. Whether it's a quick question or a more complex issue requiring a Zoom call or Slack Huddle for screen sharing and live discussion, we're here to assist. Additionally, each class comes with a comprehensive question bank for self-assessment. Following each lecture, you have the opportunity to validate your understanding and readiness to progress to the next topic. You set the pace, and we provide the solutions to ensure you achieve your desired outcomes.\n" +
        '\n' +
        'SignUp today: https://www.bondaracademy.com',
      tagList: [Array],
      createdAt: '2024-01-27T21:52:32.682Z',
      updatedAt: '2024-01-27T21:52:32.682Z',
      favorited: false,
      favoritesCount: 980,
      author: [Object]
    },
    // ... more articles ...
  ],
  articlesCount: 10
}
  ✓  1 [chromium] › tests/04-smokeTestWithFixture.spec.ts:13:5 › Second Test using RequestHandler class (1.7s)

  1 passed (2.4s)
```

#### 31.2.4 Adding Assertion to `getRequest` Method

```ts
/* utils/request-handler.ts */
import { APIRequestContext, expect } from "@playwright/test";  // 👈🏽 ✅ (1) add "expect"

export class RequestHandler {
  private request: APIRequestContext;
  private baseUrl: string;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};
  constructor(request: APIRequestContext, apiBaseUrl: string) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
  }
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
  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }
  body(body: object) {
    this.apiBody = body;
    return this;
  }
  async getRequest(statusCode: number) {  // 👈🏽 ✅ (2)
    const url = this.getUrl();
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });

    expect(response.status()).toEqual(statusCode);  // 👈🏽 ✅ (2)

    const responseJSON = await response.json();
    return responseJSON;
  }
  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);
    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    console.log("\n🚀 url: ", url.toString(), "\n");
    return url.toString();
  }
}
```

#### 31.2.5 Updated Test with Assertions

```ts
/* tests/04-smokeTestWithFixture.spec.ts */
import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
test("Second Test - GET Articles", async ({ api }) => {
  const response = await api
      .path("/articles")
      .params({ limit: 10, offset: 0 })
      .getRequest(200);  // 👈🏽 ✅ (1)
  expect(response.articles.length).toBeLessThanOrEqual(10);  // 👈🏽 ✅ (2)
  expect(response.articlesCount).toEqual(10);  // 👈🏽 ✅ (2)
  console.log("\n🚀 response: ", response);
});
```

#### 31.2.6 Applying `getRequest` to `/tags` Endpoint

```ts
/* tests/04-smokeTestWithFixture.spec.ts */
import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
test("Third Test - GET Tags", async ({ api }) => {  // 👈🏽 ✅
  const response = await api.path("/tags").getRequest(200);
  expect(response.tags.length).toBeLessThanOrEqual(10);
  expect(response.tags[0]).toEqual("Test");
  console.log("\n🚀 response: ", response);
});
```

**Expected Result:**
```bash
🚀 url:  https://conduit-api.bondaracademy.com/api/tags 


🚀 response:  {
  tags: [
    'Test',
    'Git',
    'Blog',
    'YouTube',
    'GitHub',
    'Zoom',
    'Bondar Academy',
    'qa career',
    'QA Skills',
    'Value-Focused'
  ]
}
  ✓  1 [chromium] › tests/04-smokeTestWithFixture.spec.ts:21:5 › Third Test - GET Tags (999ms)

  1 passed (1.6s)
```

### 🧱 31.3 Pending Fixes (TODO)

```md
- [ ] Add error handling for network failures and timeouts
- [ ] Consider adding retry logic for failed requests
- [ ] Add support for response validation schemas
- [ ] Implement request timeout configuration
- [ ] Add support for different response content types (not just JSON)
```


<br>


## 📚 Lecture 032: Post, Put, and Delete Requester

### 🧠 32.1 Context

This lecture extends the `RequestHandler` class to support all HTTP methods: POST, PUT, and DELETE. Previously, only GET requests were implemented. Now the framework becomes a complete HTTP client capable of:

- Creating resources with POST requests
- Updating resources with PUT requests
- Deleting resources with DELETE requests

Each method follows the same pattern as `getRequest()`:
- Builds the URL using `getUrl()`
- Sends the request with appropriate headers and body
- Validates the status code
- Returns the JSON response (except DELETE which may not return a body)

The implementation demonstrates a complete CRUD (Create, Read, Update, Delete) workflow by testing article creation, retrieval, update, and deletion in sequence.

### ⚙️ 32.2 Updating code according the context

#### 32.2.1 Create Post, Put, Delete Request Methods
```ts
/* utils/request-handler.ts */
import { APIRequestContext, expect } from "@playwright/test";

export class RequestHandler {
  private request: APIRequestContext;
  private baseUrl: string;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
  }

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

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Send the request
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });

    // Obtain the actual status
    expect(response.status()).toEqual(statusCode);

    // Obtain the response JSON
    const responseJSON = await response.json();

    return responseJSON;
  }

  async postRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Send the request
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    // Obtain the actual status
    expect(response.status()).toEqual(statusCode);

    // Obtain the response JSON
    const responseJSON = await response.json();

    return responseJSON;
  }

  async putRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Send the PUT request
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    /// Obtain the actual status
    expect(response.status()).toEqual(statusCode);

    // Obtain the response JSON
    const responseJSON = await response.json();

    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();

    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });

    // Obtain the actual status
    expect(response.status()).toEqual(statusCode);
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);

    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    //console.log("\n🚀 url: ", url.toString(), "\n");
    return url.toString();
  }
}
```

#### 32.2.2 Test Implementation - Create and Delete Article
```ts
/* tests/05-smokeTestFixturePostPutDeleteRequests.spec.ts */
import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";

let authToken: string;

/******* LOGIN *******/
test.beforeAll("runs before all", async ({ api }) => {
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } })
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);
});


/******* 🧪 Create and Delete an Article 🧪 *******/
test("Create and Delete an Article", async ({ api }) => {
  console.log("\n🚀 CREATE ARTICLE");
  const newDate = Date.now();
  const createArticleResponse = await api
    .path("/articles")
    .headers({ Authorization: authToken })
    .body({
      article: {
        title: `Test TWO TEST ${newDate}`,
        description: `Test TWO TEST ${newDate} - Description`,
        body: "Test body",
        tagList: ["suspiros", "payoneer"],
      },
    })
    .postRequest(201);

  const slugId = createArticleResponse.article.slug;
  console.log("\n🚀 slugId: ", slugId);

  console.log("\n🚀 GET ARTICLES");
  const articleResponse = await api
    .path(`/articles`)
    .headers({ Authorization: authToken })
    .getRequest(200);

  expect(articleResponse.articles.find((a: any) => a.slug === slugId)).toBeDefined();

  console.log("\n🚀 DELETE ARTICLE");
  await api.path(`/articles/${slugId}`).headers({ Authorization: authToken }).deleteRequest(204);

  console.log("\n🚀 GET ARTICLES - verify deleted");
  const articleDoubleResponse = await api
    .path(`/articles`)
    .headers({ Authorization: authToken })
    .getRequest(200);

  // Verify that the article is not present in the response!
  expect(articleDoubleResponse.articles.every((a: any) => a.slug !== slugId)).toBeTruthy();
});
```

![Expected Result - Create & Delete requests](../img/section04-lecture032-001.png)

#### 32.2.3 Test Implementation - Create, Update and Delete Article

```ts
/* tests/05-smokeTestFixturePostPutDeleteRequests.spec.ts */
import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";

let authToken: string;

/******* LOGIN *******/
test.beforeAll("runs before all", async ({ api }) => {
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } })
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);
});

/******* 🧪 Create, Update and Delete an Article 🧪 *******/
test("Create, Update and Delete an Article", async ({ api }) => {
  console.log("\n🚀 CREATE ARTICLE");
  const newDate = Date.now();
  const createArticleResponse = await api
    .path("/articles")
    .headers({ Authorization: authToken })
    .body({
      article: {
        title: `Test TWO TEST ${newDate}`,
        description: `Test TWO TEST ${newDate} - Description`,
        body: "Test body",
        tagList: [],
      },
    })
    .postRequest(201);
  const slugId = createArticleResponse.article.slug;
  console.log("\n👍🏽 slugId: ", slugId);

  console.log("\n🚀 GET ARTICLES");
  const articleResponse = await api
    .path(`/articles`)
    .headers({ Authorization: authToken })
    .getRequest(200);
  expect(articleResponse.articles.find((a: any) => a.slug === slugId)).toBeDefined();

  console.log("\n🚀 UPDATE ARTICLE");
  const updateArticleResponse = await api
    .path(`/articles/${slugId}`)
    .headers({ Authorization: authToken })
    .body({
      article: {
        title: `Test TWO UPDATED TEST ${newDate}`,
        description: `Test TWO UPDATED TEST ${newDate} - Description`,
        body: "******* Updated Test body *******",
        tagList: ["suspiros", "payoneer"],
        slug: slugId,
      },
    })
    .putRequest(200);
  const newSlugId = updateArticleResponse.article.slug;
  console.log("\n👍🏽 newSlugId: ", newSlugId);

  console.log("\n🚀 DELETE ARTICLE");
  await api.path(`/articles/${newSlugId}`).headers({ Authorization: authToken }).deleteRequest(204);

  console.log("\n🚀 GET ARTICLES - verify deleted");
  const articleDoubleResponse = await api
    .path(`/articles`)
    .headers({ Authorization: authToken })
    .getRequest(200);
  // Verify that the article is not present in the response!
  expect(articleDoubleResponse.articles.every((a: any) => a.slug !== newSlugId)).toBeTruthy();
});
```

![Expected Result - Create, Update & Delete requests](../img/section04-lecture032-002.png)

### 🧱 32.3 Pending Fixes (TODO)

```md
- [ ] Add support for PATCH method (partial updates)
- [ ] Handle DELETE requests that return a response body
- [ ] Add request/response interceptors for logging
- [ ] Implement request cancellation/timeout handling
- [ ] Add support for file uploads in POST/PUT requests
- [ ] Consider adding a method to reset the handler state between requests
```


<br>

## 📚 Lecture 033: Custom Logger

### 🧠 33.1 Context

When API requests fail during testing, it's often difficult to diagnose the issue without detailed information about what was sent and what was received. The default error messages from Playwright don't provide enough context about:

- The exact request that was made (method, URL, headers, body)
- The response received (status code, response body)
- The sequence of API calls leading up to the failure

This lecture introduces a custom `APILogger` class that captures and stores request and response details. The logger maintains a history of recent API activity, which can be retrieved when an error occurs to provide comprehensive debugging information. This is especially useful when tests fail and you need to understand what happened during the API interaction.

### ⚙️ 33.2 Updating code according the context

#### 33.2.1 Problem Illustration

![Error in toBeDefined](../img/section04-lecture033-001.png)
![Error in status code](../img/section04-lecture033-002.png)

#### 33.2.2 Create `utils/logger.ts` File
```ts
/* utils/logger.ts */
export class APILogger {
  private recentLogs: any[] = [];

  // capturing Request details
  logRequest(method: string, url: string, headers: Record<string, string>, body?: any) {
    const logEntry = { method, url, headers, body };
    this.recentLogs.push({ type: "Request Details", data: logEntry });
  }

  // capturing Response details
  logResponse(statusCode: number, body?: any) {
    const logEntry = { statusCode, body };
    this.recentLogs.push({ type: "Response Details", data: logEntry });
  }

  getRecentLogs() {
    const logs = this.recentLogs
      .map((log) => {
        return `\n===${log.type}===\n${JSON.stringify(log.data, null, 2)}\n`;
      })
      .join("\n\n");
    return logs;
  }
}
```

#### 33.2.3 Logger Implementation

```ts
/* utils/logger.ts */
export class APILogger {
  private recentLogs: any[] = [];

  // capturing Request details
  logRequest(method: string, url: string, headers: Record<string, string>, body?: any) {
    const logEntry = { method, url, headers, body };
    this.recentLogs.push({ type: "Request Details", data: logEntry });
  }

  // capturing Response details
  logResponse(statusCode: number, body?: any) {
    const logEntry = { statusCode, body };
    this.recentLogs.push({ type: "Response Details", data: logEntry });
  }

  getRecentLogs() {
    const logs = this.recentLogs
      .map((log) => {
        return `\n===${log.type}===\n${JSON.stringify(log.data, null, 2)}\n`;
      })
      .join("\n\n");
    return logs;
  }
}
```

#### 33.2.4 Test Implementation

```ts
/* tests/06-TestwithLogger.spec.ts */
import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import { APILogger } from "../utils/logger";

test("Test logger", async () => {
  const logger = new APILogger();
  logger.logRequest("POST", "https://test.com/api", { Authorization: "token" }, { foo: "bar" });
  logger.logResponse(200, { foo: "bar" });
  const logs = logger.getRecentLogs();
  console.log(logs);
});
```

![Visual help how Logger works](../img/section04-lecture033-003.png)

### 🧱 33.3 Pending Fixes (TODO)

```md
- [ ] Add log rotation/limit to prevent memory issues with long test runs
- [ ] Add timestamp to each log entry
- [ ] Implement log levels (debug, info, error)
- [ ] Add option to export logs to file
- [ ] Consider adding request/response size limits for logging
- [ ] Add filtering capabilities to retrieve specific log entries
```


<br>

## 📚 Lecture 034: Status Code Validator

### 🧠 34.1 Context

When status code assertions fail, the default Playwright error messages don't provide enough context about what went wrong. The error messages don't show:
- Which specific method (`getRequest`, `postRequest`, etc.) failed
- The exact request that was made
- The response received
- The sequence of API calls leading to the failure

This lecture introduces a custom `statusCodeValidator` method that:
- Replaces the standard `expect().toEqual()` assertions
- Captures the full API activity log when a status code mismatch occurs
- Uses `Error.captureStackTrace()` to provide accurate stack traces pointing to the exact method that failed
- Integrates the logger from Lecture 033 to provide comprehensive error context

This enhancement makes debugging failed tests much easier by providing all the necessary information in one error message.

### ⚙️ 34.2 Updating code according the context

#### 34.2.1 Update Fixture to Include Logger
```ts
/* utils/fixtures.ts */
import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";
import { APILogger } from "./logger";  // 👈🏽 ✅
export type TestOptions = {
  api: RequestHandler;
};
export const test = base.extend<TestOptions>({
  api: async ({ request }, use) => {
    const baseUrl = "https://conduit-api.bondaracademy.com/api";
    const logger = new APILogger();  // 👈🏽 ✅
    const requestHandler = new RequestHandler(request, baseUrl, logger);  // 👈🏽 ✅
    await use(requestHandler);
  },
});
```

#### 34.2.2 Update `request-handler.ts` File with Logger Integration
```ts
/* utils/request-handler.ts */
import { APIRequestContext, expect } from "@playwright/test";
import { APILogger } from "./logger";  // 👈🏽 ✅

export class RequestHandler {
  private request: APIRequestContext;
  private logger: APILogger;  // 👈🏽 ✅
  private baseUrl: string;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger) {  // 👈🏽 ✅
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
    this.logger = logger;  // 👈🏽 ✅
  }

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

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();
    // Log the GET request
    this.logger.logRequest("GET", url, this.apiHeaders, this.apiBody);  // 👈🏽 ✅
    // Send the request
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });
    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();
    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);  // 👈🏽 ✅
    // Assert the actual status is equal to the expected status
    expect(actualStatus).toEqual(statusCode);
    return responseJSON;
  }

  async postRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();
    // Log the POST request
    this.logger.logRequest("POST", url, this.apiHeaders, this.apiBody);  // 👈🏽 ✅
    // Send the request
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });
    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();
    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);  // 👈🏽 ✅
    // Assert the actual status is equal to the expected status
    expect(actualStatus).toEqual(statusCode);
    return responseJSON;
  }

  async putRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();
    // Log the PUT request
    this.logger.logRequest("PUT", url, this.apiHeaders, this.apiBody);  // 👈🏽 ✅
    // Send the PUT request
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });
    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();
    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);  // 👈🏽 ✅
    // Assert the actual status is equal to the expected status
    expect(actualStatus).toEqual(statusCode);
    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();
    // Log the DELETE request
    this.logger.logRequest("DELETE", url, this.apiHeaders);  // 👈🏽 ✅
    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });
    // Obtain the actual status
    const actualStatus = response.status();
    // Log the response
    this.logger.logResponse(actualStatus);  // 👈🏽 ✅
    // Assert the actual status is equal to the expected status
    expect(actualStatus).toEqual(statusCode);
    return response;
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);
    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    //console.log("\n🚀 url: ", url.toString(), "\n");
    return url.toString();
  }
}
```

#### 34.2.3 Create Custom Status Code Validator

```ts
/* utils/request-handler.ts */
// Private method to validate the status code in "expect(actualStatus).toEqual(statusCode);"
  private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function) {
    if (actualStatus !== expectedStatus) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(`Expected status ${expectedStatus} but got ${actualStatus}\n\nRecent API Activity: \n${logs}`);
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }
```

#### 34.2.4 Apply `statusCodeValidator` to All Request Methods
```ts
/*  */
import { APIRequestContext, expect } from "@playwright/test";
import { APILogger } from "./logger";

export class RequestHandler {
  private request: APIRequestContext;
  private logger: APILogger;
  private baseUrl: string;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
    this.logger = logger;
  }

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

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the GET request
    this.logger.logRequest("GET", url, this.apiHeaders, this.apiBody);

    // Send the request
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.getRequest);  // 👈🏽 ✅
    return responseJSON;
  }

  async postRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the POST request
    this.logger.logRequest("POST", url, this.apiHeaders, this.apiBody);

    // Send the request
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.postRequest);  // 👈🏽 ✅

    return responseJSON;
  }

  async putRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the PUT request
    this.logger.logRequest("PUT", url, this.apiHeaders, this.apiBody);

    // Send the PUT request
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.putRequest);  // 👈🏽 ✅

    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();

    // Log the DELETE request
    this.logger.logRequest("DELETE", url, this.apiHeaders);

    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });

    // Obtain the actual status
    const actualStatus = response.status();

    // Log the response
    this.logger.logResponse(actualStatus);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest);  // 👈🏽 ✅

    return response;
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);

    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    //console.log("\n🚀 url: ", url.toString(), "\n");
    return url.toString();
  }

  // Private method to validate the status code in "expect(actualStatus).toEqual(statusCode);"
  private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function) {  // 👈🏽 ✅
    if (actualStatus !== expectedStatus) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(`Expected status ${expectedStatus} but got ${actualStatus}\n\nRecent API Activity: \n${logs}`);
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }
}
```

### 🧱 34.3 Pending Fixes (TODO)

```md
- [ ] Add support for status code ranges (e.g., 2xx, 3xx) instead of exact matches
- [ ] Consider adding retry logic for specific status codes (e.g., 429 Too Many Requests)
- [ ] Add option to disable detailed logging for performance-critical tests
- [ ] Implement error message formatting for better readability
- [ ] Add support for custom error messages in status code validator
- [ ] Consider adding validation for response headers in addition to status codes
```

<br>

## 📚 Lecture 035: Assertions Enhancement

### 🧠 35.1 Context

When writing API tests, assertion failures often occur without sufficient context about what API calls were made leading up to the failure. The standard Playwright `expect()` assertions don't automatically include API activity logs, making it difficult to debug test failures.

This lecture introduces custom assertion matchers that integrate with the `APILogger` to provide comprehensive debugging information when assertions fail. The custom matchers (`shouldEqual()` and `shouldBeLessThanOrEqual()`) automatically include recent API activity logs in error messages, making it much easier to understand why a test failed.

The implementation uses Playwright's `expect.extend()` API to create custom matchers that:
- Wrap standard Playwright assertions
- Capture API logs when assertions fail
- Provide detailed error messages with full API context
- Support both positive and negative assertions (`expect().not.shouldEqual()`)
- Include proper TypeScript type definitions for IDE autocomplete support


### ⚙️ 35.2 Updating code according the context:

#### 35.2.1 Create `custom-expect.ts` file:

using this docs a base: [Add custom matchers using expect.extend](https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend)

```tsx
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

export const expect = baseExpect.extend({
  // ....
});
```

#### 35.2.2 Call the `setCustomExpectLogger` method in `utils/fixtures.ts`file:
```tsx
/* utils/fixtures.ts */
import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";
import { APILogger } from "./logger";
import { setCustomExpectLogger } from "./custom-expect";  // 👈🏽 ✅

export type TestOptions = {
  api: RequestHandler;
};

export const test = base.extend<TestOptions>({
  api: async ({ request }, use) => {
    const baseUrl = "https://conduit-api.bondaracademy.com/api";
    const logger = new APILogger();
    setCustomExpectLogger(logger);  // 👈🏽 ✅
    const requestHandler = new RequestHandler(request, baseUrl, logger);
    await use(requestHandler);
  },
});
```


#### 35.2.3 Redefine `toEqual()` method to `shouldEqual()`:
```tsx
/* utils/fixtures.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {  // 👈🏽 ✅
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n`;

    return {
      message: () => message,
      pass,
    };
  },
});
```

> Verify whether this .shouldEqual method works in a new test spec:
```ts
/* tests/07-TestwithExpectLogger.spec.ts */
test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
});
```

![Terminal result/outcome](../img/sectio04-lecture035-001.png)

> Test the negative test case:
```ts
/* tests/07-TestwithExpectLogger.spec.ts */
test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(9);  // 👈🏽 ✅
});
```

![Missing the logs](../img/section04-lecture035-002.png)

#### 35.2.4 Adding the missing logs

> Adding the missing logs:
```ts
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;  // 👈🏽 ✅

    return {
      message: () => message,
      pass,
    };
  },
});
```

![Re-test with logs](../img/section04-lecture035-003.png)

#### 35.2.5 Running negative scenario
```tsx
/* tests/07-TestwithExpectLogger.spec.ts */
import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import { APILogger } from "../utils/logger";

test.only("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).not.shouldEqual(10);
});
```

![no logs appear](../img/section04-lecture035-004.png)

**Expected Result:** missing logs

According to the test `tests/07-TestwithExpectLogger.spec.ts`:
- `baseExpect(received).toEqual(expected)` is True
- `pass = True`
- `logs = apiLogger.getRecentLogs();` is never called!
- `{this.isNot}` is true then flip to false.
- Test failed

> Need to add some additional logic inside `try` block.

#### 35.2.6 Adding new logic inside `try` block
```ts
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
      if(this.isNot) logs = apiLogger.getRecentLogs();  // 👈🏽 ✅
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
});

```
![no logs appear](../img/section04-lecture035-005.png)

#### 35.2.6 Fixing the `shouldEqual()` method issue related to recognize as valid method

The `shouldEqual()` method needs to be properly declared in TypeScript's global namespace so that TypeScript recognizes it as a valid matcher method. This enables IDE autocomplete and type checking.

![shouldEqual() method issue as no valid](../img/section04-lecture035-006.png)

```ts
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

declare global {  // 👈🏽 ✅ (1)
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      shouldEqual(expcted: T): R;  // 👈🏽 ✅ (2)
    }
  }
}  // 👈🏽 ✅ (1)

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
});
```

**Expected Result:**

![shouldEqual() method is NOW valid](../img/section04-lecture035-007.png)

#### 35.2.7 Create the `shouldBeLessThanOrEqual()` method

The `shouldEqual()` method needs to be properly declared in TypeScript's global namespace so that TypeScript recognizes it as a valid matcher method. This enables IDE autocomplete and type checking.

```ts
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

declare global {  // 👈🏽 ✅ (1)
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      shouldEqual(expcted: T): R;  // 👈🏽 ✅ (2)
    }
  }
}  // 👈🏽 ✅ (1)

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
});
```

**Expected Result:**

![shouldEqual() method is NOW valid](../img/section04-lecture035-007.png)

#### 35.2.8 Create the `shouldBeLessThanOrEqual()` method

Following the same pattern as `shouldEqual()`, we create a custom matcher for `shouldBeLessThanOrEqual()` that also includes API logs in error messages.

```ts
/* utils/custom-expect.ts */
import { expect as baseExpect } from "@playwright/test";
import { APILogger } from "./logger";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
  apiLogger = logger;
};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      shouldEqual(expcted: T): R;
      shouldBeLessThanOrEqual(expcted: T): R;  // 👈🏽 ✅ (1)
    }
  }
}

export const expect = baseExpect.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toEqual(expected);
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
  shouldBeLessThanOrEqual(received: any, expected: any) {  // 👈🏽 ✅ (2)
    let pass: boolean;
    let logs: string = "";
    try {
      baseExpect(received).toBeLessThanOrEqual(expected);  // 👈🏽 ✅ (3)
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();  // 👈🏽 ✅ (4)
    } catch (e: any) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldBeLessThanOrEqual", undefined, undefined, { isNot: this.isNot }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n` +
      `Recent API Activity: \n${logs}`;  // 👈🏽 ✅ (5)

    return {
      message: () => message,
      pass,
    };
  },
});
```

**Test Implementation:**

```ts
/* tests/07-TestwithExpectLogger.spec.ts */
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";

test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).shouldBeLessThanOrEqual(10);  // 👈🏽 ✅ (1)
  expect(response.articlesCount).shouldEqual(10);
});
```

**Expected Result:**

```bash
✓  1 [chromium] › tests/07-TestwithExpectLogger.spec.ts:16:5 › Second Test - GET Articles (1.2s)

1 passed (1.8s)
```

### 🧱 35.3 Pending Fixes (TODO)

```md
- [ ] Add more custom matchers (shouldContain, shouldBeGreaterThan, etc.)
- [ ] Add option to configure which matchers include API logs
- [ ] Consider adding request/response timing information to logs
- [ ] Add support for custom log formatting in error messages
- [ ] Implement log filtering to show only relevant API calls (e.g., last N requests)
- [ ] Add TypeScript type safety improvements for matcher parameters
- [ ] Consider adding matcher chaining support
- [ ] Add unit tests for custom matchers
```

<br>

## 📚 Lecture 036: *API Configuration File*

### 🧠 36.1 Context

As testing frameworks grow in complexity, managing configuration values becomes critical. Hardcoding values like API URLs, user credentials, and environment-specific settings directly in test files creates several problems:

- **Maintainability**: When URLs or credentials change, you must update multiple files
- **Security**: Credentials exposed in source code pose security risks
- **Flexibility**: Running tests against different environments (dev, qa, staging, production) requires code changes
- **Consistency**: Different tests might use different values, leading to inconsistent behavior

This lecture introduces a centralized configuration file (`api-test.config.ts`) that:
- Centralizes all API-related configuration in one place
- Supports environment-based configuration through environment variables
- Provides a Playwright fixture to inject configuration into tests
- Enables easy switching between environments without code changes

**When it's used:**
- When you need to test against multiple environments (dev, qa, staging, production)
- When credentials or API URLs need to be changed frequently
- When you want to avoid hardcoding sensitive information in test files
- When you need consistent configuration across all tests

**Examples from the project:**
- The `api-test.config.ts` file stores the base API URL and user credentials
- Environment variables (`TEST_ENV`) control which credentials are used
- The `config` fixture makes configuration available to all tests
- Tests use `config.userEmail` and `config.userPassword` instead of hardcoded values

**Advantages:**
- Single source of truth for configuration
- Easy environment switching via environment variables
- Better security (can use environment variables for sensitive data)
- Improved maintainability (change once, affects all tests)
- Type-safe configuration through TypeScript

**Disadvantages:**
- Requires understanding of environment variables
- Configuration file must be kept in sync with actual environments
- Risk of using wrong environment if `TEST_ENV` is not set correctly
- May need additional tooling for secret management in production

**When to consider alternatives:**
- For very simple projects with a single environment, hardcoding might be acceptable
- For production secrets, consider using secret management services (AWS Secrets Manager, Azure Key Vault)
- For complex multi-tenant scenarios, consider a configuration service or database
- For CI/CD pipelines, environment variables are often preferred over config files

**Connection to practical implementation:**
The configuration file integrates seamlessly with the existing framework:
- The `RequestHandler` uses `config.apiUrl` from the fixture
- Tests access credentials via the `config` fixture parameter
- Environment detection happens at module load time, before tests run
- The fixture pattern ensures consistent configuration access across all tests

### ⚙️ 36.2 Updating code according the context:

#### 36.2.1 create `api-test.config.ts` file:
```ts
/* api-test.config.ts */
const config = {
  apiUrl: "https://conduit-api.bondaracademy.com/api",
  userEmail: "suspiros@test.com",
  userPassword: "Test!001",
};

export { config };
``` 

#### 36.2.2 Import `api-test.config.ts` into `fixture.ts` and then create the fixture for config file:
```ts
/* utils/fixtures.ts */
import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";
import { APILogger } from "./logger";
import { setCustomExpectLogger } from "./custom-expect";
import { config } from "../api-test.config";  // 👈🏽 ✅

export type TestOptions = {
  api: RequestHandler;
  config: typeof config;  // 👈🏽 ✅
};

export const test = base.extend<TestOptions>({
  api: async ({ request }, use) => {
    //const baseUrl = "https://conduit-api.bondaracademy.com/api";
    const logger = new APILogger();
    setCustomExpectLogger(logger);
    const requestHandler = new RequestHandler(request, config.apiUrl, logger);
    await use(requestHandler);
  },
  config: async ({}, use) => {  // 👈🏽 ✅
    await use(config);  // 👈🏽 ✅
  },
});
``` 

#### 36.2.3 Apply this new Fixture with Config in a test:
```ts
/*  */
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";

let authToken: string;
test.beforeAll("runs before all", async ({ api, config }) => {  // 👈🏽 ✅
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: config.userEmail, password: config.userPassword } })  // 👈🏽 ✅
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);
});

test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
});
``` 

#### 36.2.4 Update `config` according the environment:
```ts
/* api-test.config.ts */
const processENV = process.env.TEST_ENV;        // 👈🏽 ✅
const env = processENV || "prod";                // 👈🏽 ✅ (Note: Consider using "qa" as default for safety)
console.log("🚀 Test environment is: " + env);  // 👈🏽 ✅

const config = {
  apiUrl: "https://conduit-api.bondaracademy.com/api",
  userEmail: "suspiros@test.com",
  userPassword: "Test!001",
};

// 👈🏽 ✅
if (env === "qa") {
  config.userEmail = "suspiros.qa@example.io";
  config.userPassword = "Test!001";
} else if (env === "stg") {
  config.userEmail = "suspiros.stg@example.io";
  config.userPassword = "Test!001";
} else if (env === "prod") {
  config.userEmail = "pierotester@test.com";
  config.userPassword = "12345678";
} else if (env === "dev") {
  config.userEmail = "suspiros.dev@example.io";
  config.userPassword = "Test!001";
} else {
  config.userEmail = "suspiros@test.com";
  config.userPassword = "Test!001";
}
// 👈🏽 ✅

export { config };
```

#### 36.2.5 Verify running a test:
```ts
/* tests/08-TestWithConfig.spec.ts */
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";

let authToken: string;
test.beforeAll("runs before all", async ({ api, config }) => {
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: config.userEmail, password: config.userPassword } })
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);

  console.log("� tokenResponse.user: ", tokenResponse.user);
});

test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
});
```
![Verifying the environment and credentials in Test](../img/section04-lecture036-001.png)

#### 36.2.6 Running a test from terminal and setting up an Environment:
```bash
TEST_ENV=dev npx playwright test [test_relative_path]
```

in Windows Operating System:
```bash
set TEST_ENV=stg && npx playwright test [test_relative_path]
set TEST_ENV=prod && npx playwright test [test_relative_path]
```

### 🐞 36.3 Issues:

| Issue | Status | Log/Error |
|---|---|---|
| **Default environment mismatch**: The `api-test.config.ts` file defaults to `"prod"` when `TEST_ENV` is not set, but the documentation shows `"qa"` as the default. This inconsistency could lead to accidentally running tests against production. | ⚠️ Identified | File: `api-test.config.ts` line 2. Current: `const env = processENV || "prod";` Expected: `const env = processENV || "qa";` |
| **No environment validation**: The configuration file doesn't validate that the provided environment is one of the supported values (qa, stg, prod, dev). Invalid environments silently fall back to default credentials. | ⚠️ Identified | File: `api-test.config.ts`. No validation for `env` variable before using it in if-else chain. |
| **Hardcoded API URL**: The `apiUrl` is hardcoded and doesn't change based on environment. Different environments might require different API URLs. | ⚠️ Identified | File: `api-test.config.ts` line 6. `apiUrl` is static regardless of environment. |
| **Credentials in source code**: User credentials are stored directly in the configuration file, which poses security risks if the repository is public or accessed by unauthorized users. | ⚠️ Identified | File: `api-test.config.ts` lines 11-26. Credentials are visible in source code. |
| **No TypeScript type definition**: The `config` object doesn't have explicit TypeScript types, making it harder to catch errors at compile time and reducing IDE autocomplete support. | ℹ️ Low Priority | File: `api-test.config.ts`. No interface or type definition for the config object structure. |
| **Missing error handling**: If an invalid environment is provided, the code silently uses default credentials without warning the user. | ⚠️ Identified | File: `api-test.config.ts`. No error handling or warnings for invalid environments. |

### 🧱 36.4 Pending Fixes (TODO)

```md
- [ ] Fix default environment in `api-test.config.ts` to use `"qa"` instead of `"prod"` to prevent accidental production testing
- [ ] Add environment validation to ensure only supported environments (qa, stg, prod, dev) are used, throw error for invalid values
- [ ] Implement environment-based API URL configuration to support different API endpoints per environment
- [ ] Move sensitive credentials to environment variables instead of hardcoding them in the config file
- [ ] Create TypeScript interface for config object to improve type safety and IDE support
- [ ] Add warning/error logging when invalid environment is detected or when falling back to default credentials
- [ ] Consider adding a `.env.example` file to document required environment variables
- [ ] Add JSDoc comments to the config file explaining how to use environment variables
- [ ] Implement config validation function to ensure all required fields are present before tests run
- [ ] Consider adding support for config file overrides (e.g., `api-test.config.local.ts`) for local development
```

<br>

## 📚 Lecture 037: *Request Handler Improvement*

### 🧠 37.1 Context

The `RequestHandler` class uses a fluent API pattern where methods like `path()`, `params()`, `headers()`, and `body()` set internal state that persists until a request method (`getRequest()`, `postRequest()`, etc.) is called. However, this stateful design creates a critical problem: **state persists between requests**, causing unintended side effects when making multiple API calls in sequence.

**When it occurs:**
- When making multiple requests in the same test without explicitly resetting state
- When chaining multiple API calls where each should be independent
- When the same `RequestHandler` instance is reused across different test scenarios
- When query parameters, headers, or body from one request leak into subsequent requests

**Examples from the project:**
In the test `tests/08-TestWithConfig.spec.ts`, the "Side Effect Test" demonstrates this problem:
- First request: `api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200)` sets `queryParams = { limit: 10, offset: 0 }`
- Second request: `api.path("/tags").getRequest(200)` should have no query parameters, but the previous `queryParams` persist
- Result: The `/tags` endpoint receives unexpected query parameters (`?limit=10&offset=0`), potentially causing incorrect API behavior or test failures

**The solution:**
The `clearUpFields()` method resets all stateful fields (`apiPath`, `queryParams`, `apiHeaders`, `apiBody`, `baseUrl`) after each request completes. This ensures that each request starts with a clean slate, preventing state leakage between API calls.

**Advantages:**
- Prevents unintended state leakage between requests
- Makes each request independent and predictable
- Simplifies test writing by eliminating the need to manually reset state
- Reduces bugs caused by stale data from previous requests
- Improves test reliability and maintainability

**Disadvantages:**
- Requires careful placement of `clearUpFields()` to ensure it executes even if errors occur
- If `clearUpFields()` is called too early (before the request is sent), it could clear data needed for logging or error handling
- The method must be called in all request methods, creating potential for inconsistency
- No guarantee that cleanup happens if an exception occurs before the cleanup call

**When to consider alternatives:**
- **Immutable builder pattern**: Instead of mutating state, return new instances for each request (more memory-intensive but eliminates state issues)
- **Request-scoped state**: Use a request context object that's created fresh for each request
- **Functional approach**: Pass all request parameters directly to request methods instead of using fluent setters
- **Builder with explicit reset**: Require explicit `reset()` calls between requests (more verbose but gives developers control)

**Connection to practical implementation:**
The `clearUpFields()` method is strategically placed **after** the HTTP request is sent but **before** response processing. This ensures:
1. The request is sent with the correct configuration (state is still available)
2. Logging captures the actual request details (before cleanup)
3. State is cleared immediately after sending, preventing leakage
4. Response processing happens with a clean state for potential retries or error handling

The implementation uses a private method that resets all fields to their initial values, ensuring complete isolation between requests while maintaining the fluent API's convenience.

### ⚙️ 37.2 Updating code according the context:

#### 37.2.1 Little side effect regarding params:

Create a new test with `/articles` and `/tags` request which must failed
```ts
/* tests/08-TestWithConfig.spec.ts */
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";

let authToken: string;
test.beforeAll("runs before all", async ({ api, config }) => {
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: config.userEmail, password: config.userPassword } })
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);

  console.log("� tokenResponse.user: ", tokenResponse.user);
});

test("Side Effect Test", async ({ api }) => {
  // /articles request
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
  // /tags request
  const response2 = await api.path("/tags").getRequest(200);
  expect(response2.tags.length).shouldBeLessThanOrEqual(9);
  expect(response2.tags[0]).shouldEqual("Test");
});
``` 
![Article request with params](../img/section04-lecture037-001.png)
![Tags request with params which not must be there](../img/section04-lecture037-002.png)


#### 37.2.2 create a new method in order to clean up all fields:
```ts
/* utils/request-handler.ts */
import { APIRequestContext, expect } from "@playwright/test";
import { APILogger } from "./logger";

export class RequestHandler {
  private request: APIRequestContext;
  private logger: APILogger;
  private baseUrl: string | undefined;  // 👈🏽 ✅ (1)
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
    this.logger = logger;
  }

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

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the GET request
    this.logger.logRequest("GET", url, this.apiHeaders, this.apiBody);

    // Send the request
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });
    this.clearUpFields();  // 👈🏽 ✅ (2)

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.getRequest);
    return responseJSON;
  }

  async postRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the POST request
    this.logger.logRequest("POST", url, this.apiHeaders, this.apiBody);

    // Send the request
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });
    this.clearUpFields();  // 👈🏽 ✅ (2)

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.postRequest);

    return responseJSON;
  }

  async putRequest(statusCode: number) {
    // Get the URL
    const url = this.getUrl();

    // Log the PUT request
    this.logger.logRequest("PUT", url, this.apiHeaders, this.apiBody);

    // Send the PUT request
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });
    this.clearUpFields();  // 👈🏽 ✅ (2)

    // Obtain the actual status and response JSON
    const actualStatus = response.status();
    const responseJSON = await response.json();

    // Log the response
    this.logger.logResponse(actualStatus, responseJSON);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.putRequest);

    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();

    // Log the DELETE request
    this.logger.logRequest("DELETE", url, this.apiHeaders);

    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });
    this.clearUpFields();  // 👈🏽 ✅ (2)

    // Obtain the actual status
    const actualStatus = response.status();

    // Log the response
    this.logger.logResponse(actualStatus);

    // Assert the actual status is equal to the expected status
    // ♻️ expect(actualStatus).toEqual(statusCode);
    this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest);

    return response;
  }

  private getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);

    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    //console.log("\n🚀 url: ", url.toString(), "\n");
    return url.toString();
  }

  // Private method to validate the status code in "expect(actualStatus).toEqual(statusCode);"
  private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function) {
    if (actualStatus !== expectedStatus) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(`Expected status ${expectedStatus} but got ${actualStatus}\n\nRecent API Activity: \n${logs}`);
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }

  private clearUpFields() {  // 👈🏽 ✅ (1)
    this.apiBody = {};
    this.apiHeaders = {};
    this.baseUrl = undefined;
    this.apiPath = "";
    this.queryParams = {};
  }
}
``` 

#### RequestHandler Flow
```mermaid
sequenceDiagram
    participant Test as Test Script
    participant Handler as RequestHandler
    participant Logger as APILogger
    participant API as APIRequestContext
    participant Server as External API

    %% Configuration Phase
    Note over Test,Handler: CONFIGURATION PHASE
    Test->>Handler: .url("https://api.example.com")
    activate Handler
    Handler-->>Test: return this (for chaining)
    
    Test->>Handler: .path("/users")
    Handler-->>Test: return this
    
    Test->>Handler: .headers({"Auth": "token"})
    Handler-->>Test: return this
    
    Test->>Handler: .body({"name": "John"})
    Handler-->>Test: return this
    
    Note over Test,Handler: State is now set:<br/>- baseUrl: "https://api.example.com"<br/>- apiPath: "/users"<br/>- apiHeaders: {"Auth": "token"}<br/>- apiBody: {"name": "John"}
    
    %% Execution Phase
    Note over Test,Handler: EXECUTION PHASE
    Test->>Handler: .postRequest(201)
    
    Handler->>Handler: getUrl()<br/>Builds: https://api.example.com/users
    
    Handler->>Logger: logRequest("POST", url, headers, body)
    activate Logger
    Logger-->>Handler: Log recorded
    deactivate Logger
    
    Handler->>API: request.post(url, {headers, data:body})
    activate API
    API->>Server: HTTP POST /users
    activate Server
    Server-->>API: HTTP Response (201 Created)
    deactivate Server
    API-->>Handler: Response object
    deactivate API
    
    Note over Handler: 🚨 CRITICAL MOMENT<br/>State is still available for logging
    Handler->>Handler: 🚀 clearUpFields()
    Note over Handler: State is now cleared:<br/>- baseUrl: undefined<br/>- apiPath: ""<br/>- apiHeaders: {}<br/>- apiBody: {}
    
    %% Response Processing Phase
    Note over Test,Handler: RESPONSE PROCESSING PHASE
    Handler->>Handler: response.status() → 201
    Handler->>Handler: response.json() → {"id": 123}
    
    Handler->>Logger: logResponse(201, {"id": 123})
    activate Logger
    Logger-->>Handler: Log recorded
    deactivate Logger
    
    Handler->>Handler: statusCodeValidator(201, 201)
    Handler-->>Test: return {"id": 123}
    deactivate Handler
```

#### Alternative Diagram Showing the Problem If clearUpFields() Was Called Earlier:
```mermaid
sequenceDiagram
    participant Test as Test Script
    participant Handler as RequestHandler
    participant Logger as APILogger
    participant API as APIRequestContext
    participant Server as External API

    Test->>Handler: .postRequest(201)
    
    Handler->>Handler: getUrl()
    Note over Handler: URL built successfully
    
    Handler->>Logger: logRequest("POST", url, headers, body)
    Note over Logger: Logs actual request data ✓
    
    %% 🚨 INCORRECT: Clearing BEFORE sending request
    Handler->>Handler: 🚀🔥 clearUpFields() ⚠️ TOO EARLY!
    Note over Handler: State cleared!<br/>Headers and body are now empty!
    
    Handler->>API: request.post(url, {headers, data:body})
    Note over Handler,API: ⚠️ PROBLEM: headers={}, data={}<br/>Empty request sent!
    
    API->>Server: HTTP POST /users<br/>(No headers, no body)
    Server-->>API: HTTP 400 Bad Request
    API-->>Handler: Error response
    
    Handler->>Logger: logResponse(400)
    Handler->>Handler: statusCodeValidator(400, 201)
    Note over Handler: ❌ Validation fails<br/>But debugging is harder because<br/>logs show correct request<br/>but actual request was empty!
    
    Handler-->>Test: Throws error
```

#### 37.2.3

The implementation is complete. The `clearUpFields()` method ensures that each request starts with a clean state, preventing side effects between consecutive API calls.

### 🐞 37.3 Issues:

| Issue | Status | Log/Error |
|---|---|---|
| **No error handling guarantee**: If an exception occurs before `clearUpFields()` is called (e.g., network error, timeout), the state remains dirty and affects subsequent requests. The cleanup should be wrapped in a `try-finally` block to ensure it always executes. | ⚠️ Identified | File: `utils/request-handler.ts` lines 45-68, 71-97, 99-125, 127-149. `clearUpFields()` is called after the request but not protected by error handling. If `response.status()` or `response.json()` throws, cleanup never happens. |
| **Inconsistent cleanup timing**: The `clearUpFields()` is called immediately after sending the request but before processing the response. If response processing fails, the state is already cleared, which might make debugging harder since the request configuration is lost. | ℹ️ Low Priority | File: `utils/request-handler.ts`. The cleanup happens at line 56 (getRequest), 83 (postRequest), 111 (putRequest), 136 (deleteRequest), but response processing happens after. If response processing fails, we lose the request context. |
| **Missing cleanup in error scenarios**: If `statusCodeValidator()` throws an error, the state has already been cleared, but if an error occurs before `clearUpFields()` (e.g., in `getUrl()` or during request sending), state persists. | ⚠️ Identified | File: `utils/request-handler.ts`. No `try-finally` protection around request execution. Errors in `this.request.get/post/put/delete()` or `getUrl()` could leave state dirty. |
| **No validation of cleanup effectiveness**: There's no mechanism to verify that `clearUpFields()` actually resets all state correctly. If a new field is added to the class but forgotten in `clearUpFields()`, it could cause subtle bugs. | ℹ️ Low Priority | File: `utils/request-handler.ts` line 171-177. The `clearUpFields()` method manually resets each field, but there's no automated check to ensure all stateful fields are included. |
| **Potential race condition in concurrent tests**: If tests run in parallel and share the same `RequestHandler` instance (though unlikely with Playwright fixtures), state could be cleared by one test while another is still using it. | ℹ️ Low Priority | File: `utils/fixtures.ts`. Each test gets its own `RequestHandler` instance, so this is unlikely, but worth noting for future parallel execution scenarios. |
| **Type safety issue with object reset**: The `queryParams` and `apiBody` are reset to `{}` (empty object), but TypeScript doesn't enforce that these are actually objects. If someone accidentally assigns a non-object value, the reset might not work as expected. | ℹ️ Low Priority | File: `utils/request-handler.ts` lines 10-11. Types are `object` which is too generic. Should use more specific types like `Record<string, any>` or proper interfaces. |

### 🧱 37.4 Pending Fixes (TODO)

```md
- [ ] Wrap request execution in `try-finally` blocks to ensure `clearUpFields()` always executes, even if errors occur during request sending or response processing. File: `utils/request-handler.ts` lines 45-68, 71-97, 99-125, 127-149
- [ ] Consider moving `clearUpFields()` to a `finally` block to guarantee cleanup regardless of success or failure. This ensures state is always reset even if exceptions occur.
- [ ] Add unit tests to verify that `clearUpFields()` correctly resets all stateful fields and that subsequent requests don't inherit state from previous requests
- [ ] Create a helper method or use reflection to automatically detect and reset all stateful fields, reducing the risk of forgetting to reset new fields when they're added
- [ ] Improve type safety by replacing `object` types with more specific types (e.g., `Record<string, any>` for `queryParams` and `apiBody`) to prevent accidental type mismatches
- [ ] Add JSDoc comments to `clearUpFields()` explaining when and why it's called, and document the order of operations (request → cleanup → response processing)
- [ ] Consider adding a `reset()` public method that can be called explicitly by tests if they need to reset state manually between requests
- [ ] Add logging or debugging hooks to track when `clearUpFields()` is called to help diagnose state-related issues in tests
- [ ] Document the stateful nature of `RequestHandler` in class-level JSDoc to warn developers about the need for cleanup between requests
- [ ] Consider adding a flag or option to disable automatic cleanup for advanced use cases where state persistence might be desired
```
<br>

## 📚 Lecture 038: *Authorization Helper*

### 🧠 38.1 Context

An **authorization helper** is a reusable utility that performs authentication (login) and returns an **Authorization header value** (token) that can be attached to subsequent API calls.

In API test automation, this pattern is useful because:

- **It avoids duplication**: login logic (endpoint, request body, success status, token extraction) is written once and reused.
- **It improves maintainability**: if the login endpoint or payload changes, we update one helper instead of many tests.
- **It reduces test noise**: tests can focus on business behavior (create/update/delete) rather than setup mechanics.

In this project, authenticated endpoints require:

- **Header**: `Authorization: Token <jwt>`
- **Token source**: the `/users/login` response at `response.user.token`

Examples in this repo:

- `tests/09-TestWithCreteToken.spec.ts` calls `createToken(...)` in `beforeAll` and reuses the resulting header for multiple tests.
- `helpers/createToken.ts` creates its own request context and `RequestHandler`, so tests no longer depend on the `api` fixture to perform login.

Advantages:

- **DRY & consistent**: one token generation flow for all tests.
- **Encapsulation**: token creation details (URL, endpoint, payload, status checks) are hidden from tests.
- **Safer setup**: the helper can clean up its API context (`dispose`) reliably.

Disadvantages:

- **Extra request context per token**: creating a fresh `APIRequestContext` for each token call can be slightly slower.
- **Coupling to a specific auth scheme**: this helper returns `"Token <...>"` which matches Conduit API, but may differ across systems (e.g., `Bearer <...>`).

When to consider alternatives:

- **Use storage state / session caching** if you want to avoid logging in for each test file.
- **Use a fixture** that generates the token once per worker when scaling test suites.
- **Use a service user / API key** if the system supports stable non-expiring credentials for automation.

### ⚙️ 38.2 Updating code according the context:

#### 38.2.1 Adding `helpers/createToken.ts` file:
```ts
/* helpers/createToken.ts */
import { RequestHandler } from "../utils/request-handler";
export async function createToken(api: RequestHandler, email: string, password: string) {
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: email, password: password } })
    .postRequest(200);
  return "Token " + tokenResponse.user.token;
}
``` 

and running the test:

```ts
/* tests/09-TestWithCreteToken.spec.ts */
import { createToken } from "../helpers/createToken";    // 👈🏽 ✅
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";
let authToken: string;
test.beforeAll("runs before all", async ({ api, config }) => {
  console.log("\n\n\n🚀 LOGIN");
  // const tokenResponse = await api
  //   .path("/users/login")
  //   .body({ user: { email: config.userEmail, password: config.userPassword } })
  //   .postRequest(200);
  //authToken = "Token " + tokenResponse.user.token;
  authToken = await createToken(api, config.userEmail, config.userPassword);    // 👈🏽 ✅
  console.log("\n 🔐 authToken: ", authToken);
});

test("Side Effect Test", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);

  const response2 = await api.path("/tags").getRequest(200);
  expect(response2.tags.length).shouldBeLessThanOrEqual(10);
  expect(response2.tags[0]).shouldEqual("Test");
});
``` 

![](../img/section04-lecture038-001.png)

Issue:
* dependency on the `api` fixture
* need to pass into this reusable function.

#### 38.2.2 Making `createToken` independent:
```ts
/* helpers/createToken.ts */
import { RequestHandler } from "../utils/request-handler";
import { request } from "@playwright/test";                             // 👈🏽 ✅
import { APILogger } from "../utils/logger";                            // 👈🏽 ✅ 
import { config } from "../api-test.config";                            // 👈🏽 ✅

type LoginResponse = {
  user: {
    token: string;
  };
};

export async function createToken(email: string, password: string): Promise<string> {    // 👈🏽 ✅
  if (!email) {
    throw new Error("createToken: 'email' is required");
  }

  if (!password) {
    throw new Error("createToken: 'password' is required");
  }

  const context = await request.newContext();                           // 👈🏽 ✅
  const logger = new APILogger();                                       // 👈🏽 ✅
  const api = new RequestHandler(context, config.apiUrl, logger);       // 👈🏽 ✅

  try {
    const tokenResponse = (await api
      .path("/users/login")
      .body({ user: { email: email, password: password } })
      .postRequest(200)) as LoginResponse;

    if (!tokenResponse?.user?.token) {
      throw new Error("createToken: missing token in login response");
    }

    return "Token " + tokenResponse.user.token;
  } catch (error) {
    const safeError = error instanceof Error ? error : new Error(String(error));
    Error.captureStackTrace(safeError, createToken);
    throw safeError;
  } finally {
    await context.dispose();
  }
}
``` 


#### 38.2.3
```ts
/* tests/09-TestWithCreteToken.spec.ts */
import { createToken } from "../helpers/createToken";
import { expect } from "../utils/custom-expect";
import { test } from "../utils/fixtures";

let authToken: string;
test.beforeAll("runs before all", async ({ config }) => {
  if (!config.userEmail || !config.userPassword) {
    throw new Error("userEmail or userPassword is not defined in config");
  }

  authToken = await createToken(config.userEmail, config.userPassword);
});

``` 


### 🐞 38.3 Issues:

| Issue | Status | Log/Error |
|---|---|---|
| **Swallowed error in docs example**: the `catch` block captures the stack but does not rethrow, which makes tests continue with `undefined` token and creates confusing downstream failures. | ✅ Fixed | File: `docs/LECTURE_STEPS.md` section 38.2.2. The helper must `throw` after capturing the stack to fail fast. |
| **Weak typing for login response**: without a response type, `tokenResponse.user.token` can fail at runtime if the API contract changes. | ✅ Fixed | File: `helpers/createToken.ts`. Added `LoginResponse` typing and a guard for missing token. |
| **Missing input validation**: calling `createToken("", "")` produces hard-to-diagnose auth failures. | ✅ Fixed | File: `helpers/createToken.ts`. Added early validation for `email` and `password`. |
| **Extra context creation per token call**: `request.newContext()` is created for each `createToken` call. If many tests call this repeatedly, it can slow the suite. | ℹ️ Low Priority | File: `helpers/createToken.ts`. Consider caching the token per worker or moving token generation into a fixture with broader scope. |


### 🧱 38.4 Pending Fixes (TODO)

```md
- [ ] Consider caching the auth token per worker/test file to avoid repeated logins. Files: `helpers/createToken.ts`, `tests/09-TestWithCreteToken.spec.ts`
- [ ] Add a dedicated auth fixture (e.g. `authToken`) that generates the token once and injects it into tests, instead of managing a module-level variable. File: `utils/fixtures.ts`
- [ ] Create a small response contract interface for `/users/login` (and other auth endpoints) to keep API typing consistent across the test suite. Files: `helpers/createToken.ts` (and future auth helpers)
- [ ] Standardize auth header formatting (`Token` vs `Bearer`) via a helper (e.g. `formatAuthHeader(token)`) if supporting multiple APIs/environments. Files: `helpers/createToken.ts`, tests using `.headers({ Authorization: authToken })`
```















---

🔥 🔥 🔥 

<br>

## 📚 Lecture YYY: *{{TITLE_NAME}}*

### 🧠 XX.1 Context


### ⚙️ XX.2 Updating code according the context:

#### XX.2.1
```ts
/*  */

``` 


#### XX.2.2
```ts
/*  */

``` 


#### XX.2.3
```ts
/*  */

``` 


### 🧱 XX.3 Pending Fixes (TODO)

- [ ] 

