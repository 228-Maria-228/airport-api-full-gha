const mongoose = require('mongoose');

const flights_aircraftsSchema = new mongoose.Schema({
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        blank: 'flight_id',
        require: true,
    },
    aircraft_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'aircraft_id',
      require: true,
    },
});

module.exports = mongoose.model('flights_aircrafts', flights_aircraftsSchema);
