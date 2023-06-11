const mongoose = require("mongoose");

const person = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Person", person);
