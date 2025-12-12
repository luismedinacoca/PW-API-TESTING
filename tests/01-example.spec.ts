import { test, expect } from "@playwright/test";

test("GET Test tags", async ({ request }) => {
  const tagResponse = await request.get("https://conduit-api.bondaracademy.com/api/tags");
  console.log("\n 1️⃣  tagResponse: ", tagResponse);

  console.log("\n 2️⃣  tagResponse.status(): ", tagResponse.status());

  console.log("\n👉🏽 expect(tagResponse.status()).toEqual(200) ");
  expect(tagResponse.status()).toEqual(200);

  console.log("\n 3️⃣  const tagResponseJSON = await tagResponse.json();");
  const tagResponseJSON = await tagResponse.json();

  console.log("\n 4️⃣  tagresponseJSON: ", tagResponseJSON);

  console.log('\n👉🏽 expect(tagResponseJSON.tags[0]).toEqual("Test")');
  expect(tagResponseJSON.tags[0]).toEqual("Test");

  console.log("\n👉🏽 expect(tagResponseJSON.tags.length).toBeLessThanOrEqual(10)");
  expect(tagResponseJSON.tags.length).toBeLessThanOrEqual(10);
});

test("GET all Articles", async ({ request }) => {
  const articlesResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0");
  console.log("\n 1️⃣  articlesResponse: ", articlesResponse);

  /* Headers Assertions: */
  console.log("\n 2️⃣  articlesResponse.status(): ", articlesResponse.status());
  expect(articlesResponse.status()).toEqual(200);

  console.log('\n👉🏽 expect(articlesResponse.statusText()).toBe("OK")');
  expect(articlesResponse.statusText()).toBe("OK");

  console.log('\n👉🏽 expect(articlesResponse.headers()["x-powered-by"]).toContain("Express")');
  expect(articlesResponse.headers()["x-powered-by"]).toContain("Express");

  console.log('\n👉🏽 expect(articlesResponse.headers()["content-type"]).toContain("application/json; charset=utf-8")');
  expect(articlesResponse.headers()["content-type"]).toContain("application/json; charset=utf-8");

  console.log('\n👉🏽 expect(articlesResponse.headers()["server"]).toEqual("Google Frontend")');
  expect(articlesResponse.headers()["server"]).toEqual("Google Frontend");

  console.log('\n👉🏽 expect(articlesResponse.headers()["vary"]).toEqual("Origin")');
  expect(articlesResponse.headers()["vary"]).toEqual("Origin");

  //console.log('\n👉🏽 expect(articlesResponse.headers()["etag"]).toEqual(\'W/"43a6-Gjq1VB37XI0Qah+vv/yPJ7BKfn0"\')');
  //expect.soft(articlesResponse.headers()["etag"]).toEqual('W/"43a6-Gjq1VB37XI0Qah+vv/yPJ7BKfn0"');

  /* Body Assertions: */
  const articlesResponseJSON = await articlesResponse.json();
  console.log("\n 3️⃣  articlesResponseJSON: ", articlesResponseJSON);

  console.log("\n👉🏽 expect(articlesResponseJSON.articles.length).toBeLessThanOrEqual(10)");
  expect(articlesResponseJSON.articles.length).toBeLessThanOrEqual(10);

  console.log("\n👉🏽 expect(articlesResponseJSON.articlesCount).toBe(10)");
  expect(articlesResponseJSON.articlesCount).toBe(10);

  console.log("\n👉🏽 expect(articlesResponseJSON.articles[9].favoritesCount).toBe(65)");
  expect(articlesResponseJSON.articles[9].favoritesCount).toBe(65);
  console.log("\n ✅ PASSED ✅");
});

