from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os
from flask_cors import CORS
import markdown
# import google.generativeai as genai
import google.generativeai as google_genai


app = Flask(__name__)
CORS(app)
# Load the trained model
MODEL_PATH = "models/brain_model.h5"

model = load_model(MODEL_PATH)

# Allowed image extensions
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

# Check if file extension is valid
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Preprocess image
def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to model input shape
    image = np.array(image) / 255.0   # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
@app.route('/predict', methods=['POST'])
def brain():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    uploaded_file = request.files['file']
    
    if uploaded_file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Load and preprocess the image using PIL
        img = Image.open(uploaded_file).convert("RGB")
        img = img.resize((224, 224))  # Resize to model's expected input size
        img = np.array(img) / 255.0  # Normalize pixel values
        img = np.expand_dims(img, axis=0)  # Add batch dimension

        # Load the TensorFlow model
        model = tf.keras.models.load_model("models/brain_model.h5")

        # Make prediction
        predictions = model.predict(img)
        confidence = float(np.max(predictions) * 100)
        predicted_class = int(np.argmax(predictions))

        # Classification logic
        pred = 0
        if confidence >= 60:
            pred==1
        else:
            pred==0
        

        return jsonify({
            "prediction": predicted_class,
            "confidence": confidence
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Load the trained diabetes model (Update path as needed)
DIABETES_MODEL_PATH = "models/diabetes.h5"  # Or use .pkl for ML models
diabetes_model = load_model(DIABETES_MODEL_PATH)

# Define feature order (must match training)
FEATURES = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin",
            "BMI", "DiabetesPedigreeFunction", "Age"]

@app.route("/predict-diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json  # Get JSON data
        if not all(feature in data for feature in FEATURES):
            return jsonify({"error": "Missing input features"}), 400

        # Convert inputs to numpy array (ensure correct order)
        input_data = np.array([float(data[feature]) for feature in FEATURES]).reshape(1, -1)

        # Make prediction
        prediction = diabetes_model.predict(input_data)
        predicted_class = int(prediction[0] > 0.5)  # 0 = No Diabetes, 1 = Diabetes
        confidence = float(prediction[0]) * 100  # Convert to percentage

        return jsonify({"predicted_class": predicted_class, "confidence": confidence})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
MODEL_PATH = "models/Heart_attack.h5"
model = load_model(MODEL_PATH)

@app.route('/predict-heart', methods=['POST'])
def predict_heart():
    try:
        data = request.get_json()  # Get JSON data from React
        print("Received Data:", data)  # Debugging line

        # Validate required fields
        required_fields = ["age", "cholesterol", "bloodPressure", "heartRate", "glucoseLevel"]
        for field in required_fields:
            if field not in data or data[field] == "":
                return jsonify({"error": f"Missing or empty field: {field}"}), 400
        
        # Dummy prediction logic (Replace with your ML model)
        prediction = "Heart Disease" if int(data["cholesterol"]) > 200 else "Healthy"
        confidence = round(85.67 if prediction == "Heart Disease" else 72.34, 2)

        return jsonify({
            "predicted_class": prediction,
            "confidence": confidence
        })

    except Exception as e:
        print("Error:", str(e))  # Print error in terminal
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
system_prompts = """You are Nimbus, a domain expert in medical analysis. You are tasked with examining user queries regarding health. 
Your expertise will help in identifying or discovering any anomalies, diseases, conditions or any health issues that might be present from the provided description or symptoms.

Your key responsibilities:
1. Detailed Analysis : Provide a detailed response, ask for additional information if needed.
2. Analysis Report : Document all the findings and clearly articulate them in a structured format.
3. Recommendations : Basis the analysis, suggest remedies, tests or treatments as applicable. 
4. Treatments : If applicable, lay out detailed treatments which can help in faster recovery. Also provide a diet plan based on the condition.

Important Notes to remember:
1. Scope of response : Only respond if the query pertains to human health issues, or medical related. If it is not medical related just tell the user to only pass medical related images and or queries.
2. Clarity of query : In case the query is unclear ask for additional information
3. Disclaimer : Accompany your analysis with the disclaimer: "Consult with a Doctor before making any decisions."
4. Your insights are invaluable in guiding clinical decisions. Please proceed with the analysis, adhering to the structured approach outlined above.

Please provide the final response with these 5 headings: 
Detailed Analysis, Analysis Report, Recommendations, Treatments, and Diet Plan."""

@app.route('/vision_assist', methods=['POST'])
def vision_assist():
    try:
        text = request.form.get("text", "")
        uploaded_file = request.files.get("image")

        if not uploaded_file:
            return jsonify({"error": "No image uploaded."}), 400

        # Read and copy image content
        image_data = uploaded_file.read()
        img = Image.open(io.BytesIO(image_data))

        # Generate AI response
        model = google_genai.GenerativeModel(model_name="gemini-1.5-flash")
        google_genai.configure(api_key='AIzaSyD0FHc4z5c8HqDpfDvDUcRi4MNLOyoy-_E')  # Replace with actual key
        generation_config = {
                    "temperature": 1,
                    "top_p": 0.95,
                    "top_k": 0,
                    "max_output_tokens": 8192,
                    }
        response = model.generate_content([text, img])

        chatbot_response = response.text if response.text else "Model could not generate a response."

        return jsonify({"response": chatbot_response}), 200

    except Exception as e:
        return jsonify({"error": "Model generation failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
