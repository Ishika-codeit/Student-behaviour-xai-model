# 🎓 Learner Success Predictor using Explainable AI (XAI)

An AI-powered web application that predicts whether a learner is likely to complete a course successfully and achieve certification based on their engagement and activity data. The project combines Machine Learning with Explainable AI (XAI) techniques to provide transparent and interpretable predictions.

## 🚀 Live Demo

🔗 Frontend: https://student-behaviour-xai-model.vercel.app

🔗 Backend API: https://student-behaviour-xai-model.onrender.com

---

## 📌 Project Overview

Online learning platforms generate a large amount of learner activity data. This project analyzes learner behavior and predicts certification outcomes using Machine Learning models.

The system not only predicts whether a learner will be **Certified** or **Not Certified** but also provides explainability using SHAP (SHapley Additive Explanations), helping users understand the factors influencing the prediction.

---

## 🎯 Objectives

- Collect and analyze learner activity data from digital education platforms.
- Develop a Machine Learning model for learner success prediction.
- Integrate Explainable AI (XAI) techniques for transparent predictions.
- Compare and evaluate ML models for improved performance.

---

## 🧠 Features

- Predicts learner certification outcomes.
- Interactive React-based user interface.
- XGBoost Machine Learning model.
- SHAP-based explainability.
- Real-time prediction through Flask API.
- Fully deployed frontend and backend.

---

## 📊 Input Parameters

The prediction model uses learner engagement metrics such as:

- Activity Days
- Videos Played
- Chapters Accessed
- Forum Posts
- Year of Birth
- Additional learner interaction features

---

## 🏗️ System Architecture

```text
User Input
     ↓
React Frontend (Vercel)
     ↓
Flask API (Render)
     ↓
XGBoost Model
     ↓
Prediction + SHAP Explanation
     ↓
Frontend Visualization
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- Flask
- Flask-CORS

### Machine Learning
- XGBoost
- Scikit-learn
- Pandas
- NumPy

### Explainable AI
- SHAP

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📈 Model Performance

| Metric | Value |
|----------|----------|
| Accuracy | 76% |
| Algorithm | XGBoost |
| Explainability | SHAP |

---

## 📂 Project Structure

```text
student-behaviour-xai-model/
│
├── Backend/
│   ├── app.py
│   ├── train_model.py
│   ├── shap_analysis.py
│   ├── model/
│   │   └── model.pkl
│   └── requirements.txt
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── dataset/
│   └── harvard_mit.csv
│
└── README.md
```

---

## ⚙️ Installation

### Backend

```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔍 Explainable AI (XAI)

This project uses SHAP (SHapley Additive Explanations) to interpret predictions made by the XGBoost model.

Benefits:

- Improves transparency
- Enhances trust in AI predictions
- Identifies important learner success factors
- Supports educational decision-making

---

## 📸 Screenshots

Add project screenshots here.

---

## 👩‍💻 Author

**Ishika**

GitHub: https://github.com/Ishika-codeit

---

## 📜 License

This project is developed for educational and research purposes.
