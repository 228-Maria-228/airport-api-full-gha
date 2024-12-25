const mongoose = require("mongoose");

const airlinesSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  iata_code: {
    type: String,
    minLength: 1,
    maxLength: 2,
    require: true,
  },
  icao_code: {
    type: String,
    minLength: 1,
    maxLength: 3,
    require: true,
  },
});

module.exports = mongoose.model("airlines", airlinesSchema);
