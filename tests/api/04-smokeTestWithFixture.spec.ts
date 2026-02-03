import { expect } from "@playwright/test";
import { test } from "../../utils/fixtures";

test("First Test using RequestHandler class", async ({ api }) => {
  api
    .url("https://random-url.com/api")
    .path("/articles")
    .params({ limit: 10, offset: 0, foo: "bar" })
    .headers({ Authorization: "authToken" })
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } });
  //.getUrl();
  api.
});

test("Second Test - GET Articles", async ({ api }) => {
  const response = await api.path("/articles").params({ limit: 10, offset: 0 }).getRequest(200);
  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).toEqual(10);
  console.log("\n🚀 response: ", response);
});

test("Third Test - GET Tags", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);
  expect(response.tags.length).toBeLessThanOrEqual(10);
  expect(response.tags[0]).toEqual("Test");
  console.log("\n🚀 response: ", response);
});
