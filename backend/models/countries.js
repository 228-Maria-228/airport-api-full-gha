const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  code: {
    type: String,
    minLength: 1,
    maxLength: 2,
    require: true,
  },
});

module.exports = mongoose.model("countries", countriesSchema);
