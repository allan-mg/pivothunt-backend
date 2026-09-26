const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  level: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

savedJobSchema.index({ user: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("SavedJob", savedJobSchema);
