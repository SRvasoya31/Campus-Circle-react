    const express = require("express");
    const router = express.Router();
    const Booking = require("../models/Booking");

    // Create a new booking (no pgId or auth required)
    router.post("/", async (req, res) => {
    const { pgName, name, email, phone, checkInDate, duration, totalAmount } = req.body;

    if (!pgName || !name || !email || !phone || !checkInDate || duration <= 0) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        const newBooking = new Booking({
        pgName,
        name,
        email,
        phone,
        checkInDate,
        duration,
        totalAmount,
        });

        await newBooking.save();

        res.status(201).json({ message: "Booking confirmed successfully!" });
    } catch (error) {
        console.error("Booking save error:", error);
        res.status(500).json({ message: "Booking failed. Please try again." });
    }
    });

    module.exports = router;
