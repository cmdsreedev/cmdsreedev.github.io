---
title: "Useful Tools and CSS Practices in React"
description: "Answers to common questions about useful tools and css practices in react"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T00:00:00.000Z
author: "Sreevisakh"
draft: false
---

## Useful Tools and CSS Practices in React

### Question: Setup storybook in react

Install Storybook:

```bash
npx storybook init
```

Start with:

```bash
npm run storybook
```

**Tips:**

- Use `*.stories.tsx` format.

### Question: Is there vscode extension that help edit both html tags

Use **Auto Rename Tag** extension for VSCode.

**Tips:**

- Works well with HTML and JSX.

### Question: Best way to incorporate css within component that works with pico

Pico.css is classless, so use semantic tags.

```tsx
<section>
  <h1>Welcome</h1>
</section>
```

**Tips:**

- Override with scoped styles if needed.

### Question: How to use pico color

Use CSS variables:

```css
color: var(--primary);
```

**Tips:**

- Reference Pico’s theming guide.
