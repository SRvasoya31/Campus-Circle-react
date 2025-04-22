// PG.js - Mongoose model for a PG (Paying Guest) listing


const mongoose = require("mongoose");

const PGSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // PG Name
  address: { type: String, required: true, trim: true }, // Location/Address
  rentPrice: { type: Number, required: true, min: 0 }, // Monthly Rent Price
  description: { type: String, trim: true }, // PG Description
  amenities: { type: [String], default: [] }, // List of amenities (WiFi, AC, etc.)
  images: { type: [String], default: [] }, // Array of image URLs
  contact: { type: String, required: true, trim: true }, // Owner contact info (phone number)
  email: { type: String, required: true, trim: true, lowercase: true }, // Owner email ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PG", PGSchema);


