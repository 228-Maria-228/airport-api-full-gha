const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    minLength: 4,
    maxLength: 8,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "user_id",
    require: true,
  },
  action: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  details: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
});

module.exports = mongoose.model("logs", logsSchema);
