const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  graduationYear: String,
});

module.exports = mongoose.model("Alumni", alumniSchema);
