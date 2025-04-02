const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register New Admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ message: "Admin already exists" });

    admin = new Admin({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await admin.save();

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, adminId: admin.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login (already exists)
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = bcrypt.compareSync(password, admin.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, adminId: admin.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerAdmin, loginAdmin };
