import React, { useState } from "react";
import "./medicines.css"; // Import external styles

const MedicineRecommendation = () => {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const medicines = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Metformin", "Aspirin"];

  const handleChange = (e) => {
    setSelectedMedicine(e.target.value);
    setError(""); // Clear error when selection changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMedicine) {
      setError("Please select a medicine.");
      return;
    }

    // Simulated recommendation logic
    const recommendedList = medicines.filter((med) => med !== selectedMedicine);
    setRecommendations(recommendedList);
  };

  return (
    <div className="medicine-container">
      <h2 className="medicine-title">Select Your Medicine</h2>
      <p className="medicine-description">Choose a medicine and get similar recommendations.</p>

      <form onSubmit={handleSubmit} className="medicine-form">
        <label htmlFor="medicine_name">Type your medicine name:</label>
        <select
          id="medicine_name"
          name="medicine_name"
          value={selectedMedicine}
          onChange={handleChange}
          required
          className="medicine-select"
        >
          <option value="">Select a Medicine</option>
          {medicines.map((medicine, index) => (
            <option key={index} value={medicine}>
              {medicine}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-button">
          Recommend Medicine
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {recommendations.length > 0 && (
        <div className="recommendations-container">
          <h3>Recommended Medicines:</h3>
          <ul className="recommendations-list">
            {recommendations.map((medicine, index) => (
              <li key={index} className="recommendation-item">
                {medicine}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicineRecommendation;
