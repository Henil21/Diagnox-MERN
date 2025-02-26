import React, { useState } from "react";
import "./vision.css";

const VisionAssist = () => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("text", query);
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/vision_assist", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response || "No response received.");
      } else {
        console.error("Error from API:", data);
        setResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Request failed", error);
      setResponse("An error occurred while connecting to the server.");
    }
  };

  return (
    <div className="vision-container">
      <h2 className="vision-title">Drop your medical report with a query</h2>

      <div className="upload-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="text">Enter your query:</label>
            <input
              type="text"
              id="text"
              name="text"
              required
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload an image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-button">
            Submit <i className="fa fa-paper-plane"></i>
          </button>
        </form>

        {response && (
          <div className="response-container">
            <h2>Response from Model:</h2>
            <p className="response">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionAssist;
