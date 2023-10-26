const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_ID: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

module.exports = mongoose.model("Users", userSchema);
