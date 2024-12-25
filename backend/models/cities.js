const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "country_id",
    require: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
});

module.exports = mongoose.model("cities", citiesSchema);
