---
title: "Running and Testing GitHub Actions Locally and in CI"
description: "Answers to common questions about running and testing github actions locally and in ci"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T00:00:00.000Z
author: "Sreevisakh"
draft: false
---

## Running and Testing GitHub Actions Locally and in CI

### Question: Run github actions locally

You can run GitHub Actions locally using the `act` tool. This helps test workflows before pushing to GitHub.

**Steps:**

1. Install act:
   ```bash
   brew install act
   ```
2. Run your actions:
   ```bash
   act
   ```
3. Simulate different events:
   ```bash
   act push
   act pull_request
   ```

**Tips:**

- Docker is required.
- Use `--platform` if needed.

### Question: Set github actions with bun

Bun can be used as the runtime in your GitHub Actions workflow by configuring the action to use a setup step like:

```yaml
- uses: oven-sh/setup-bun@v1
  with:
    bun-version: "latest"
```

**Tips:**

- Replace `node` scripts with `bun` commands for compatibility.

### Question: Whats the best way to run e2e test of a webapp in github actions

Use a headless browser like Chrome and a test runner like Puppeteer or Playwright.

**Sample GitHub Action step:**

```yaml
- name: Run e2e tests
  run: bun test:e2e
```

**Tips:**

- Install dependencies before testing.
- Ensure the server is running or mocked.

### Question: Give me for puppeteer

To run Puppeteer tests:

1. Install Puppeteer:

   ```bash
   bun add puppeteer
   ```

2. Create a test:

   ```js
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto("http://localhost:3000");
   ```

3. Run in CI with `xvfb` or headless mode.

**Tips:**

- Set `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` to speed up CI builds.
