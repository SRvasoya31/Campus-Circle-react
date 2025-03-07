import React, { useState } from "react";
import "./BookingForm.css";


const BookingForm = ({ pgId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://your-backend.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pgId }),
      });

      if (response.ok) {
        alert("Booking Successful!");
      } else {
        alert("Booking Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
      <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
