const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
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
  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied",
  },
  notes: {
    type: String,
    default: "",
    maxlength: 1000,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

applicationSchema.index({ user: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
