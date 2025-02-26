import { useState } from "react";
import axios from "axios";
import "./brain.css"; // Import CSS file

const Brain = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPrediction(null); // Reset prediction when a new file is selected
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response received:", response.data); // Debugging log

      setPrediction(response.data);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Prediction failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Brain Model Prediction</h2>

      {/* File Upload Section */}
      <div className="file-upload">
        <h3>Upload an Image</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {file && <p>Selected File: {file.name}</p>}
      </div>

      <button className="predict-btn" onClick={handlePredict}>
        Predict
      </button>

      {/* Display Prediction */}
      {prediction !== null && (
        <div className="result">

<h3>
  Prediction: {prediction.confidence >= 65 ? "Positive" : "Negative"}
</h3>
<h4>
  Confidence: {prediction.confidence ? prediction.confidence.toFixed(2) : "N/A"}%
</h4>
        </div>
      )}
    </div>
  );
};

export default Brain;
