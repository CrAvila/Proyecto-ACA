from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained model and column names
with open('random_forest_model.pkl', 'rb') as model_file:
    model = joblib.load(model_file)

model_columns = joblib.load('model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    latitude = data['latitude']
    longitude = data['longitude']
    depth = data['depth']
    features = pd.DataFrame([[latitude, longitude, depth]], columns=model_columns)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
