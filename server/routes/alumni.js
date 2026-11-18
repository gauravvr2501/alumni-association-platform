const express = require("express");
const router = express.Router();
const Alumni = require("../models/Alumni");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, graduationYear } = req.body;

    // Check if user exists
    const existing = await Alumni.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new alumni
    const newAlumni = new Alumni({ name, email, password: hashedPassword, graduationYear });
    await newAlumni.save();

    res.status(201).json({ msg: "Signup successful", alumni: newAlumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Alumni.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token,alumniId: user._id  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route GET /api/admin/alumni-count
router.get("/admin/alumni-count", async (req, res) => {
  try {
    const count = await Alumni.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching alumni count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ @route GET /api/alumni
router.get("/", async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
});

router.post("/logout", (req, res) => {
  // On frontend, we'll clear the token
  // On backend, you could implement token blacklist if needed
  res.json({ message: "Logout successful", loggedIn: false });
});

router.get("/check", async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ loggedIn: false });
      }

      try {
        // Fetch user details from DB
        const user = await Alumni.findById(decoded.userId).select("name email graduationYear");
        if (!user) {
          return res.json({ loggedIn: false });
        }

        return res.json({
          loggedIn: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            graduationYear: user.graduationYear,
          },
        });
      } catch (dbErr) {
        console.error(dbErr);
        return res.status(500).json({ loggedIn: false });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ loggedIn: false });
  }
});

module.exports = router;



