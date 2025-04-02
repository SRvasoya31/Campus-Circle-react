const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { pgId, pgName, name, email, phone, checkInDate, duration, totalAmount } = req.body;

    if (!pgId || !name || !email || !phone || !checkInDate || duration <= 0) {
      return res.status(400).json({ message: "Please fill all fields correctly" });
    }

    const booking = new Booking({
      user: req.user.id,
      pgId,
      pgName,
      name,
      email,
      phone,
      checkInDate,
      duration,
      totalAmount,
    });

    await booking.save();
    res.status(201).json({ message: "Booking confirmed!", booking });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ message: "Server error, booking failed" });
  }
};

// Get user bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetching bookings failed:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = { createBooking, getMyBookings };
