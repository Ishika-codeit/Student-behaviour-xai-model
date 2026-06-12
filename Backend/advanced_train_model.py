import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer

from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score

# Load Dataset
df = pd.read_csv("../dataset/harvard_mit.csv")

# -----------------------------
# Encode categorical columns
# -----------------------------

categorical_cols = [
    "final_cc_cname_DI",
    "LoE_DI",
    "gender",
    "roles"
]

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))

# -----------------------------
# Features & Target
# -----------------------------

X = df.drop([
    "certified",
    "userid_DI",
    "course_id",
    "start_time_DI",
    "last_event_DI",
    "grade"
], axis=1)

y = df["certified"]

# -----------------------------
# Numeric Features
# -----------------------------

numeric_features = X.columns.tolist()

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="mean")),
    ("scaler", StandardScaler())
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features)
    ]
)

# -----------------------------
# XGBoost Model
# -----------------------------

model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    random_state=42,
    eval_metric="logloss"
)

# -----------------------------
# Pipeline
# -----------------------------

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("model", model)
])

# -----------------------------
# Train/Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -----------------------------
# Train
# -----------------------------

pipeline.fit(X_train, y_train)

# -----------------------------
# Predict
# -----------------------------

y_pred = pipeline.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# -----------------------------
# Save Model
# -----------------------------

joblib.dump(pipeline, "model/model.pkl")

print("Harvard/MIT Learner Success Model Saved Successfully")