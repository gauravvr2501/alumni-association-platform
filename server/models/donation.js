const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni',
    required: true
  },
  cause: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
