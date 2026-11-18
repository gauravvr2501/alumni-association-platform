const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');

// GET all job applications
router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate('alumniId', 'name email')
      .populate('jobId', 'title');
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch job applications' });
  }
});

module.exports = router;
