const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// Admin Signup Route
router.post("/signup", registerAdmin);

// Admin Login Route
router.post("/login", loginAdmin);

module.exports = router;
