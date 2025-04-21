import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("access_key", "f27e78d4-2adc-44d0-b82a-5426f2696fa0"); // Replace with your Web3Forms access key
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("contact", form.contact);
    formData.append("subject", form.subject);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Message sent successfully!");
        setForm({ name: "", email: "", contact: "", subject: "", message: "" });
      } else {
        setSuccessMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>CONTACT US</h2>
      <p className="welcome">WELCOME TO CAMPUS CIRCLE</p>
      <p>We’re always eager to hear from you!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="text" name="contact" placeholder="Contact no." value={form.contact} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        </div>
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ContactForm;
