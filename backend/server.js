

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

// 🌟 Middleware Setup
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// ---------------------------------------------
// 📌 MongoDB Connection
// ---------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❗ MongoDB connection failed:", err));

app.use(bodyParser.json());

// Define Booking model
const Booking = mongoose.model("Booking", {
  name: String,
  email: String,
  phone: String,
  pgName: String,
  checkInDate: String,
  duration: Number,
  totalAmount: Number,
  paymentStatus: String,
});

// API endpoint to handle PG bookings
app.post("/api/book-pg", async (req, res) => {
  try {
    const { name, email, phone, pgName, checkInDate, duration, totalAmount, paymentStatus } = req.body;

    // Save the booking details to MongoDB
    const booking = new Booking({
      name,
      email,
      phone,
      pgName,
      checkInDate,
      duration,
      totalAmount,
      paymentStatus,
    });

    await booking.save();

    // Send confirmation email to the user
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password", // Use environment variables for sensitive data
      },
    });

    const mailOptions = {
      from: "svasoya913@rku.ac.in",
      to: email,
      subject: "PG Booking Confirmation",
      text: `Dear ${name},\n\nYour booking at ${pgName} has been confirmed. Check-in date: ${checkInDate}. Total amount: ₹${totalAmount}\n\nThank you for choosing us!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Booking confirmed and email sent" });
  } catch (error) {
    console.error("Error booking PG:", error);
    res.status(500).json({ message: "Error processing booking" });
  }
});

// ---------------------------------------------
// 🔹 SCHEMAS & MODELS
// ---------------------------------------------

// ✅ User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// 🏘️ PG Schema
const pgSchema = new mongoose.Schema({
  pgName: { type: String, required: true },
  location: { type: String, required: true },
  rentPrice: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  roomImages: [{ type: String }],
});
const PG = mongoose.model("PG", pgSchema);

// 🔑 Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);

// ---------------------------------------------
// 🛠️ FILE UPLOAD CONFIG (Multer)
// ---------------------------------------------
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ---------------------------------------------
// 🚀 AUTH ROUTES
// ---------------------------------------------

// 🎉 User Sign Up
app.post("/api/auth/signup", async (req, res) => {
  const { email, username, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, username, password: hashedPassword, phone });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("Sign Up Error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ✅ User Sign In
app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Sign In Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔑 Admin Sign In Route
app.post("/api/admin/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: "Invalid admin credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Admin Sign In Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------------------------
// 🏘️ PG ROUTES
// ---------------------------------------------

// ➕ Add PG Route
app.post("/api/pg/add", upload.fields([{ name: "images" }, { name: "roomImages" }]), async (req, res) => {
  const { pgName, location, rentPrice, description } = req.body;

  try {
    const newPG = new PG({
      pgName,
      location,
      rentPrice,
      description,
      images: req.files["images"]?.map((file) => file.path),
      roomImages: req.files["roomImages"]?.map((file) => file.path),
    });

    await newPG.save();
    res.status(201).json({ success: true, message: "PG added successfully!" });
  } catch (err) {
    console.error("PG Upload Error:", err);
    res.status(500).json({ success: false, message: "Failed to upload PG details" });
  }
});

// 📌 Fetch All PGs
app.get("/api/pgs", async (req, res) => {
  try {
    const pgs = await PG.find();
    res.status(200).json(pgs);
  } catch (err) {
    console.error("Fetch PGs Error:", err);
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
});

// 🎟️ Booking Route
app.post("/bookings", async (req, res) => {
  try {
    const { pgName, name, email, phone, checkInDate, duration, totalAmount } = req.body;

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
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// delete
app.delete("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// ---------------------------------------------
// 🚀 START SERVER
// ---------------------------------------------
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
