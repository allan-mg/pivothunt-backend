const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  headline: {
    type: String,
    default: "",
    maxlength: 120,
  },

  location: {
    type: String,
    default: "",
    maxlength: 100,
  },

  avatar: {
    type: String,
    default: "",
  },

  skills: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
