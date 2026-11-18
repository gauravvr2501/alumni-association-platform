const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});

// Routes
const alumniRoutes = require("./routes/alumni");
app.use("/api/alumni", alumniRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const donationRoutes = require('./routes/donation');
app.use('/api/donations', donationRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
