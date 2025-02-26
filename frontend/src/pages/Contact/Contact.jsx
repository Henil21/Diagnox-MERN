import React, { useState } from "react";
import "./contact.css"; // Importing external styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Get in <span>Touch</span></h2>
      <p className="contact-description">
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form
        className="contact-form"
        method="post"
        action="https://formspree.io/f/xoqzzqen"
      >
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            required
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="phone"
            placeholder="Your Phone *"
            required
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="company"
            placeholder="Company Name (Optional)"
            className="form-input"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            required
            className="form-input"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message *"
            rows="5"
            required
            className="form-input message-box"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

    </div>
  );
};

export default Contact;
