import React, { useState } from "react";
import "./PGDetailForm.css";

const PGDetailForm = () => {
  const [pgName, setPgName] = useState("");
  const [location, setLocation] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleFileUpload = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!pgName || !location || !rentPrice || !description) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("pgName", pgName);
    formData.append("location", location);
    formData.append("rentPrice", rentPrice);
    formData.append("description", description);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Here, send `formData` to your backend API using fetch or axios
    console.log("Form submitted!");
  };

  return (
    <div className="form-container">
      <h2>PG Detail Form</h2>
      <form onSubmit={handleSubmit}>
        <label>PG Name</label>
        <input type="text" value={pgName} onChange={(e) => setPgName(e.target.value)} required />

        <label>Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <label>Rent Price</label>
        <input type="number" value={rentPrice} onChange={(e) => setRentPrice(e.target.value)} required />

        <label>Images Upload</label>
        <input type="file" multiple onChange={handleFileUpload} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PGDetailForm;
