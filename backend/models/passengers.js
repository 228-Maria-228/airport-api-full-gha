const mongoose = require("mongoose");

const passengersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  last_name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  passport_number: {
    type: String,
    minLength: 19,
    maxLength: 20,
    require: true,
  },
  birthdate: {
    type: Date,
    min: 6,
    max: 8,
    require: true,
  },
  citizenship_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "citizenship_id",
    require: true,
  },
});

module.exports = mongoose.model("passengers", passengersSchema);
