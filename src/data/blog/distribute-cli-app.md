---
title: "Distribute a TypeScript CLI App"
description: "Step-by-step guide to building, testing, and publishing a TypeScript-based CLI tool via npm and standalone executables."
pubDate: 2025-06-23
pubDatetime: 2025-06-23T16:31:58.164762
draft: false
---

## Instructions to Distribute a TypeScript CLI App

### 1. Setup Your Project

```bash
mkdir mdtohtml-cli
cd mdtohtml-cli
npm init -y
```

Install dependencies:

```bash
npm install typescript ts-node @types/node yargs marked
```

Create `tsconfig.json`:

```bash
npx tsc --init
```

---

### 2. Build the CLI Logic

Create `src/mdtohtml.ts` and add your CLI logic (Markdown to HTML conversion).

Add a shebang to the top:

```ts
#!/usr/bin/env node
```

---

### 3. Configure for Distribution

Update `package.json`:

```json
"bin": {
  "mdtohtml": "dist/mdtohtml.js"
},
"scripts": {
  "build": "tsc",
  "prepare": "npm run build"
}
```

Create a `.npmignore` file:

```
src/
tsconfig.json
.gitignore
.npmignore
node_modules/
```

---

### 4. Build and Test Locally

Compile your code:

```bash
npm run build
```

Link for testing:

```bash
npm link
mdtohtml --source input.md --output output.html
npm unlink
```

---

### 5. Publish to npm

Login and publish:

```bash
npm login
npm publish
```

To update: increment version and re-publish.

---

### 6. Optional: Create Standalone Executable

Install `pkg`:

```bash
npm install -g pkg
```

Build executable:

```bash
pkg .
```

Distribute the generated binaries for macOS, Windows, or Linux.
