---
title: "Building a Tiny Transformer From Scratch"
description: "A practical walkthrough of building a tiny transformer in TypeScript and understanding each core block."
pubDate: 2026-04-26
pubDatetime: 2026-04-26T13:00:00.000Z
draft: false
tags: ["machine learning", "transformers", "attention", "typescript", "nlp"]
---

Most explanations of transformers quickly jump into complex diagrams and equations. You see terms like attention, embeddings, Q, K, V - and it all feels abstract.

So instead of only explaining it theoretically, we built one.

A tiny transformer. From scratch. In TypeScript.

This post walks through what we built and, more importantly, what each part is trying to do.

---

## The Goal

We want a system that can do this:

```text
"React uses" -> predict -> "state"
```

That is it.

Everything in a transformer exists just to make this prediction better.

---

## Step 1: Text -> Numbers

Computers do not understand text directly, so we convert words into numbers.

```text
React -> [r1, r2, r3]
uses  -> [u1, u2, u3]
```

This is called an embedding.

In our code:

```ts
const embedding = new Embedding(vocabSize, 3);
const vectors = embedding.forward(ids);
```

Shape:

```text
2 tokens -> 2 x 3 matrix
```

Each row represents one word.

---

## Step 2: Attention (Words Look at Each Other)

Words do not exist in isolation.

The word "uses" can mean different things depending on context, so we let words look at each other.

For example in:

```text
React uses
```

- "uses" looks at "React"
- "React" looks at "uses"

This is the core intuition behind attention.

---

## Step 3: Q, K, V (Three Views of the Same Word)

Each word vector is transformed into three versions:

- Q = what I am looking for
- K = what I offer
- V = what I give

In code:

```ts
const Q = matMul(input, Wq);
const K = matMul(input, Wk);
const V = matMul(input, Wv);
```

All three come from the same input, but each uses a different learned weight matrix.

---

## Step 4: Compare Words

We compare words using:

```text
scores = Q x K^T
```

This gives pairwise relevance scores like:

- React vs React
- React vs uses
- uses vs React
- uses vs uses

Each value tells how relevant one word is to another.

---

## Step 5: Turn Scores into Importance

Raw scores are hard to interpret, so we normalize them with softmax.

```text
[2, 1] -> [0.7, 0.3]
```

Now each row becomes attention weights, which act like importance percentages.

---

## Step 6: Mix Information

We combine information with:

```text
output = weights x V
```

So each word becomes:

```text
original meaning + context from other words
```

That is how the representation becomes context-aware.

---

## Step 7: Feedforward (Thinking Step)

After words communicate, each token goes through a small neural network:

```text
vector -> expand -> filter -> shrink
```

In code:

```ts
const hidden = relu(matMul(input, W1));
const output = matMul(hidden, W2);
```

This helps the model learn richer patterns, not just blend tokens.

---

## Step 8: Residual Connections

Instead of replacing data at each stage, we add the new signal to the original:

```text
output = input + attention_output
output = output + feedforward_output
```

This preserves base meaning and improves training stability.

---

## Step 9: Output Layer (Numbers -> Words Again)

Finally, we map vectors back to vocabulary scores:

```text
vector -> logits -> probabilities
```

Example:

```text
react -> 0.1
uses  -> 0.2
state -> 0.7
```

The model predicts "state".

---

## Step 10: Training (Learning)

We measure error with negative log likelihood:

```text
loss = -log(probability of correct word)
```

Then update parameters (simplified example):

```ts
Wout[i][j] -= lr * error * lastVector[i];
```

- Correct word weights tend to go up.
- Wrong word weights tend to go down.

Over many examples, prediction quality improves.

---

## What We Actually Built

We built:

```text
tokenizer -> embedding -> attention -> feedforward -> output -> training
```

That is the core transformer loop.

---

## What Is Missing

A tiny educational transformer skips many production features:

- training embeddings end-to-end at scale
- fully trained attention weights on large corpora
- multiple stacked transformer layers
- large datasets and long training runs
- regularization, normalization, and optimization tricks

---

## The Insight

A transformer is not magic.

It is a sequence of understandable operations:

```text
words -> numbers -> compare -> mix -> refine -> predict
```

---

## One Line Summary

A transformer lets words look at other words, update their meaning using context, and use that to predict the next word.
