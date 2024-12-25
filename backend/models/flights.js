const mongoose = require("mongoose");

const flightsSchema = new mongoose.Schema({
  flight_number: {
    type: String,
    minLength: 8,
    maxLength: 10,
    require: true,
  },
  departure_airport_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "departure_airport_id",
    require: true,
  },
  arrival_airport_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "arrival_airport_id",
    require: true,
  },
  departure_time: {
    type: Date,
    min: 4,
    max: 6,
    require: true,
  },
  arrival_time: {
    type: Date,
    min: 4,
    max: 6,
    require: true,
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "status_id",
    require: true,
  },
});

module.exports = mongoose.model("flights", flightsSchema);
