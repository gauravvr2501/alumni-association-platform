const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const Alumni = require('../models/Alumni');
const authMiddleware = require('../middleware/authMiddleware');


// ✅ GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Optional: sort by upcoming deadlines
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// ✅ POST a new job (Admin adds a job)
router.post('/add', async (req, res) => {
  try {
    const { title, company, description, location, deadline } = req.body;

    // Basic validation
    if (!title || !company || !description || !location || !deadline) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const job = new Job({ title, company, description, location, deadline });
    await job.save();

    res.status(201).json({ message: 'Job added successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Error adding job', error: err.message });
  }
});

// ✅ Alumni applies to a job
router.post('/apply-job', authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.body;
    const alumniId = req.user.id;

    const alreadyApplied = await JobApplication.findOne({ jobId, alumniId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied!' });
    }

    await JobApplication.create({ jobId, alumniId });
    res.json({ message: 'Applied Successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during application' });
  }
});

// ✅ Admin: Get all job applications
router.get('/admin/applications', async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate('jobId', 'title')
      .populate('alumniId', 'name email');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

module.exports = router;