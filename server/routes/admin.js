const express = require("express");
const router = express.Router();
const Alumni = require("../models/Alumni"); // Adjust path if needed

// GET all alumni
router.get("/all-alumni", async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    console.error("Error fetching alumni:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET alumni count
router.get("/alumni-count", async (req, res) => {
  try {
    const count = await Alumni.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Error counting alumni:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
