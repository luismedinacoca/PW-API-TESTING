# JavaScript `URL` and `searchParams`

In the code you showed, you are working with a JavaScript object called **`URL`**, which is a native class in the browser (and also in Node.js since version 10+).

```js
url.searchParams.append("tag", "dragons");
// → adds   ?tag=dragons

url.searchParams.append("author", "jake");
// → adds   &author=jake

url.searchParams.append("limit", 10);
// → adds   &limit=10
```

## What is `url` in this context?

`url` is an instance of the `URL` class.

It is normally created like this:

```js
const url = new URL("https://example.com/api/articles");
```

Or, in your case (looking at the previous code):

```js
const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);
```

### Realistic example

```js
const url = new URL("https://conduit-api.bondaracademy.com/api/articles");
```

---

## Main useful properties and methods of `URL`

| Part of the URL | Property | Example value |
|-----------------|----------|---------------|
| Full string | `toString()` | `"https://.../articles?tag=dragons&limit=5"` |
| Protocol | `.protocol` | `"https:"` |
| Full domain | `.host` | `"conduit-api.bondaracademy.com"` |
| Hostname only | `.hostname` | `"conduit-api.bondaracademy.com"` |
| Port (if present) | `.port` | `""` or `"3000"` |
| Path | `.pathname` | `"/api/articles"` |
| Full query string | `.search` | `"?tag=dragons&limit=5"` |
| Object to manipulate params | `.searchParams` | `(URLSearchParams object)` |
| Fragment (hash) | `.hash` | `"#section2"` |

---

## The most important part: `.searchParams`

`.searchParams` is **not a string** — it is an object of type `URLSearchParams`.

This object provides very convenient methods to read, add, modify, and delete query string parameters.

---

## Most commonly used `URLSearchParams` methods

| Method | What it does | Example | Result after |
|--------|-------------|---------|--------------|
| `.append(key, value)` | Adds a parameter (allows duplicates) | `append("tag", "js")` | `?tag=js` |
| `.set(key, value)` | Replaces or creates the value (only one value allowed) | `set("limit", "20")` | `?limit=20` |
| `.get(key)` | Returns the first value for that key | `get("tag")` | `"js"` |
| `.getAll(key)` | Returns an array with all values for that key | `getAll("tag")` | `["js", "ts"]` |
| `.has(key)` | Checks if the key exists | `has("sort")` | `false` |
| `.delete(key)` | Removes all values for that key | `delete("debug")` | removes `debug=1` |
| `.toString()` | Converts everything to a string (without the `?`) | `searchParams.toString()` | `"tag=js&limit=20"` |

---

## Complete and practical example

```js
const url = new URL("https://api.example.com/posts");

// Adding parameters
url.searchParams.append("category", "javascript");
url.searchParams.append("sort", "newest");
url.searchParams.append("page", "1");
url.searchParams.set("limit", "12"); // overwrites if it already existed

console.log(url.toString());
// https://api.example.com/posts?category=javascript&sort=newest&page=1&limit=12

// Reading values
console.log(url.searchParams.get("sort"));  // "newest"
console.log(url.searchParams.has("debug")); // false

// Adding multiple values for the same key (e.g. tags)
url.searchParams.append("tag", "frontend");
url.searchParams.append("tag", "react");

console.log(url.toString());
// ...?category=javascript&sort=newest&page=1&limit=12&tag=frontend&tag=react
```

---

## Quick summary

- `url.searchParams.append(key, value)`  
  → ideal when you want to add parameters (the one you're using in your code)

- `url.searchParams.set(key, value)`  
  → when you want to replace or ensure there is only one value

At the end you do:

```js
url.toString();
```

or simply pass it directly to:

```js
fetch(url);
```

and you're good to go.
