const mongoose = require('mongoose');

const check_insSchema = new mongoose.Schema({
    passenger_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'passenger_id',
      require: true,
    },
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'flight_id',
      require: true,
    },
    seat_number: {
      type: String,
      minLength: 1,
      maxLength: 10,
      require: true,
    },
    check_in_time: {
      type: Date,
      min: 3,
      max: 6,
      require: true,
    }
});

module.exports = mongoose.model('check_ins', check_insSchema);
