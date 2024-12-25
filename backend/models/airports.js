const mongoose = require("mongoose");

const airportsSchema = new mongoose.Schema({
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "city_id",
    require: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  iata_code: {
    type: String,
    minLength: 1,
    maxLength: 3,
    require: true,
  },
  icao_code: {
    type: String,
    minLength: 1,
    maxLength: 4,
    require: true,
  },
});

module.exports = mongoose.model("airports", airportsSchema);
