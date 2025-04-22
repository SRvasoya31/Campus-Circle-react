const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  pgName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
