

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PGDetail.css";
import defaultImage from "../assets/default-image.jpg";
import PGList from "./PGLists";

const PGDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pg } = location.state || {};

  // Redirect if no PG data is found
  if (!pg) return <p>PG not found</p>;

  // Handle PG Booking button click
  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Check if the user is logged in
    if (!user || !token) {
      alert("You must be logged in to book a PG!");
      navigate("/signin");
      return;
    }

    // Proceed to booking page if logged in
    navigate("/booking", { state: { pg } });
  };

  return (
    <div className="pg-detail-container">
      {/* PG Image Gallery */}
      <div className="pg-gallery">
        {pg.images && pg.images.length > 0 ? (
          pg.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${pg.name} ${index + 1}`}
              onError={(e) => (e.target.src = defaultImage)}
            />
          ))
        ) : (
          <img
            src={pg.image || defaultImage}
            alt={pg.name}
            onError={(e) => (e.target.src = defaultImage)}
          />
        )}
      </div>

      {/* PG Info Content */}
      <div className="pg-content">
        <h1>{pg.name || "PG Name Unavailable"}</h1>
        <p className="pg-address">{pg.address}</p>

        <section className="pg-description">
          <h2>Description</h2>
          <p>{pg.description || "Luxurious and affordable PG accommodation near prime locations."}</p>
        </section>

        {/* Amenities Section */}
        <section className="pg-amenities">
          <h2>Amenities</h2>
          <div className="amenities-list">
            {(Array.isArray(pg?.amenities) && pg.amenities.length > 0
              ? pg.amenities
              : ["Free WiFi", "Car Parking", "Washing Machine", "Fridge", "Electricity"]
            ).map((amenity, index) => (
              <div key={index} className="amenity-item">{amenity}</div>
            ))}
          </div>
        </section>

        {/* PG Sidebar Info */}
        <aside className="pg-details-sidebar">
          <h2>Campus Circle</h2>
          <p>{pg.address}</p>

          <h3>Rooms</h3>
          <p>2 Sharing non AC with food: ₹{pg.price?.toLocaleString() || "N/A"}</p>
          <p>Deposit Amount: 1 Month</p>

          <h3>Total Amount: ₹{pg.price?.toLocaleString() || "N/A"}</h3>

          {/* PG Booking Button */}
          <button className="enquiry-button" onClick={handleBooking}>
            Book Now
          </button>
        </aside>
      </div>

      {/* Recommended PGs Section */}
      <PGList />
    </div>
  );
};

export default PGDetail;

