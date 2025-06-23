---
title: "Run AWS Lambda Locally with Docker"
description: "Step-by-step instructions to build and run your Lambda function locally using Docker"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T00:00:00.000Z
author: "Sreevisakh"
draft: false
---

# Run AWS Lambda Locally with Docker

This guide walks you through running an AWS Lambda function written in Node.js using Docker, simulating AWS's environment.

## Step 1: Create a Dockerfile

```Dockerfile
FROM amazon/aws-lambda-nodejs:14

COPY . ${LAMBDA_TASK_ROOT}
RUN npm install

CMD ["index.handler"]
```

> Replace `index.handler` with your actual handler filename and function.

## Step 2: Build the Docker Image

```bash
docker build -t my-lambda-function .
```

## Step 3: Run the Lambda Function

```bash
docker run -p 9000:8080 my-lambda-function
```

You can test the Lambda with a curl request:

```bash
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"key": "value"}'
```

## Step 4: Simulate Memory and Storage Limits

```bash
docker run -p 9000:8080 --memory 512m --tmpfs /tmp:rw,size=512m my-lambda-function
```

## Option: Use Docker Compose

```yaml
version: "3.8"
services:
  lambda:
    image: my-lambda-function
    ports:
      - "9000:8080"
    deploy:
      resources:
        limits:
          memory: 512m
    tmpfs:
      - /tmp:size=512m
```

## Uploading Function Code

### Method 1: Copy During Build (recommended for production)

Ensure your Dockerfile contains:

```Dockerfile
COPY . ${LAMBDA_TASK_ROOT}
```

Then build the image:

```bash
docker build -t my-lambda-function .
```

### Method 2: Mount as Volume (recommended for development)

```bash
docker run -p 9000:8080 -v $(pwd):${LAMBDA_TASK_ROOT} my-lambda-function
```

> This mounts your local code so changes are reflected without rebuilding.
