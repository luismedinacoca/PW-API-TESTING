import { test, expect } from "@playwright/test";

test.use({
  baseURL: 'https://playground.bondaracademy.com/',
})

test('has title', async ({ page }) => {
  await page.goto('/');
  
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await page.getByRole('checkbox', { name: 'Check me out' }).check({ force: true });
  await page.getByRole('textbox', { name: 'Recipients' }).fill('Artem Bondar');
  await page.getByRole('button', { name: 'Send' }).click();
})


/* https://www.youtube.com/watch?v=7ncfEG93g84&list=PL4a2-SrtFTviZQZiBiZD3cArnKjSDOMLy&index=23&pp=iAQB0gcJCZEKAYcqIYzv */
test('Do NOT force in Playwright', async ({ page }) => {
  await page.goto('/');
  
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await page.getByRole('checkbox', { name: 'Remember me' }).first().check({ force: true });
})

/*
- waiting for getByRole('checkbox', { name: 'Remember me' }).first()
- locator resolved to <input type="checkbox" _ngcontent-gjd-c111="" class="native-input visually-hidden"/>

👉🏽 "visually-hidden"
* visible
* stable
* receives events
* enabled
*/