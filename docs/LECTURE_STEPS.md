# 👨🏾‍💻 Section 04: Building a Framework

## 📋 Project Overview

This project demonstrates the **step-by-step construction of a custom API testing framework** using Playwright and TypeScript. The framework provides a fluent, chainable API for building HTTP requests, making API testing more readable, maintainable, and efficient.

### What This Project Does

The framework evolves through six progressive lectures (029-034), starting from basic URL building to a complete HTTP client with:

- **Fluent API Design**: Chainable methods (`url()`, `path()`, `params()`, `headers()`, `body()`) for intuitive request construction
- **Full HTTP Support**: GET, POST, PUT, and DELETE methods with automatic status code validation
- **Custom Logging**: Comprehensive request/response logging for enhanced debugging
- **Error Handling**: Detailed error messages with full API activity context when tests fail
- **Playwright Integration**: Custom fixtures that seamlessly integrate with Playwright's test framework

### Technology Stack

- **Testing Framework**: Playwright Test (`@playwright/test`)
- **Language**: TypeScript
- **Target API**: Conduit API (`https://conduit-api.bondaracademy.com/api`)

### Key Components

- **`RequestHandler`**: Core class implementing the fluent API pattern for HTTP requests
- **`APILogger`**: Custom logging system capturing request/response details
- **Custom Fixtures**: Playwright fixtures providing `RequestHandler` instances to all tests
- **Test Suite**: Progressive examples demonstrating CRUD operations and best practices

This educational project serves as a practical guide for building maintainable, scalable API testing frameworks from scratch.

## 📑 Table of Contents

- [👨🏾‍💻 Section 04: Building a Framework](#-section-04-building-a-framework)
  - [📋 Project Overview](#-project-overview)
    - [What This Project Does](#what-this-project-does)
    - [Technology Stack](#technology-stack)
    - [Key Components](#key-components)
  - [📑 Table of Contents](#-table-of-contents)
  - [📚 Visual Project Tree](#-visual-project-tree)
  - [📚 Project Overview](#-project-overview-1)
    - [Purpose](#purpose)
    - [Technology Stack](#technology-stack-1)
    - [Key Components](#key-components-1)
      - [📁 Configuration Files](#-configuration-files)
      - [📁 Test Files (`tests/`)](#-test-files-tests)
      - [📁 Utility Modules (`utils/`)](#-utility-modules-utils)
      - [📁 Documentation (`docs/`)](#-documentation-docs)
    - [API Endpoints Tested](#api-endpoints-tested)
    - [Test Execution](#test-execution)
    - [Generated Directories](#generated-directories)
    - [Git Status](#git-status)
- [🧳 Section 04: Building a Framework](#-section-04-building-a-framework-1)
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

---

# 🧳 Section 04: Building a Framework

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