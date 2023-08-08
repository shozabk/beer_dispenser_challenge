const mongoose = require("mongoose");

const dispenserSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  flow_Volume: {
    type: Number,
  },
  pouringStartTime: {
    type: Date,
  },
  pouringEndTime: {
    type: Date,
  },
  counter: {
    type: Number,
  },
});

const Dispenser = mongoose.model("Dispenser", dispenserSchema);

module.exports = Dispenser;
