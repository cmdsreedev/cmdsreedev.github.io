---
title: "Building a Simple RAG System From Scratch"
description: "Build a minimal Retrieval-Augmented Generation pipeline from scratch and understand each core step."
pubDate: 2026-04-26
pubDatetime: 2026-04-26T12:00:00.000Z
draft: false
tags: ["machine learning", "rag", "llm", "embeddings", "retrieval"]
---

When people talk about Retrieval-Augmented Generation (RAG), it can feel like a black box.

You hear terms like embeddings, vector databases, semantic search, reranking, and chunking, and a simple idea suddenly sounds intimidating.

But RAG is not magic. It is a practical pattern:

1. Turn your knowledge into a searchable form.
2. Find the most relevant pieces for a question.
3. Give those pieces to the model so it answers with context instead of guessing.

In this post, we will build a tiny RAG pipeline from scratch using plain TypeScript and no external libraries. The goal is not to build a production system. The goal is to make each step easy to understand.

By the end, you will have a working retrieval loop and a clear mental model for how modern RAG systems work.

---

## The idea behind RAG

Let’s say you ask:

> What does React use?

A typical model might try to answer from memory. Sometimes it is right, sometimes it is outdated, and sometimes it confidently invents details.

A RAG system does something different. Instead of guessing first, it retrieves relevant information first and then answers using that context.

So the flow becomes:

```text
question -> retrieve relevant context -> generate answer
```

That retrieval step is the heart of RAG, and it is what we are building.

Think of it like an open-book exam:

- without RAG: answer from memory only
- with RAG: quickly look up notes, then answer

---

## Step 1: Start with some knowledge

First, we need something to search:

```text
React uses hooks
Hooks manage state
State updates UI
React renders UI
```

For now, this tiny list is our entire knowledge base.

In a real app, this might be:

- product documentation
- company policies
- support articles
- engineering runbooks

---

## Step 2: Why text alone is not enough

If we compare:

```text
"What does React use?"
vs
"React uses hooks"
```

Strict keyword matching can fail even when two sentences mean almost the same thing.

For example, "What does React use?" and "React uses hooks" express the same idea, but they are not identical strings.

So we convert text into numbers that capture meaning. These numeric representations are called embeddings.

---

## Step 3: Convert text to vectors (embeddings)

Each sentence becomes a vector:

```text
"React uses hooks" -> [0.2, -0.5, 0.1]
"Hooks manage state" -> [0.4, 0.1, -0.2]
```

Key idea:

- similar meaning -> vectors point in similar directions
- different meaning -> vectors point in different directions

In this tutorial, we use a fake embedding function so we can focus on mechanics, not model quality:

```ts
function embed(text: string): number[] {
  return text.split("").map(c => c.charCodeAt(0) % 10);
}
```

Important note: unlike real embeddings, this is not semantically meaningful. It is only a stand-in so we can build the retrieval pipeline end to end.

---

## Step 4: Store vectors

```ts
const docs = [
  "React uses hooks",
  "Hooks manage state",
  "State updates UI",
  "React renders UI",
];

const embeddings = docs.map(embed);
```

Now each document has a numeric representation.

You can think of this as a simple in-memory vector store:

- original text for output
- vector for similarity search

---

## Step 5: Convert the query

```ts
const queryVector = embed("What does React use?");
```

Now the query and documents live in the same vector space, so we can compare them mathematically.

---

## Step 6: Compare using cosine similarity

Cosine similarity measures the angle between two vectors. Values are usually between $-1$ and $1$:

- $1$: same direction (very similar)
- $0$: unrelated direction
- $-1$: opposite direction

In retrieval, a higher score means "more similar."

```ts
function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
}
```

In production code, you should also guard against divide-by-zero when a vector has zero magnitude.

---

## Step 7: Retrieve the best match

