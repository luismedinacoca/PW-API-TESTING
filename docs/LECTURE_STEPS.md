# 👨🏾‍💻 Section 04: Building a Framework

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



## 📚 Lecture 029: URL Builder

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


## 📚 Lecture 030: Request Handler Constructor

### 1. Issue: Share **`request`** through the whole framework:
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

### 2. Update the **`Fixture`**:
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


## 📚 Lecture 031: Get Requester

### 1. Create the **`getRequest`** method in **`request-handler.ts`**:
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


### 2. Create a second test:
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

#### 2.1. Expected Result:
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
    {
      slug: 'The-value-of-pre-recorded-video-classes.-The-most-efficient-approach-to-tranfer-the-knowledge-1',
      title: 'The value of pre-recorded video classes. The most efficient approach to tranfer the knowledge',
      description: 'As educational practices evolve, video tutorials have emerged as the most efficient method for imparting theoretical knowledge. At Bondar Academy, we prioritize expertly structured and crafted video tutorials, ensuring you learn quickly and effectively and advance your skills.',
      body: 'At Bondar Academy, we prioritize the value of your time and the efficiency of your education, distinguishing our approach from traditional colleges and live boot camps. Forget long, tedious live lectures on a fixed schedule. With us, you learn at your convenience and pace through optimized, structured video lectures. \n' +
        '\n' +
        'We understand your goal is rapid knowledge acquisition. Our pre-recorded and well-organized lectures are designed precisely for this, ensuring no slowdowns from group dynamics or unrelated instructor anecdotes. \n' +
        '\n' +
        'Dive straight into the subject matter, learn efficiently, and if questions arise, our immediate support on the Slack Workspace is there to streamline your learning process and swiftly remove any roadblocks.',
      tagList: [Array],
      createdAt: '2024-01-27T21:50:38.825Z',
      updatedAt: '2024-01-27T21:50:38.825Z',
      favorited: false,
      favoritesCount: 407,
      author: [Object]
    },
    {
      slug: 'Mastering-Knowledge-with-Self-Assessments:-Identifying-and-Bridging-Learning-Gaps-in-Education-1',
      title: 'Mastering Knowledge with Self-Assessments: Identifying and Bridging Learning Gaps in Education',
      description: "Self-assessment is an essential tool for gauging your understanding of lecture material. It answers critical questions: Have you grasped everything correctly? Is there anything you've missed? Are you prepared for the next lesson? These assessments ensure that you build a solid foundation of knowledge, confidently and efficiently paving the way for swift progress and effective learning outcomes.",
      body: "Traditional educational institutions, such as colleges and universities, commonly use tests and assessments to measure knowledge. This approach is effective for gauging student performance, but it's not without drawbacks. In these settings, assessments after every lecture aren't feasible due to the time required for teachers to evaluate them. This often leads to students having a false sense of understanding, believing they've comprehended all aspects of a lecture when, in reality, small but crucial details might be missed. These 'knowledge gaps' can accumulate, making more complex topics difficult to grasp later on.\n" +
        '\n' +
        "At Bondar Academy, we address this challenge by implementing self-assessments after every lecture. These are designed to cover key questions that ensure a thorough understanding of the material, essential for comfort and success in future lectures. The number of questions varies, ranging from 3-4 to 15-20, depending on the lecture's significance and the volume of critical information. With these self-assessments, students receive immediate feedback, helping them determine if they've fully understood the lecture or if they need to revisit certain parts or seek assistance from our instructors in the Slack Workspace.",
      tagList: [Array],
      createdAt: '2024-01-27T21:48:36.340Z',
      updatedAt: '2024-01-27T21:48:36.340Z',
      favorited: false,
      favoritesCount: 203,
      author: [Object]
    },
    {
      slug: 'Practical-Implementation-of-Skills:-Homework-Assignments-with-Instructor-Supervision-1',
      title: 'Practical Implementation of Skills: Homework Assignments with Instructor Supervision',
      description: 'Knowledge or skills not reinforced through practical exercises can quickly fade, often faster than anticipated. Homework, particularly in tasks like writing your own code, is crucial for honing these skills and cementing your understanding. At Bondar Academy, we ensure this vital step by assigning homework, rigorously evaluating the outcomes, and providing valuable feedback to guide your learning journey.',
      body: 'Homework assignments are a fundamental component of the educational methodology at Bondar Academy, especially in technical education where learning a new programming language or framework is involved. The key to mastering these skills lies in writing code; the more you write, the better you become. However, merely replicating code seen in lectures leads to minimal learning. Often, this approach leaves students unclear about why their code works the way it does, as they focus on copying rather than understanding.\n' +
        '\n' +
        'A homework assignment at Bondar Academy starts with a blank page, challenging students to apply all their knowledge to write the first line of code. This process is more demanding than it appears. As you write each line, understanding and reasoning grow, making your code meaningful and comprehensible. You learn to write code that makes sense to you, enhancing your understanding.\n' +
        '\n' +
        "In completing these assignments, you engage the 'thinking' part of your brain, transforming theoretical knowledge into practical skills. Recognizing the crucial role of homework in learning, our instructors at Bondar Academy are always available to assist with any challenges. Just reach out on Slack, and you'll receive the guidance and support needed for successful completion. At Bondar Academy, we fully understand the importance of homework assignments for the best outcome, so our instructors are always here to assist if you have any difficulties with completing them. Just ask in Slack and you'll be guided and assisted.",
      tagList: [Array],
      createdAt: '2024-01-27T21:46:09.512Z',
      updatedAt: '2024-01-27T21:46:09.512Z',
      favorited: false,
      favoritesCount: 85,
      author: [Object]
    },
    {
      slug: 'Embracing-Daily-Git-Routines:-Real-Code-Reviews-on-GitHub-for-Effective-Coding-Practice.-1',
      title: 'Embracing Daily Git Routines: Real Code Reviews on GitHub for Effective Coding Practice.',
      description: 'Learning to code is just one part of a larger skill set; effectively managing and organizing code is equally crucial. At Bondar Academy, we integrate Git and platforms like GitHub into the core learning cycle. With us, using Git becomes a regular routine, where organizing code in branches, storing it in remote repositories, and collaborating with others through strategies like branching, merging, pull requests, and code reviews are standard practice.',
      body: 'At Bondar Academy, mastering Git and GitHub is a fundamental step before delving into frameworks or programming languages. Effective code management, organization, and storage are crucial skills, and Git is the premier tool for this purpose. However, many learners initially find Git challenging due to its complexity and non-intuitive nature. To address this, our instructors have developed structured lectures on Git and GitHub, ensuring an efficient and thorough understanding of these essential tools. Git lessons are a mandatory prerequisite in every class. For a glimpse into our teaching approach, visit our YouTube channel: https://www.youtube.com/@BondarAcademy/playlists.\n' +
        '\n' +
        'In our courses, all homework assignments are reviewed using GitHub pull requests, mirroring the workflow in real-world software development environments. Students submit their code to their working branch for review. Our instructors then provide feedback, suggesting modifications or adjustments for pull request approval. This iterative process is repeated throughout the course, establishing Git usage as a natural and routine part of your coding practice.',
      tagList: [Array],
      createdAt: '2024-01-27T21:42:31.491Z',
      updatedAt: '2024-01-27T21:42:31.491Z',
      favorited: false,
      favoritesCount: 91,
      author: [Object]
    },
    {
      slug: 'Engaging-in-Live-Zoom-Sessions:-Interact-with-Instructors-and-Peers-Ask-Questions-in-Real-Time-1',
      title: 'Engaging in Live Zoom Sessions: Interact with Instructors and Peers, Ask Questions in Real-Time',
      description: 'In our increasingly online world, personal engagement remains a crucial element of effective learning. At Bondar Academy, we address this by hosting live Zoom sessions. These sessions provide a platform for live interaction between instructors and students, and among students themselves. Complementing our Slack channel, these live sessions offer an additional avenue for asking questions and engaging in meaningful discussions.',
      body: 'In our increasingly online world, personal engagement remains a crucial element of effective learning. \n' +
        'At Bondar Academy, we address this by hosting live Zoom sessions. These sessions provide a platform for live interaction between instructors and students and among students themselves. Complementing our Slack channel, these live sessions offer an additional avenue for asking questions and engaging in meaningful discussions.',
      tagList: [Array],
      createdAt: '2024-01-27T21:39:50.587Z',
      updatedAt: '2024-01-27T21:39:50.587Z',
      favorited: false,
      favoritesCount: 65,
      author: [Object]
    },
    {
      slug: 'Utilizing-Slack-for-Continuous-Engagement:-Connect-with-Instructors-Share-Insights-and-Collaborate-1',
      title: 'Utilizing Slack for Continuous Engagement: Connect with Instructors, Share Insights, and Collaborate',
      description: 'Slack stands out as a widely-used messaging and collaboration platform, celebrated for its convenience and versatility. It enables simultaneous participation in multiple conversations, supports comments and emoji reactions, and allows users to share screenshots, videos, and code snippets. Its functionality extends to making calls in huddle sessions. Given these robust features, Bondar Academy has chosen Slack as our primary communication platform, facilitating seamless interaction and collaboration.',
      body: "As a new member of Bondar Academy, one of your initial steps should be registering for the Bondar Academy Slack Workspace. Upon registration at Bondar Academy, you'll receive a welcome email containing the URL to join. This Workspace serves as a central hub for communication with instructors and fellow students. Whether you have a question, need to share code, or want to upload screenshots, Slack makes it easy and efficient. Moreover, its compatibility with both desktop and mobile devices, by downloading and installing the app, ensures you can stay connected with your instructors and the community wherever you go.",
      tagList: [Array],
      createdAt: '2024-01-27T21:38:27.992Z',
      updatedAt: '2024-01-27T21:38:27.992Z',
      favorited: false,
      favoritesCount: 61,
      author: [Object]
    },
    {
      slug: 'Stay-Ahead-with-Bondar-Academy:-Subscribe-to-Our-YouTube-channel-for-Latest-Tech-and-Education-Updates-1',
      title: 'Stay Ahead with Bondar Academy: Subscribe to Our YouTube channel for Latest Tech and Education Updates',
      description: "Who doesn't appreciate high-quality free resources? YouTube serves as an ideal platform for sharing the latest news, updates, and a wealth of tips and tricks in test automation and technology. Keep abreast of these invaluable insights by subscribing to the @bondaracademy YouTube channel.",
      body: "Who doesn't appreciate high-quality free resources? \n" +
        '\n' +
        'YouTube serves as an ideal platform for sharing the latest news, updates, and a wealth of tips and tricks in test automation and technology. \n' +
        '\n' +
        'Keep abreast of these invaluable insights by subscribing to our YouTube channel: https://www.youtube.com/@bondaracademy',
      tagList: [Array],
      createdAt: '2024-01-27T21:36:32.360Z',
      updatedAt: '2024-01-27T21:36:32.360Z',
      favorited: false,
      favoritesCount: 59,
      author: [Object]
    },
    {
      slug: "Explore-the-Latest-in-Learning:-Bondar-Academy-Blog's-Educational-Insights-from-Our-Experts-1",
      title: "Explore the Latest in Learning: Bondar Academy Blog's Educational Insights from Our Experts",
      description: 'Discover a treasure trove of knowledge on the Bondar Academy blog. Here, we share an array of tips, techniques, and valuable educational materials, all designed to keep you abreast of the latest technological trends and best practices. For easy access and continual learning, consider bookmarking our blog in your browser.',
      body: "On the Bondar Academy blog, we consistently provide insightful and pertinent updates on the latest in technology, test automation, and industry best practices. For your convenience, we recommend adding our blog to your browser's bookmarks. Our commitment to keeping you informed is reflected in our weekly posts, each focusing on a significant topic of the week.\n" +
        '\n' +
        "We value your input and invite you to contribute to our ever-evolving content. If you have any suggestions or specific topics you'd like us to explore, please feel free to share your ideas in the Bondar Academy Slack workspace. \n" +
        '\n' +
        'Discover our blog here: https://www.bondaracademy.com/blog\n',
      tagList: [Array],
      createdAt: '2024-01-27T21:34:04.531Z',
      updatedAt: '2024-01-27T21:34:04.531Z',
      favorited: false,
      favoritesCount: 60,
      author: [Object]
    },
    {
      slug: 'Take-the-Next-Step:-Join-Bondar-Academy-Today-and-Enroll-into-the-class-1',
      title: 'Take the Next Step: Join Bondar Academy Today and Enroll into the class',
      description: 'Are you prepared to transform your educational journey? Begin by signing up at Bondar Academy, then register for our Slack Workspace to start exploring. We offer a range of classes, with some being completely free and others featuring free previews of the initial sections. This allows you to experience our content and teaching approach firsthand, helping you make an informed decision before enrolling in a class.',
      body: 'Are you prepared to transform your educational journey? \n' +
        '\n' +
        'Begin by signing up at Bondar Academy, then register for our Slack Workspace to start exploring. We offer a range of classes, with some being completely free and others featuring free previews of the initial sections. This allows you to experience our content and teaching approach firsthand, helping you make an informed decision before enrolling in a class.\n' +
        '\n' +
        'Click here to enroll: https://www.bondaracademy.com',
      tagList: [Array],
      createdAt: '2024-01-27T21:32:21.056Z',
      updatedAt: '2024-01-27T21:32:21.056Z',
      favorited: false,
      favoritesCount: 65,
      author: [Object]
    }
  ],
  articlesCount: 10
}
  ✓  1 [chromium] › tests/04-smokeTestWithFixture.spec.ts:13:5 › Second Test using RequestHandler class (1.7s)

  1 passed (2.4s)
```

### 3. Adding assertion as `expect` in `getRequest` method:
```ts
/*  */
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

#### 3.1. Test must change:
```ts
/*  */
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

### 4. Apply `getRequest`to `/tags`:
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

#### 4.1 Expected Result:
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


## 📚 Lecture 032: Post, Put, and Delete Requester



## 📚 Lecture 0
## 📚 Lecture 0
## 📚 Lecture 0
