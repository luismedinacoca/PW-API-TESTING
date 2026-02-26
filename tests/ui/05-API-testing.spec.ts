import { test, expect } from "@playwright/test";

test("API test - GET Request", async ({ request }) => {
  // request:
  const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');

  // response in json format:
  const responseObj = await response.json();
  console.log(responseObj);

  // assertions:
  expect(responseObj.tags[0]).toEqual('Test');
  expect(responseObj.tags[1]).toEqual('Git');
  expect(responseObj.tags[2]).toEqual('YouTube');

  expect(responseObj.tags).toHaveLength(10);
});

test('API Test - POST request', async({ request }) => {
  // request:
  const resp = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    headers: {
      Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNzIyNn0sImlhdCI6MTc3MDIzMzg0MCwiZXhwIjoxNzc1NDE3ODQwfQ.PBWR9jAvPX1QeLXsJSF_2pdO3FAtmJepAwuSuDHOCHQ'
    },
    data: {
      "article": {"title": "ARTEM", "description": "Bondar-academy", "body": "testing API in Playwright", "tagList": []}
    }
  });

  // ✅ Status assertion
  expect(resp.status()).toBe(200);

  const respObj = await resp.json();
  console.log(respObj);

  const article = respObj.article;

  // ✅ Root object checks
  expect(respObj).toHaveProperty('article');

  // ✅ Article basic fields
  expect(article.title).toBe('ARTEM');
  expect(article.description).toBe('Bondar-academy');
  expect(article.body).toBe('testing API in Playwright');
  expect(article.tagList).toEqual([]);

  // ✅ Slug (dynamic but predictable pattern)
  expect(article.slug).toContain('ARTEM');
  expect(article.slug).toMatch(/ARTEM-\d+/);

  // ✅ Dates
  expect(article.createdAt).toBeTruthy();
  expect(article.updatedAt).toBeTruthy();
  expect(new Date(article.createdAt).toString()).not.toBe('Invalid Date');
  expect(new Date(article.updatedAt).toString()).not.toBe('Invalid Date');

  // ✅ Favorites info
  expect(article.favorited).toBe(false);
  expect(article.favoritesCount).toBe(0);

  // ✅ Author object
  expect(article.author).toBeDefined();
  expect(article.author.username).toBe('YouTubeUser');
  expect(article.author.bio).toBeNull();
  expect(article.author.image).toContain('smiley-cyrus.jpeg');
  expect(article.author.following).toBe(false);
})
