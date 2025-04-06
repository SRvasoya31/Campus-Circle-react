import { useState, useEffect } from "react";
import axios from "axios";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>Manage Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.user} - {booking.pgName} <button>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingManagement;
