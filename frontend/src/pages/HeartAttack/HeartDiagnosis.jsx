import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import "./heart.css"; // Importing external styles

const HeartDiagnosis = () => {
  const [formData, setFormData] = useState({
    age: "",
    cholesterol: "",
    bloodPressure: "",
    heartRate: "",
    glucoseLevel: "",
  });

  const [prediction, setPrediction] = useState(null); // Store the API response
  const [loading, setLoading] = useState(false); // Show a loading state
  const [error, setError] = useState(null); // Handle errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict-heart", formData);
      setPrediction(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heart-container">
      <h2 className="heart-title">
        Living Well with <span>Heart Health</span> Starts Here
      </h2>
      <p className="heart-description">
        Enter your medical values below to assess your heart health.
      </p>

      <form onSubmit={handleSubmit} className="heart-form">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").trim()} *</label>
            <input
              type="number"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        ))}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Analyzing..." : "Show Prediction"}
        </button>
      </form>

      {/* Display Prediction Result */}
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p><strong>Status:</strong> {prediction.predicted_class}</p>
          <p><strong>Confidence:</strong> {prediction.confidence}%</p>
        </div>
      )}

      {/* Display Errors */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default HeartDiagnosis;
