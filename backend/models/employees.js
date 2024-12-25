const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
    maxLength: 255,
    require: true,
  },
  password_hash: {
    type: String,
    min: 5,
    max: 255,
    default: 5,
    require: true,
  },
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
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "role_id",
    require: true,
  },
});

module.exports = mongoose.model("employees", employeesSchema);


