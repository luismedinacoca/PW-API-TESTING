import { test, expect } from "@playwright/test";
import { RequestHandler } from "../utils/request-handler";

test("First Test using RequestHandler class", async ({ }) => {
  /*
  const articlesResponse = await request
    .get("https://conduit-api.bondaracademy.com/api
        /articles
        ?limit=10&offset=0");
  */
  const api = new RequestHandler();

  api
    .url('https://conduit-api.bondaracademy.com/api')
    .path('/articles')
    .params({ limit: 10, offset: 0 })
    .headers({ Authorization: "authToken" })
    .body({ user: { email: "suspiros@test.com", password: "Test!001" } })
})