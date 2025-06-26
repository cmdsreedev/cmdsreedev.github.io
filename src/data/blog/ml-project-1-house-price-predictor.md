---
title: "Machine Learning Project 1: House Price Predictor"
draft: false
pubDate: 2025-06-23
pubDatetime: 2025-06-23T21:00:00.000Z
description: Learn the basics of machine learning by building a house price predictor using Python, Pandas, and Scikit-learn on Ubuntu.
---

This guide walks you through building your first machine learning project: predicting house prices using linear regression in Python. We'll cover setup on Ubuntu, code walkthrough, and detailed explanations.

---

## Ubuntu Setup

1. **Install Python, pip, and venv**

   ```bash
   sudo apt update
   sudo apt install python3 python3-pip python3-venv -y
   ```

2. **Create a project folder and virtual environment**

   ```bash
   mkdir house-price-predictor
   cd house-price-predictor
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install required Python packages**

   ```bash
   pip install pandas scikit-learn matplotlib jupyter
   ```

4. **Launch Jupyter Notebook**
   ```bash
   jupyter notebook
   ```

This will open a browser window where you can create a new notebook to write and run Python code interactively.

---

## Step 1: Prepare the Dataset

Create a notebook cell and add:

```python
import pandas as pd

# Sample housing dataset
data = {
    'Size (sqft)': [1500, 1600, 1700, 1800, 2000],
    'Bedrooms': [3, 3, 3, 4, 4],
    'Age (years)': [10, 5, 3, 20, 15],
    'Price': [300000, 340000, 360000, 400000, 410000]
}

df = pd.DataFrame(data)
df
```

**Explanation:**
We're using Pandas to create a DataFrame — a table-like data structure — from a Python dictionary. Each row represents one house, and each column represents a property (feature) of the house. This is your training data — the data that the machine learning model will learn from.

---

## Step 2: Train the Model

```python
from sklearn.linear_model import LinearRegression

X = df[['Size (sqft)', 'Bedrooms', 'Age (years)']]  # Features
y = df['Price']  # Target label

model = LinearRegression()
model.fit(X, y)
```

**Explanation:**
This is where machine learning starts. We separate the **features** (inputs) and the **target** (output we want to predict). In this case, features are size, number of bedrooms, and age. The target is the price.

The model learns a mathematical formula that best maps these inputs to the output. This process is called "training" the model.

---

## Step 3: Predict Price for a New House

```python
new_house = pd.DataFrame([[1900, 4, 10]], columns=['Size (sqft)', 'Bedrooms', 'Age (years)'])
predicted_price = model.predict(new_house)
print(f"Predicted price: ${predicted_price[0]:,.2f}")
```

**Explanation:**
Now that the model is trained, we can use it to predict the price of a new house. The input must be provided in the same format as the training data. The model uses its learned formula to estimate a price.

---

## Step 4: Visualize (Optional)

```python
import matplotlib.pyplot as plt

plt.scatter(df['Size (sqft)'], df['Price'], color='blue', label='Actual')
plt.xlabel('Size (sqft)')
plt.ylabel('Price')
plt.title('Size vs Price')
plt.legend()
plt.show()
```

**Explanation:**
Visualization helps you see how data is distributed and how well your model might perform. Here, we use a scatter plot to show the relationship between house size and price.

---

## Step 5: Evaluate the Model

```python
from sklearn.metrics import mean_squared_error, r2_score

y_pred = model.predict(X)
mse = mean_squared_error(y, y_pred)
r2 = r2_score(y, y_pred)

print(f"MSE: {mse:.2f}")
print(f"R² Score: {r2:.2f}")
```

**Explanation:**
Once you've trained and tested the model, it's important to evaluate how well it's doing:

- **MSE (Mean Squared Error):** Average of the squared differences between actual and predicted prices. Lower is better.
- **R² Score:** A value between 0 and 1 that indicates how well the model explains the data. Closer to 1 means better accuracy.

---

## Summary

- You created a basic machine learning model using linear regression.
- You learned how to prepare a dataset, train a model, make predictions, visualize the data, and evaluate the model’s performance.

This is the foundation of many machine learning workflows. Understanding this will make it easier to tackle more advanced topics. Next up: try using a real-world dataset or move to classification problems like the Iris Flower Classifier.
