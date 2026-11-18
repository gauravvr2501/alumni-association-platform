const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
