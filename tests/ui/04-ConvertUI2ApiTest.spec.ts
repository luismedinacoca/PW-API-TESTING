import { test, expect } from "@playwright/test";

test.use({
  baseURL: "https://conduit.bondaracademy.com/",
});

test("has title", async ({ browser }) => {
  const context = await browser.newContext({
    //recordHar: { path: 'output.har', mode: 'minimal' }
  })
  const page = await context.newPage();

  await page.goto('https://conduit.bondaracademy.com/');
  await page.getByRole("link", { name: "Sign in" }).click(); 
  await page.getByRole("textbox", { name: "Email" }).fill("youtubeuser@test.com"); 
  await page.getByRole("textbox", { name: "Password" }).fill("Welcome111"); 
  await page.getByRole("button", { name: "Sign in" }).click(); 

  await page.getByText("New Article").click(); 
  await page.getByRole("textbox", { name: "Article Title" }).fill("Playwright is awesome"); 
  await page.getByRole("textbox", { name: "What's this article about?" }).fill("About the Playwright"); 
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("We like to use playwright for automation");
  await page.getByRole("button", { name: "Publish Article" }).click(); 

  await expect(page.locator(".article-page h1")).toContainText("Playwright is awesome"); 

  await page.getByText("Home").first().click(); 
  await page.getByText("Global Feed").click(); 

  await expect(page.locator("app-article-list h1").first()).toContainText("Playwright is awesome"); 

  await page.getByText("Playwright is awesome").click(); 
  await page.getByRole("button", { name: "Delete Article" }).first().click(); 
  await page.getByText("Global Feed").click(); 

  await expect(page.locator("app-article-list h1").first()).not.toContainText("Playwright is awesome"); 

  await context.close(); 
});
