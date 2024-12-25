const mongoose = require("mongoose");

const aircraftsSchema = new mongoose.Schema({
  airline_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airline_id",
    require: true,
  },
  model: {
    type: String,
    minLength: 5,
    maxLength: 255,
    require: true,
  },
  capacity: {
    type: Number,
    min: 100,
    max: 580,
    require: true,
  },
});

module.exports = mongoose.model("aircrafts", aircraftsSchema);
