

import React, { useState } from "react";
import "./PGDetailForm.css";
import logo from "../assets/logo.png"; // Adjust path if needed

const PGDetailForm = () => {
  const [pgName, setPgName] = useState("Angel Girls PG");
  const [location, setLocation] = useState("203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad");
  const [rentPrice, setRentPrice] = useState("8000");
  const [deposit, setDeposit] = useState("1 Month");
  const [description, setDescription] = useState("Luxurious and affordable PG accommodation near prime locations.");
  const [roomType, setRoomType] = useState("2 Sharing non AC with food");
  const [amenities, setAmenities] = useState("Free WiFi, Car Parking, Washing Machine, Fridge, Electricity");
  const [email, setEmail] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMainImageUpload = (event) => setMainImages(event.target.files);

  const handleRoomImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length < 1 || files.length > 2) {
      alert("⚠️ Please upload 1 to 2 room photos!");
      return;
    }

    setRoomImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!pgName || !location || !rentPrice || !description || !email) {
      alert("⚠️ Please fill all the fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pgName", pgName);
    formData.append("location", location);
    formData.append("rentPrice", rentPrice);
    formData.append("deposit", deposit);
    formData.append("description", description);
    formData.append("amenities", amenities);
    formData.append("roomType", roomType);
    formData.append("email", email);

    for (let i = 0; i < mainImages.length; i++) {
      formData.append("images", mainImages[i]);
    }

    roomImages.forEach((img, index) => {
      formData.append(`roomImages`, img);
    });

    try {
      const response = await fetch("http://localhost:5000/api/pg/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 PG Added Successfully!");
      } else {
        alert(`⚠️ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❗ Error submitting PG details:", error);
      alert("⚠️ Failed to submit PG details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* 🚀 Campus Circle Logo */}
      <div className="logo-container">
        <img src={logo} alt="Campus Circle Logo" className="campus-circle-logo" />
      </div>

      <h2>Add PG Details</h2>

      <form onSubmit={handleSubmit}>
        <label>PG Name</label>
        <input type="text" value={pgName} onChange={(e) => setPgName(e.target.value)} required />

        <label>Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <label>Rent Price (₹)</label>
        <input type="number" value={rentPrice} onChange={(e) => setRentPrice(e.target.value)} required />

        <label>Deposit Amount</label>
        <input type="text" value={deposit} onChange={(e) => setDeposit(e.target.value)} required />

        <label>Room Type</label>
        <input type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} required />

        <label>Amenities (comma separated)</label>
        <input
          type="text"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          placeholder="e.g., Free WiFi, Parking, Fridge"
          required
        />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>PG Email ID</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Upload Main PG Images</label>
        <input type="file" multiple onChange={handleMainImageUpload} />

        <label>Upload Room Photos (1-2 images)</label>
        <input type="file" multiple accept="image/*" onChange={handleRoomImageUpload} />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PGDetailForm;
