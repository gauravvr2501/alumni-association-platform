const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const verifyToken = require('../middleware/authMiddleware');

// POST: Save donation with alumni ID
router.post('/', verifyToken, async (req, res) => {
  try {
    const { cause, amount, method } = req.body;
    const alumniId = req.user.id; // from decoded JWT
 
    const newDonation = new Donation({
      alumniId,
      cause,
      amount,
      method,
    });

    await newDonation.save();
    res.status(201).json({ message: 'Donation successful' });
  } catch (error) {
    console.error('Error while saving donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: All donations with alumni name & email
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().populate('alumniId', 'name email');
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
