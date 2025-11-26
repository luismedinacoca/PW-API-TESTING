import { test, expect } from "@playwright/test";

let authToken: string;
test.beforeAll("runs before all", async ({ request }) => {
  console.log("\n\n\n🚪 ************* This is executed before all tests *************");
  console.log("\n\n🚀 LOGIN");
  const URL = "https://conduit-api.bondaracademy.com/api/users/login";
  const dataPayload = {
    user: {
      email: "suspiros@test.com",
      password: "Test!001",
    },
  };
  const tokenResponse = await request.post(URL, { data: dataPayload });
  const tokenResponseJSON = await tokenResponse.json();

  // Save token value:
  authToken = "Token " + tokenResponseJSON.user.token;
  console.log("\n  3️⃣   authToken: ", authToken);

})

test.afterAll("runs after all", async ({ }) => {
  console.log("\n\n\n🚪 ************* This is executed after all tests *************");
})

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
  expect(articlesResponseJSON.articles[9].favoritesCount).toBe(66);
  console.log("\n ✅ PASSED ✅");
});

test("POST and GET an Article", async ({ request }) => {
  const newDate = Date.now();

  console.log("\n\n\n🚀 POST REQUEST");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test TWO TEST ${newDate}`,
        description: `Test TWO TEST ${newDate} - Description`,
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

  expect(newArticleResponseJSON.article.title).toEqual(`Test TWO TEST ${newDate}`);
  const newTitle = `Test TWO TEST ${newDate}`;
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
  const newDate = Date.now();

  console.log("\n\n\n🚀 POST REQUEST");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test THREE TEST ${newDate}`,
        description: `Test THREE TEST ${newDate} - Description`,
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

  expect(newArticleResponseJSON.article.title).toEqual(`Test THREE TEST ${newDate}`);
  const newTitle = `Test THREE TEST ${newDate}`;
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

  const foundArticle = articlesResponseJSON.articles.find((a: any) => a.title === newTitle);
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
  const newDate = Date.now();

  console.log("\n\n\n🚀  ************* POST REQUEST *************");
  //create a new Article:
  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      article: {
        title: `Test FOUR TEST ${newDate}`,
        description: `Test FOUR TEST ${newDate} - Description`,
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

  expect(newArticleResponseJSON.article.title).toEqual(`Test FOUR TEST ${newDate}`);
  const newTitle = `Test FOUR TEST ${newDate}`;
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

  const foundArticle = articlesResponseJSON.articles.find((a: any) => a.slug === slugId);
  expect(foundArticle).toBeDefined();
  expect(foundArticle.title).toEqual(newTitle);
  console.log("\n👉🏽 expect(foundArticle.title).toEqual(" + newTitle + ")");

  console.log("\n\n\n🚀 ************* PUT REQUEST *************");

  const newTitleModified = `Test FOUR TEST MODIFIED ${newDate}`;
  const newModifiedArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    data: {
      article: {
        slug: slugId,
        title: newTitleModified,
        description: `Test FOUR TEST MODIFIED ${newDate} - Description`,
        body: "Test body",
        tagList: ["suspiros", "payoneer"],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });

  console.log("\n ❶   newModifiedArticleResponse: ", newModifiedArticleResponse)

  expect(newModifiedArticleResponse.status()).toEqual(200);
  console.log("\n ❸   expect(newModifiedArticleResponse.status()).toEqual(200)");

  const newModifiedArticleResponseJSON = await newModifiedArticleResponse.json();
  console.log("\n ❷   newModifiedArticleResponseJSON: ", newModifiedArticleResponseJSON);

  const modifiedSlugId = newModifiedArticleResponseJSON.article.slug;
  console.log("\n ❹   modifiedSlugId: ", modifiedSlugId);

  console.log("\n\n\n🚀  ************* GET REQUEST *************");
  //Verify this new Article was added - GET Request
  const articlesModifiedResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: authToken,
    },
  });

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
});
