// const express = require("express");
// const multer = require("multer");
// const PG = require("../models/PG");

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
// });

// // Route: Add PG (No Authorization)
// router.post(
//   "/add",
//   upload.fields([
//     { name: "images", maxCount: 5 },
//     { name: "roomImage1", maxCount: 1 },
//     { name: "roomImage2", maxCount: 1 },
//     { name: "roomImage3", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const { pgName, location, rentPrice, description } = req.body;

//       const images = req.files["images"] || [];
//       const roomImages = [
//         req.files["roomImage1"]?.[0],
//         req.files["roomImage2"]?.[0],
//         req.files["roomImage3"]?.[0],
//       ].filter(Boolean);

//       // Save PG data to MongoDB
//       const newPG = new PG({
//         pgName,
//         location,
//         rentPrice,
//         description,
//         images: images.map((img) => img.buffer.toString("base64")),
//         roomImages: roomImages.map((img) => img.buffer.toString("base64")),
//       });

//       await newPG.save();

//       res.status(201).json({ success: true, message: "🎉 PG added successfully!" });
//     } catch (error) {
//       console.error("❗ Error adding PG:", error);
//       res.status(500).json({ success: false, message: "⚠️ Failed to add PG" });
//     }
//   }
// );

// module.exports = router;
const express = require("express");
const PG = require("../models/PG");

const router = express.Router();

// ✅ Get all PG listings
router.get("/", async (req, res) => {
  try {
    const pgs = await PG.find();
    res.status(200).json(pgs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get a single PG by ID
router.get("/:id", async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });
    res.status(200).json(pg);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Add a new PG listing
router.post("/", async (req, res) => {
  try {
    const newPG = new PG(req.body);
    await newPG.save();
    res.status(201).json(newPG);
  } catch (error) {
    res.status(400).json({ message: "Error adding PG", error });
  }
});

// ✅ Update PG details
router.put("/:id", async (req, res) => {
  try {
    const updatedPG = await PG.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPG) return res.status(404).json({ message: "PG not found" });
    res.status(200).json(updatedPG);
  } catch (error) {
    res.status(400).json({ message: "Error updating PG", error });
  }
});

// ✅ Delete a PG listing
router.delete("/:id", async (req, res) => {
  try {
    const deletedPG = await PG.findByIdAndDelete(req.params.id);
    if (!deletedPG) return res.status(404).json({ message: "PG not found" });
    res.status(200).json({ message: "PG deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting PG", error });
  }
});

module.exports = router;