test("POST and GET an Article", async ({ request }) => {
  console.log("\n\n\n🚀 LOGIN");
  const URL = "https://conduit-api.bondaracademy.com/api/users/login";
  const dataPayload = {
    user: {
      email: "suspiros@test.com",
      password: "Test!001",
    },
  };
  const tokenResponse = await request.post(URL, { data: dataPayload });

  console.log("\n  1️⃣   tokenResponse: ", tokenResponse);
  console.log('\n👉🏽 expect(tokenResponse.statusText()).toBe("OK")');
  expect(tokenResponse.statusText()).toBe("OK");
  console.log('\n👉🏽 expect(tokenResponse.headers()["x-powered-by"]).toContain("Express")');
  expect(tokenResponse.headers()["x-powered-by"]).toContain("Express");

  const tokenResponseJSON = await tokenResponse.json();
  console.log("\n  2️⃣   tokenResponseJSON: ", tokenResponseJSON);

  // Save token value:
  const authToken = "Token " + tokenResponseJSON.user.token;
  console.log("\n  3️⃣   authToken: ", authToken);

  const newDate = Date.now();

  console.log("\n\n\n🚀 POST REQUEST");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test TWO-1 TEST ${newDate}`,
        description: `Test TWO-1 TEST ${newDate} - Description`,
        body: "Test body",
        tagList: ["suspiros", "payoneer"],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });
  console.log("\n  4️⃣   newArticleResponse: ", newArticleResponse);

  console.log("\n  5️⃣   newArticleResponse.status(): ", newArticleResponse.status());
  expect(newArticleResponse.status()).toEqual(201);
  console.log("\n👉🏽 expect(newArticleResponse.status()).toEqual(201)");

  const newArticleResponseJSON = await newArticleResponse.json();
  console.log("\n  6️⃣   newArticleResponseJSON: ", newArticleResponseJSON);

  expect(newArticleResponseJSON.article.title).toEqual(`Test TWO-1 TEST ${newDate}`);
  const newTitle = `Test TWO-1 TEST ${newDate}`;
  console.log("\n👉🏽 expect(newArticleResponseJSON.article.title).toEqual(" + newTitle + ")");

  console.log("\n\n\n🚀 GET REQUEST");
  //Verify this new Article was added:
  const articlesResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: authToken,
    },
  });
  //console.log("\n 7️⃣  articlesResponse: ", articlesResponse);

  /* Headers Assertions: */
  console.log("\n 8️⃣  articlesResponse.status(): ", articlesResponse.status());
  expect(articlesResponse.status()).toEqual(200);

  const articlesResponseJSON = await articlesResponse.json();
  console.log("\n 9️⃣  articlesResponseJSON: ", articlesResponseJSON);

  const foundArticle = articlesResponseJSON.articles.find((a: any) => a.title === newTitle);
  expect(foundArticle).toBeDefined();
  expect(foundArticle.title).toEqual(newTitle);
  console.log("\n👉🏽 expect(foundArticle.title).toEqual(" + newTitle + ")");

  console.log("\n\n\n  ✅ PASSED ✅");
});

test("POST and DELETE an Article", async ({ request }) => {
  console.log("\n\n\n🚀 LOGIN");
  const URL = "https://conduit-api.bondaracademy.com/api/users/login";
  const dataPayload = {
    user: {
      email: "suspiros@test.com",
      password: "Test!001",
    },
  };
  const tokenResponse = await request.post(URL, { data: dataPayload });

  console.log("\n  1️⃣   tokenResponse: ", tokenResponse);
  console.log('\n👉🏽 expect(tokenResponse.statusText()).toBe("OK")');
  expect(tokenResponse.statusText()).toBe("OK");
  console.log('\n👉🏽 expect(tokenResponse.headers()["x-powered-by"]).toContain("Express")');
  expect(tokenResponse.headers()["x-powered-by"]).toContain("Express");

  const tokenResponseJSON = await tokenResponse.json();
  console.log("\n  2️⃣   tokenResponseJSON: ", tokenResponseJSON);

  // Save token value:
  const authToken = "Token " + tokenResponseJSON.user.token;
  console.log("\n  3️⃣   authToken: ", authToken);

  const newDate = Date.now();

  console.log("\n\n\n🚀 POST REQUEST");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test TWO-2 TEST ${newDate}`,
        description: `Test TWO-2 TEST ${newDate} - Description`,
        body: "Test body",
        tagList: ["suspiros", "payoneer"],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });
  console.log("\n  4️⃣   newArticleResponse: ", newArticleResponse);

  console.log("\n  5️⃣   newArticleResponse.status(): ", newArticleResponse.status());
  expect(newArticleResponse.status()).toEqual(201);
  console.log("\n👉🏽 expect(newArticleResponse.status()).toEqual(201)");

  const newArticleResponseJSON = await newArticleResponse.json();
  console.log("\n  6️⃣   newArticleResponseJSON: ", newArticleResponseJSON);

  expect(newArticleResponseJSON.article.title).toEqual(`Test TWO-2 TEST ${newDate}`);
  const newTitle = `Test TWO-2 TEST ${newDate}`;
  console.log("\n👉🏽 expect(newArticleResponseJSON.article.title).toEqual(" + newTitle + ")");

  // Save slugId value:
  const slugId = newArticleResponseJSON.article.slug;
  console.log("\n  7️⃣   slugId: ", slugId);

  console.log("\n\n\n🚀 GET REQUEST");
  //Verify this new Article was added - GET Request
  const articlesResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: authToken,
    },
  });

  /* Headers Assertions: */
  console.log("\n 8️⃣  articlesResponse.status(): ", articlesResponse.status());
  expect(articlesResponse.status()).toEqual(200);

  const articlesResponseJSON = await articlesResponse.json();
  console.log("\n 9️⃣  articlesResponseJSON: ", articlesResponseJSON);

  const foundArticle = articlesResponseJSON.articles.find((a: any) => a.slug === slugId);
  expect(foundArticle).toBeDefined();
  expect(foundArticle.title).toEqual(newTitle);
  console.log("\n👉🏽 expect(foundArticle.title).toEqual(" + newTitle + ")");

  console.log("\n\n\n🚀 DELETE REQUEST");
  // DELETE request:
  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      Authorization: authToken,
    },
  });

  expect(deleteResponse.status()).toEqual(204);
  console.log("\n👉🏽 expect(deleteResponse.status()).toEqual(204)");

  console.log("\n\n\n  ✅ PASSED ✅");
});

