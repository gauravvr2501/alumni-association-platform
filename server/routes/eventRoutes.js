const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');
const authenticate = require('../middleware/authMiddleware');

// POST: Add Event (Admin only)
router.post('/add-event', async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const newEvent = new Event({ title, description, location, date });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// GET: All Events
router.get('/all-events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST: Register for Event (Alumni only)
router.post('/register/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;
    const alumniId = req.user.id;

    const existing = await EventRegistration.findOne({ eventId, alumniId });
    if (existing) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const registration = new EventRegistration({ eventId, alumniId });
    await registration.save();
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

// GET: All Event Registrations (Admin)


// GET: Event registration count
// GET: All Event Registrations with alumni details
router.get('/event-registrations', async (req, res) => {
  try {
    const registrations = await EventRegistration.find()
      .populate('alumniId', 'name email')
      .populate('eventId', 'title');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// GET: Event registration count (for dashboard card)
router.get('/registration-count', async (req, res) => {
  try {
    const count = await EventRegistration.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get event registration count' });
  }
});

module.exports = router;
