import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageBookings.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📌 Fetch bookings from API
  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/bookings");
      setBookings(res.data?.bookings || []); // Ensure it's an array
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Delete booking
  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error("Failed to delete booking:", err);
      setError("Failed to delete booking.");
    }
  };

  // 🚀 Fetch bookings on load
  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 UI Rendering
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="booking-item" key={booking._id}>
            <p>
              <strong>{booking.name}</strong> | {booking.pgName}
            </p>
            <button className="cancel-btn" onClick={() => handleDelete(booking._id)}>
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ManageBookings;