test("POST, PATCH and DELETE an Article", async ({ request }) => {
  console.log("\n\n\n🚀 ************* LOGIN *************");
  const URL = "https://conduit-api.bondaracademy.com/api/users/login";
  const dataPayload = {
    user: {
      email: "suspiros@test.com",
      password: "Test!001",
    },
  };
  const tokenResponse = await request.post(URL, { data: dataPayload });

  console.log("\n  1️⃣   tokenResponse: ", tokenResponse);
  console.log('\n👉🏽 expect(tokenResponse.statusText()).toBe("OK")');
  expect(tokenResponse.statusText()).toBe("OK");
  console.log('\n👉🏽 expect(tokenResponse.headers()["x-powered-by"]).toContain("Express")');
  expect(tokenResponse.headers()["x-powered-by"]).toContain("Express");

  const tokenResponseJSON = await tokenResponse.json();
  console.log("\n  2️⃣   tokenResponseJSON: ", tokenResponseJSON);

  // Save token value:
  const authToken = "Token " + tokenResponseJSON.user.token;
  console.log("\n  3️⃣   authToken: ", authToken);

  const newDate = Date.now();

  console.log("\n\n\n🚀  ************* POST REQUEST *************");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test TWO-3 TEST ${newDate}`,
        description: `Test TWO-3 TEST ${newDate} - Description`,
        body: "Test body",
        tagList: [],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });
  console.log("\n ①   newArticleResponse: ", newArticleResponse);

  console.log("\n ②   newArticleResponse.status(): ", newArticleResponse.status());
  expect(newArticleResponse.status()).toEqual(201);
  console.log("\n👉🏽 expect(newArticleResponse.status()).toEqual(201)");

  const newArticleResponseJSON = await newArticleResponse.json();
  console.log("\n ③   newArticleResponseJSON: ", newArticleResponseJSON);

  expect(newArticleResponseJSON.article.title).toEqual(`Test TWO-3 TEST ${newDate}`);
  const newTitle = `Test TWO-3 TEST ${newDate}`;
  console.log("\n👉🏽 expect(newArticleResponseJSON.article.title).toEqual(" + newTitle + ")");

  // Save slugId value:
  const slugId = newArticleResponseJSON.article.slug;
  console.log("const slugId = newArticleResponseJSON.article.slug");
  console.log("\n ④   slugId: ", slugId);

  console.log("\n\n\n🚀  ************* GET REQUEST *************");
  //Verify this new Article was added - GET Request
  const articlesResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: authToken,
    },
  });

  /* Headers Assertions: */
  console.log("\n 8️⃣  articlesResponse.status(): ", articlesResponse.status());
  expect(articlesResponse.status()).toEqual(200);

  const articlesResponseJSON = await articlesResponse.json();
  console.log("\n 9️⃣  articlesResponseJSON: ", articlesResponseJSON);

  const foundArticle = articlesResponseJSON.articles.find((a: any) => a.title === newTitle);
  expect(foundArticle).toBeDefined();
  expect(foundArticle.title).toEqual(newTitle);
  console.log("\n👉🏽 expect(foundArticle.title).toEqual(" + newTitle + ")");

  console.log("\n\n\n🚀 ************* PUT REQUEST *************");

  const newTitleModified = `Test TWO2 TEST MODIFIED ${newDate}`;
  const newModifiedArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    data: {
      article: {
        slug: slugId,
        title: newTitleModified,
        description: `Test TWO-3 TEST MODIFIED ${newDate} - Description`,
        body: "Test body",
        tagList: ["suspiros", "payoneer"],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });

  console.log("\n ❶   newModifiedArticleResponse: ", newModifiedArticleResponse);

  expect(newModifiedArticleResponse.status()).toEqual(200);
  console.log("\n ❸   expect(newModifiedArticleResponse.status()).toEqual(200)");

  const newModifiedArticleResponseJSON = await newModifiedArticleResponse.json();
  console.log("\n ❷   newModifiedArticleResponseJSON: ", newModifiedArticleResponseJSON);

  const modifiedSlugId = newModifiedArticleResponseJSON.article.slug;
  console.log("\n ❹   modifiedSlugId: ", modifiedSlugId);

  console.log("\n\n\n🚀  ************* GET REQUEST *************");
  //Verify this new Article was added - GET Request
  const articlesModifiedResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      headers: {
        Authorization: authToken,
      },
    }
  );

  /* Headers Assertions: */
  console.log("\n 8️⃣  articlesModifiedResponse.status(): ", articlesModifiedResponse.status());
  expect(articlesModifiedResponse.status()).toEqual(200);

  const articlesModifiedResponseJSON = await articlesModifiedResponse.json();
  console.log("\n 9️⃣  articlesModifiedResponseJSON: ", articlesModifiedResponseJSON);

  const foundModifiedArticle = articlesModifiedResponseJSON.articles.find((a: any) => a.slug === modifiedSlugId);
  expect(foundModifiedArticle).toBeDefined();
  expect(foundModifiedArticle.title).toEqual(newTitleModified);
  console.log("\n👉🏽 expect(foundModifiedArticle.title).toEqual(" + newTitleModified + ")");

  // newModifiedArticleresponseJSON - modifiedSlugId

  console.log("\n\n\n🚀 ************* DELETE REQUEST *************");
  // DELETE request:
  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${modifiedSlugId}`, {
    headers: {
      Authorization: authToken,
    },
  });

  expect(deleteResponse.status()).toEqual(204);
  console.log("\n👉🏽 expect(deleteResponse.status()).toEqual(204)");

  console.log("\n\n\n  ✅ PASSED ✅");

  /*
  🚀 ************* LOGIN *************
  
    1️⃣   tokenResponse:  APIResponse: 200 OK
    x-powered-by: Express
    vary: Origin
    content-type: application/json; charset=utf-8
    etag: W/"1aa-UrxtZFcNxFytRiycctI54W4nKu0"
    x-cloud-trace-context: 4bcd89b66f07629aa12e29719b8bc34c;o=1
    date: Thu, 20 Nov 2025 14:08:42 GMT
    server: Google Frontend
    Content-Length: 426
  
  👉🏽 expect(tokenResponse.statusText()).toBe("OK")
  
  👉🏽 expect(tokenResponse.headers()["x-powered-by"]).toContain("Express")
  
    2️⃣   tokenResponseJSON:  {
    user: {
      email: 'suspiros@test.com',
      username: 'suspiros_test',
      bio: null,
      image: 'https://media.istockphoto.com/id/1273058761/vector/tiny-people-testing-quality-assurance-in-software.jpg?s=1024x1024&w=is&k=20&c=tik8w_3BSxhhcM4MRiyOqQOQa5Q1f_-vI1utSQQ3lnE=',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMTQ0NH0sImlhdCI6MTc2MzY0NzcyMiwiZXhwIjoxNzY4ODMxNzIyfQ.j_oBeKmLVh4i7sKu51RhtsK7g6uzfVd9LGiD47y1z7Q'
    }
  }
  
    3️⃣   authToken:  Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMTQ0NH0sImlhdCI6MTc2MzY0NzcyMiwiZXhwIjoxNzY4ODMxNzIyfQ.j_oBeKmLVh4i7sKu51RhtsK7g6uzfVd9LGiD47y1z7Q
  
  
  
  🚀  ************* POST REQUEST *************
  
   ①   newArticleResponse:  APIResponse: 201 Created
    x-powered-by: Express
    vary: Origin
    content-type: application/json; charset=utf-8
    etag: W/"226-t8qvhpgK1Ge1oxKg78X/mcCn3i8"
    x-cloud-trace-context: e7e2acf1b1c9c6e4a12e29719b8bc158
    date: Thu, 20 Nov 2025 14:08:42 GMT
    server: Google Frontend
    Content-Length: 550
  
   ②   newArticleResponse.status():  201
  
  👉🏽 expect(newArticleResponse.status()).toEqual(201)
  
   ③   newArticleResponseJSON:  {
    article: {
      slug: 'Test-TWO-TEST-1763647722351-31444',
      title: 'Test TWO TEST 1763647722351',
      description: 'Test TWO TEST 1763647722351 - Description',
      body: 'Test body',
      tagList: [],
      createdAt: '2025-11-20T14:08:42.496Z',
      updatedAt: '2025-11-20T14:08:42.496Z',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'suspiros_test',
        bio: null,
        image: 'https://media.istockphoto.com/id/1273058761/vector/tiny-people-testing-quality-assurance-in-software.jpg?s=1024x1024&w=is&k=20&c=tik8w_3BSxhhcM4MRiyOqQOQa5Q1f_-vI1utSQQ3lnE=',
        following: false
      }
    }
  }
  
  👉🏽 expect(newArticleResponseJSON.article.title).toEqual(Test TWO TEST 1763647722351)
  const slugId = newArticleResponseJSON.article.slug
  
   ④   slugId:  Test-TWO-TEST-1763647722351-31444
  
  
  
  🚀  ************* GET REQUEST *************
  
   8️⃣  articlesResponse.status():  200
  
   9️⃣  articlesResponseJSON:  {
    articles: [
      {
        slug: 'Test-TWO-TEST-1763647722351-31444',
        title: 'Test TWO TEST 1763647722351',
        description: 'Test TWO TEST 1763647722351 - Description',
        body: 'Test body',
        tagList: [],
        createdAt: '2025-11-20T14:08:42.496Z',
        updatedAt: '2025-11-20T14:08:42.496Z',
        favorited: false,
        favoritesCount: 0,
        author: [Object]
      },
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
        favoritesCount: 963,
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
        favorited: true,
        favoritesCount: 405,
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
        favoritesCount: 200,
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
        favoritesCount: 84,
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
      }
    ],
    articlesCount: 11
  }
  
  👉🏽 expect(articlesResponseJSON.articles[0].title).toEqual(Test TWO TEST 1763647722351)
  
  
  
  🚀 ************* PUT REQUEST *************
  
   ❶   newModifiedArticleResponse:  APIResponse: 200 OK
    x-powered-by: Express
    vary: Origin
    content-type: application/json; charset=utf-8
    etag: W/"256-4ALCp8PUZj/snhctfSltEi1skMI"
    x-cloud-trace-context: 061de41a14c3f1a9a12e29719b8bc6c1
    date: Thu, 20 Nov 2025 14:08:43 GMT
    server: Google Frontend
    Content-Length: 598
  
   ❸   expect(newModifiedArticleResponse.status()).toEqual(200)
  
   ❷   newModifiedArticleResponseJSON:  {
    article: {
      slug: 'Test-TWO-TEST-MODIFIED-1763647722351-31444',
      title: 'Test TWO TEST MODIFIED 1763647722351',
      description: 'Test TWO TEST MODIFIED 1763647722351 - Description',
      body: 'Test body',
      tagList: [ 'suspiros', 'payoneer' ],
      createdAt: '2025-11-20T14:08:42.496Z',
      updatedAt: '2025-11-20T14:08:43.783Z',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'suspiros_test',
        bio: null,
        image: 'https://media.istockphoto.com/id/1273058761/vector/tiny-people-testing-quality-assurance-in-software.jpg?s=1024x1024&w=is&k=20&c=tik8w_3BSxhhcM4MRiyOqQOQa5Q1f_-vI1utSQQ3lnE=',
        following: false
      }
    }
  }
  
   ❹   modifiedSlugId:  Test-TWO-TEST-MODIFIED-1763647722351-31444
  
  
  
  🚀  ************* GET REQUEST *************
  
   8️⃣  articlesModifiedResponse.status():  200
  
   9️⃣  articlesModifiedResponseJSON:  {
    articles: [
      {
        slug: 'Test-TWO-TEST-MODIFIED-1763647722351-31444',
        title: 'Test TWO TEST MODIFIED 1763647722351',
        description: 'Test TWO TEST MODIFIED 1763647722351 - Description',
        body: 'Test body',
        tagList: [Array],
        createdAt: '2025-11-20T14:08:42.496Z',
        updatedAt: '2025-11-20T14:08:43.783Z',
        favorited: false,
        favoritesCount: 0,
        author: [Object]
      },
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
        favoritesCount: 963,
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
        favorited: true,
        favoritesCount: 405,
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
        favoritesCount: 200,
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
        favoritesCount: 84,
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
      }
    ],
    articlesCount: 11
  }
  
  👉🏽 expect(articlesModifiedResponseJSON.articles[0].title).toEqual(Test TWO TEST MODIFIED 1763647722351)
  
  
  
  🚀 ************* DELETE REQUEST *************
  
  👉🏽 expect(deleteResponse.status()).toEqual(204)
  
  
  
    ✅ PASSED ✅
    1 passed (4.0s)
  */
});
