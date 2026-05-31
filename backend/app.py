from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route("/")
def home():
    return "Breast Cancer Detection API is Running!"

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = np.array(data["features"]).reshape(1, -1)

    scaled_data = scaler.transform(features)

    prediction = model.predict(scaled_data)[0]
    confidence = model.predict_proba(scaled_data)[0]

    return jsonify({
        "prediction": "Benign" if prediction == 1 else "Malignant",
        "confidence": round(max(confidence) * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)