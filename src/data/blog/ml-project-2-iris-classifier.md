---
title: "Machine Learning Project 2: Iris Flower Classifier"
description: Learn classification in machine learning by building an iris flower species classifier using Python and Scikit-learn.
pubDate: 2025-06-23
pubDatetime: 2025-06-23T22:00:00.000Z
draft: false
tags:
  ["machine learning", "classification", "scikit-learn", "python", "beginner"]
---

# Machine Learning Project 2: Iris Flower Classifier

This project teaches you how to perform classification using a classic dataset — the Iris flower dataset. You'll use Python and Scikit-learn to build a model that predicts the species of an iris flower based on its petal and sepal measurements.

---

## Prerequisites

Make sure you have the necessary libraries:

```bash
pip install pandas scikit-learn matplotlib seaborn jupyter
```

---

## Step 1: Load and Explore the Dataset

The Iris dataset is a classic dataset often used in machine learning for classification tasks. It contains 150 samples of iris flowers, divided equally among three species:

- **Setosa**
- **Versicolor**
- **Virginica**

Each sample includes four numerical features:

- Sepal length (cm)
- Sepal width (cm)
- Petal length (cm)
- Petal width (cm)

The goal is to predict the species based on these measurements.

```python
import pandas as pd
from sklearn.datasets import load_iris

# Load dataset
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)  # Converts numerical labels (0, 1, 2) to category names (setosa, versicolor, virginica)

df.head()
```

**Explanation:** We load the Iris dataset which contains 150 rows of flower measurements. The features include sepal and petal length and width, and the target is the species. We create a Pandas DataFrame to easily explore and manipulate the data.

---

## Step 2: Visualize the Data

We use Seaborn, a data visualization library built on top of Matplotlib, to create attractive and informative statistical graphics. It's especially useful for exploring datasets with many variables and categories.

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.pairplot(df, hue='species')
plt.show()
```

**Explanation:** Pair plots show the relationships between all feature pairs, and color them by species. This helps visualize how the different species cluster based on measurements.

---

## Step 3: Train a Classification Model

A Random Forest is an ensemble machine learning method that builds multiple decision trees and merges their results to improve accuracy and prevent overfitting. It is widely used for both classification and regression problems due to its simplicity and high performance.

In this step, we'll prepare the data for training, split it into training and testing sets, and then use the Random Forest algorithm to build our classification model.

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Step 1: Prepare features (X) and target labels (y)
X = df.drop('species', axis=1)  # Drop the target column to get the input features
y = df['species']  # Target output we want the model to predict

# Step 2: Split the dataset into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # random_state ensures reproducible splits

# Step 3: Create a Random Forest classifier
model = RandomForestClassifier()

# Step 4: Train the classifier on the training data
model.fit(X_train, y_train)
```

**Explanation:** We first separate the features (X) and target labels (y). Then we split the dataset into training and testing sets, which allows us to evaluate how well our model performs on new, unseen data. The `random_state` parameter ensures that the data is split the same way every time the code runs, which is helpful for debugging and consistent results. The Random Forest classifier we use is a robust and powerful model that builds many decision trees and combines their outputs to make more accurate predictions and reduce the risk of overfitting.

---

## Step 4: Make Predictions

```python
predictions = model.predict(X_test)

# Compare predictions
for i in range(len(predictions)):
    print(f"Predicted: {predictions[i]}, Actual: {y_test.values[i]}")
```

**Explanation:** After training, we use the model to predict species on the test set and print the results alongside the actual species.

---

## Step 5: Evaluate the Model

```python
from sklearn.metrics import accuracy_score, classification_report

print("Accuracy:", accuracy_score(y_test, predictions))
print("\nClassification Report:\n", classification_report(y_test, predictions))
```

**Explanation:** We use standard metrics to evaluate classification performance:

- **Accuracy**: Overall correctness
- **Precision**: How many of the predicted positive results are actually positive
- **Recall**: How many of the actual positive results were correctly predicted
- **F1-score**: The harmonic mean of precision and recall, useful for measuring the balance between them, especially when dealing with imbalanced classes

---

## Summary

- You built a classification model using Scikit-learn
- You learned to load and explore the Iris dataset
- You trained a Random Forest classifier
- You evaluated the model using accuracy and a classification report

This is a foundational project for understanding classification problems. Up next: try using a real-world classification dataset or begin exploring image classification with neural networks.
