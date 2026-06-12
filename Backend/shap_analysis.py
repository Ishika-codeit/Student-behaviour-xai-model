import shap
import joblib
import pandas as pd
import matplotlib.pyplot as plt

# Load model
model = joblib.load("model/model.pkl")

# Load dataset
df = pd.read_csv("../dataset/student_performance.csv")

# Features
X = df.drop("FinalGrade", axis=1)

# Take only 50 samples for faster execution
X_sample = X.sample(50, random_state=42)

# Create explainer
explainer = shap.TreeExplainer(model)

# Generate SHAP values
shap_values = explainer.shap_values(X_sample)

# Plot
shap.summary_plot(shap_values[:, :, 0], X_sample)

plt.show()