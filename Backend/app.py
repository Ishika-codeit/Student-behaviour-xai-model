from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model/model.pkl")


@app.route("/")
def home():
    return "Learner Success Prediction API Running"


@app.route("/predict", methods=["POST"])
def predict():

    try:

        # Get JSON data
        data = request.json

        # Convert to dataframe
        input_data = pd.DataFrame([data])

        # Prediction
        prediction = int(model.predict(input_data)[0])

        # Labels
        labels = {
            0: "Not Certified",
            1: "Certified"
        }

        return jsonify({
            "prediction": prediction,
            "label": labels[prediction]
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)