const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  use_time: {
    type: Number,
  },
  revenue: {
    type: Number,
  },
  dispenser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dispenser",
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
