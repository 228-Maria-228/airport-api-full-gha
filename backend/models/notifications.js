const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  passenger_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "passenger_id",
    require: true,
  },
  message: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  is_read: {
    type: Bit,
    min: 2,
    max: 3,
    require: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("notifications", notificationsSchema);
