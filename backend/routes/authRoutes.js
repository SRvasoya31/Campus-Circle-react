const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🎯 Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // ✅ Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✨ Create new user
    user = new User({ username, email, password: hashedPassword, phone });
    await user.save();

    // 🛠️ Generate JWT Token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 🎉 Return token + user details
    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email, phone: user.phone },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ msg: "Server error. Please try again." });
  }
});

// 🔑 Signin Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    // 🔒 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    // 🛠️ Generate JWT Token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 🎉 Return token + user details
    res.status(200).json({
      token,
      user: { id: user.id, username: user.username, email: user.email, phone: user.phone },
    });
  } catch (err) {
    console.error("Signin error:", err.message);
    res.status(500).json({ msg: "Server error. Please try again." });
  }
});
// 🚀 Forgot Password Route
// routes/auth.js

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🎯 Normally, you'd generate a reset token (JWT or random string)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // ✅ Send the email with the reset link (skipping email setup for now)
    console.log(`Password reset link: http://localhost:3000/reset-password/${resetToken}`);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});


// 👋 Export routes
module.exports = router;
