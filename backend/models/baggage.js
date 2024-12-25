const mongoose = require("mongoose");

const baggageSchema = new mongoose.Schema({
  passenger_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "passenger_id",
    require: true,
  },
  flight_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "flight_id",
    require: true,
  },
  weight: {
    type: Double,
    min: 5,
    max: 2,
    require: true,
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "status_id",
    require: true,
  },
});

module.exports = mongoose.model("baggage", baggageSchema);
