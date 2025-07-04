---
title: "Running Vite Preview and Using Bun for Background Processes"
description: "Answers to common questions about running vite preview and using bun for background processes"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T00:00:00.000Z
author: "Sreevisakh"
draft: false
---

## Running Vite Preview and Using Bun for Background Processes

### Question: How to start and background vite preview and exit 0

Use `nohup` or a process manager:

```bash
nohup bunx vite preview &
```

To ensure it exits cleanly:

```bash
bunx vite preview & sleep 1 && exit 0
```

**Tips:**

- Redirect logs to a file if needed.

### Question: How to do this with bun spawn

Using Bun’s `spawn`:

```ts
const { spawn } = require("bun");
spawn(["vite", "preview"], {
  stdout: "inherit",
  stderr: "inherit",
  detached: true,
});
```

**Tips:**

- Use `detached: true` and `stdio: "ignore"` to fully background.
