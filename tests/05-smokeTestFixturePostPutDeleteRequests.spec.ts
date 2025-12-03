import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";

let authToken: string;
test.beforeAll("runs before all", async ({ api }) => {
  console.log("\n\n\n🚀 LOGIN");
  const tokenResponse = await api
    .path("/users/login")
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } })
    .postRequest(200);

  authToken = "Token " + tokenResponse.user.token;
  console.log("\n 🔐 authToken: ", authToken);
});

test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).toEqual(10);
});

test("Third Test - GET Tags", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);
  expect(response.tags.length).toBeLessThanOrEqual(10);
  expect(response.tags[0]).toEqual("Test");
});

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
