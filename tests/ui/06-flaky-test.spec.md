# Fixing Flaky Tests in Playwright (Race Condition Example)

This document explains why a Playwright test becomes flaky and how to
stabilize it using proper ожидание (waiting) strategies.

------------------------------------------------------------------------

## 🧠 What Is Happening in the App?

When you click **Edit**, the UI does **not** instantly show the textbox
with value `"cat"`.

Behind the scenes:

1.  You click **Edit**
2.  The app:
    -   loads data asynchronously
    -   renders a form
    -   fills the textbox with `"cat"`

This takes time (milliseconds... but enough to break tests).

------------------------------------------------------------------------

## ❌ Why the First Test Is Flaky

``` ts
await page.getByRole("textbox").fill("rabbit");
```

This assumes:

> "The textbox is already there and ready."

But sometimes:

-   the textbox exists ✔
-   **but its value ("cat") is not loaded yet**

So Playwright fills too early, and then the app overwrites it back to
`"cat"`:

    rabbit → cat

Result: - your `"rabbit"` gets lost - the test fails randomly

This is a **race condition** 🏎️

📖 Docs:\
https://playwright.dev/docs/actionability

> Playwright only waits for element to be visible & enabled --- **not
> for application state**.

------------------------------------------------------------------------

## ✅ Why the Second Test Works

``` ts
await expect(page.getByRole("textbox")).toHaveValue("cat");
```

This does **two important things**:

1.  Waits for the textbox to exist\
2.  Waits until the value is `"cat"`

So now Playwright waits until:

-   UI is rendered\
-   data is loaded\
-   value is stable

Only then does the test continue.

This removes the race condition.

📖 Docs:\
https://playwright.dev/docs/test-assertions\
https://playwright.dev/docs/locators#auto-waiting

------------------------------------------------------------------------

## 🔁 Timeline Comparison

### ❌ Flaky Test

    Click Edit
    Fill textbox immediately  ← too early
    App loads "cat" later     ← overwrites "rabbit"
    FAIL

### ✅ Stable Test

    Click Edit
    WAIT until value is "cat"
    Fill textbox with "rabbit"
    Submit
    PASS

------------------------------------------------------------------------

## 🧪 When You SHOULD Do This

You should add waits like this when:

-   Data is loaded asynchronously
-   UI updates after API calls
-   You edit pre-filled forms
-   You click Edit / View / Details
-   You see random failures
-   You test SPAs (React, Angular, Vue)

------------------------------------------------------------------------

## ⚠️ When You Should NOT Do This

❌ Avoid blind waits:

``` ts
await page.waitForTimeout(2000); // BAD
```

They are:

-   slow\
-   unreliable\
-   guesswork

Instead, always wait for **meaningful state**.

------------------------------------------------------------------------

## 🧩 More Good Examples

### Wait for text to load

``` ts
await expect(page.getByTestId("username")).toHaveText("john");
```

### Wait for API-loaded table

``` ts
await expect(page.getByRole("row", { name: "Order 123" })).toBeVisible();
```

### Wait for button enabled

``` ts
await expect(page.getByRole("button", { name: "Save" })).toBeEnabled();
```

### Wait for navigation result

``` ts
await expect(page).toHaveURL(/dashboard/);
```

📖 Docs:\
https://playwright.dev/docs/test-assertions#auto-retrying-assertions\
https://playwright.dev/docs/writing-tests#waiting

------------------------------------------------------------------------

## 🧠 Key Concept

**Assertions are also waits in Playwright.**

``` ts
await expect(locator).toHaveValue("cat");
```

Means:

> "Retry until this is true (or timeout)"

This is why the second test is stable.

------------------------------------------------------------------------

## 🧩 Why the Value "cat"?

Because it is the **known initial state** of the field.

You are synchronizing with:

> "The backend data has loaded"

It is a checkpoint ⛳

------------------------------------------------------------------------

## 🏁 Best Practice Pattern for Editable Forms

``` ts
const textbox = page.getByRole("textbox");

await expect(textbox).toHaveValue("cat"); // wait for data
await textbox.fill("rabbit");
await page.getByRole("button", { name: "Update" }).click();
await expect(textbox).toHaveValue("rabbit");
```

------------------------------------------------------------------------

## 🔗 Official Playwright References

-   Auto-waiting\
    https://playwright.dev/docs/actionability

-   Assertions\
    https://playwright.dev/docs/test-assertions

-   Waiting\
    https://playwright.dev/docs/writing-tests#waiting

-   Locators\
    https://playwright.dev/docs/locators

------------------------------------------------------------------------

## 💡 Mental Model

Your test should:

> Wait for **business state**, not DOM existence

Not: - ❌ "textbox exists"

But: - ✅ "textbox has the correct data"
