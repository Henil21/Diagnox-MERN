import React, { useState } from "react";
import "./Diabetes.css";

const Diabetes = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [prediction, setPrediction] = useState(null); // Store API response
  const [error, setError] = useState(null); // Handle errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict-diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction({
          class: result.predicted_class === 1 ? "Diabetic" : "Non-Diabetic",
          confidence: result.confidence.toFixed(2),
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="diabetes-container">
      {/* Banner Section */}
      <header className="banner">
        <h3>Living Well with Diabetes Starts Here</h3>
      </header>

      {/* Form Section */}
      <section className="form-section">
        <h2>
          Drop Your <span>Report Values</span> Here
        </h2>

        <form onSubmit={handleSubmit} className="diabetes-form">
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").trim()} *
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ))}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {/* Display Prediction Result */}
        {prediction && (
          <div className="result">
            <h3>Prediction Result:</h3>
            <p>
              <strong>Status:</strong> {prediction.class}
            </p>
            <p>
              <strong>Confidence:</strong> {prediction.confidence}%
            </p>
          </div>
        )}

        {/* Display Errors */}
        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
};

export default Diabetes;
