# Breast Cancer Prediction Model

This repository contains the implementation and deployment details of a machine learning model designed to predict breast cancer as benign or malignant. The project includes data preprocessing, model evaluation, feature engineering, and integration into a web application for real-time predictions.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies and Tools Used](#technologies-and-tools-used)
4. [Data Workflow](#data-workflow)
5. [Model Evaluation](#model-evaluation)
6. [Deployment](#deployment)
7. [Future Work](#future-work)
8. [Acknowledgments](#acknowledgments)

---

## Project Overview

Breast cancer is one of the leading causes of mortality among women worldwide. Early detection can significantly improve treatment outcomes. This project develops a machine learning model using the Breast Cancer Wisconsin dataset to classify breast cancer cases as benign or malignant, providing healthcare professionals and individuals with a practical diagnostic tool.

The solution includes:
- Comparative analysis of multiple machine learning algorithms.
- Real-time predictions via a web interface.
- Integration with an E-Hospital platform for enhanced usability.

---

## Features

- **Machine Learning Algorithms**: Logistic Regression, Random Forest, Support Vector Machines, Decision Trees, and others.
- **Feature Selection**: Methods such as Correlation, Chi-square, Recursive Feature Elimination (RFE), and Random Forest.
- **Web Application**: User-friendly interface for inputting patient data and receiving predictions.
- **Cloud Deployment**: Hosted on Heroku for easy access.
- **Integration**: Compatible with the E-Hospital platform for seamless data management.

---

## Technologies and Tools Used

### Technologies
- **Python**: Core programming language for ML development.
- **Scikit-learn**: For implementing machine learning models and preprocessing.
- **Flask**: API development.
- **React.js**: Front-end web application.
- **Heroku**: Cloud deployment platform.

### Tools
- **Visual Studio Code**: Development environment.
- **Postman**: API testing.
- **Node.js**: Backend support for web application.
- **Data Visualization**: Seaborn and Matplotlib.

---

## Data Workflow

1. **Data Collection**: Publicly available Breast Cancer Wisconsin dataset.
2. **Preprocessing**:
   - Data cleaning (removal of duplicates and handling of outliers).
   - Feature scaling using MinMaxScaler and StandardScaler.
   - Feature selection with K-Best and other methods.
3. **Exploratory Data Analysis (EDA)**:
   - Heatmaps, histograms, violin plots, and box plots.
4. **Model Training**:
   - 70/30 train-test split.
   - Hyperparameter tuning using RandomizedSearchCV.
5. **Evaluation**:
   - Metrics: Accuracy, Precision, Recall, F1 Score, and AUC.
   - Logistic Regression achieved the highest accuracy of 97.2%.

---

## Model Evaluation

### Key Metrics
- **Accuracy**: 97.2%
- **AUC (Area Under Curve)**: 97.1%
- **Cross-validation**: 5-fold validation to ensure robustness.

### Selected Model
- **Logistic Regression**: Best performing model for its balance between accuracy and simplicity.

---

## Deployment

### Flask API
- Flask API was used to expose the ML model as a RESTful service.
- API endpoints were created for receiving input data and returning predictions.

### Cloud Hosting
- The Flask API was deployed on **Heroku**.
- Endpoints tested using Postman for functionality and reliability.

### Web Application
- A React.js-based front-end was developed for user interaction.
- The application allows users to input patient attributes and displays the prediction results.

### Integration
- Integrated with the E-Hospital platform for storing predictions alongside patient records.

---

## Future Work

1. **Feature Engineering**: Explore advanced techniques and incorporate additional patient data, such as genetic information.
2. **Algorithm Exploration**: Investigate deep learning and ensemble methods for potential performance improvement.
3. **Model Interpretability**: Implement SHAP values for understanding feature contributions.
4. **Real-time Data**: Enable integration with live patient data for instant predictions.
5. **User Interface**: Enhance the web interface for better user experience.
6. **Ethics**: Address privacy, bias, and fairness in predictions.

---

## Acknowledgments

This project was conducted under the guidance of Prof. Ali Hassan Abbas. Special thanks to the open-source contributors and the UCI Machine Learning Repository for providing the dataset.

---

Feel free to contribute or raise issues to improve the project!
