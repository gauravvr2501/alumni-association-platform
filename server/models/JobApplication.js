const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
