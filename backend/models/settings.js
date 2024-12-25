const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    minLength: 5,
    maxLength: 255,
    require: true,
  },
  value: {
    type: String,
    minLength: 5,
    maxLength: 255,
    require: true,
  },
});

module.exports = mongoose.model("settings", settingsSchema);
