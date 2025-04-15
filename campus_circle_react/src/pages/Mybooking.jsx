import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();

  // State for user and bookings
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("User not logged in! Redirecting to Sign In.");
      navigate("/signin");
    }

    // Mock bookings (replace with API call later)
    setBookings([
      {
        id: 1,
        pgName: "Sunrise PG",
        checkInDate: "2025-04-01",
        duration: 3,
        totalAmount: 15000,
      },
      {
        id: 2,
        pgName: "GreenView Residency",
        checkInDate: "2025-05-10",
        duration: 2,
        totalAmount: 10000,
      },
    ]);
  }, [navigate]);

  // Show loading if user not loaded yet
  if (!user) return <p>Loading...</p>;

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>

      {/* User Info */}
      <div className="user-info">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.pgName}</h3>
              <p>Check-in: {booking.checkInDate}</p>
              <p>Duration: {booking.duration} months</p>
              <p>Total: ₹{booking.totalAmount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
