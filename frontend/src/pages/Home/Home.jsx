import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const slides = [
    {
      image:
        "https://repository-images.githubusercontent.com/479050777/1eda7f71-3461-45af-bf86-d69b5dfcf520",
      title: "Brain Diagnosis",
      text: "AI-driven tools for early brain disease detection."
    },
    {
      image:
        "https://canterbury.ai/wp-content/uploads/2023/02/Advancing-Medical-Research-1024x576.jpg",
      title: "Diabetes Care",
      text: "Accurate AI-based diabetes prediction and monitoring."
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.73KyJjrmOxqA84ZdW2cEAAHaER?rs=1&pid=ImgDetMain",
      title: "Vision Assist",
      text: "Smart AI-powered assistance for vision health."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="app-container">
      {/* Hero Slider */}
      <section id="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Our Mission Section */}
      <section id="our-mission">
        <div className="mission-image">
          <img
            src="https://img.freepik.com/premium-photo/artificial-intelligence-humanoid-robot-portraits-looking-camera-surround-with-ai-computer-circuit-business-icons-blue-background-information-automation-service-smart-technology-concept_36367-8371.jpg"
            alt="AI Diagnosis"
          />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            <em>Because each and every life matters!</em>
          </p>
          <ul>
            <li>✔ AI-driven early diagnosis for critical brain diseases.</li>
            <li>✔ Smart algorithms that improve healthcare accessibility.</li>
            <li>✔ Machine learning models for personalized treatment plans.</li>
            <li>✔ AI-powered analysis to detect diabetes and neurological disorders.</li>
            <li>✔ Vision enhancement using advanced AI recognition systems.</li>
            <li>✔ Revolutionizing medical diagnostics through deep learning.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