```ts
function retrieve(query: string) {
  const queryVec = embed(query);

  let bestDoc = "";
  let bestScore = -Infinity;

  for (let i = 0; i < docs.length; i++) {
    const score = cosineSimilarity(queryVec, embeddings[i]);

    if (score > bestScore) {
      bestScore = score;
      bestDoc = docs[i];
    }
  }

  return bestDoc;
}
```

What this function does:

1. Embeds the query.
2. Scores the query against each document.
3. Keeps the highest-scoring document.
4. Returns that document as context.

Test:

```ts
console.log(retrieve("What does React use?"));
```

Output:

```text
React uses hooks
```

That is retrieval in action.

## Full minimal example (copy/paste)

Here is the full toy pipeline in one place:

```ts
const docs = [
  "React uses hooks",
  "Hooks manage state",
  "State updates UI",
  "React renders UI",
];

function embed(text: string): number[] {
  return text.split("").map(c => c.charCodeAt(0) % 10);
}

function cosineSimilarity(a: number[], b: number[]) {
  const minLen = Math.min(a.length, b.length);
  if (minLen === 0) return 0;

  const dot = a.slice(0, minLen).reduce((sum, val, i) => sum + val * b[i], 0);

  const magA = Math.sqrt(a.slice(0, minLen).reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.slice(0, minLen).reduce((sum, val) => sum + val * val, 0));

  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

const embeddings = docs.map(embed);

function retrieve(query: string) {
  const queryVec = embed(query);

  let bestDoc = "";
  let bestScore = -Infinity;

  for (let i = 0; i < docs.length; i++) {
    const score = cosineSimilarity(queryVec, embeddings[i]);
    if (score > bestScore) {
      bestScore = score;
      bestDoc = docs[i];
    }
  }

  return { bestDoc, bestScore };
}

const result = retrieve("What does React use?");
console.log(result);
```

Expected best match:

```text
React uses hooks
```

---

## Step 8: Use retrieved context

In a real RAG application, retrieval is only half the pipeline.

You then build a prompt that includes:

- the user question
- the retrieved context
- instructions for how to answer

For example:

```text
"What does React use? React uses hooks"
```

This enriched prompt is what you send to an LLM.

The model is now grounded in your data, which reduces hallucination and improves factual accuracy.

---

## What you built

```text
query
-> vector
-> compare
-> retrieve best match
```

That is the core of RAG.

---

## Why this works

Meaning becomes distance.

When embeddings are good, related concepts end up close together in vector space. Retrieval then becomes a nearest-neighbor problem.

In simple terms:

- similar ideas -> close vectors
- different ideas -> far vectors

---

## What is missing from this toy version

Real systems add:

- real embeddings (OpenAI, Ollama)
- vector DBs (FAISS, Pinecone)
- chunking
- top-k retrieval
- metadata filters
- reranking
- LLM generation

They also add practical engineering pieces:

- caching
- latency optimizations
- evaluation (retrieval precision, answer quality)
- guardrails and citation formatting

## Common beginner mistakes

If your RAG system feels weak, it is usually because of one of these issues:

1. Chunks are too large or too small.
2. You retrieve only one chunk when you need top-k.
3. Embeddings are poor for your domain.
4. Prompt does not force the model to use provided context.
5. There is no evaluation loop, so quality regressions go unnoticed.

Treat retrieval quality as a product feature, not a hidden implementation detail.

## Where to go next

After understanding this toy version, upgrade one piece at a time:

1. Replace fake embeddings with real embedding models.
2. Store vectors in a vector database.
3. Retrieve top-k chunks, not just one.
4. Build a prompt template that cites retrieved chunks.
5. Add an automated eval set with expected answers.

If you want a hands-on implementation, check out this repository:

[learn-rag on GitHub](https://github.com/cmdsreedev/learn-rag)

---

## Takeaway

RAG is conceptually simple:

```text
text -> vectors -> similarity -> retrieve
```

Everything else is scaling, quality control, and engineering discipline.

Once you understand this loop, every "advanced" RAG architecture is just an extension of the same core idea.
