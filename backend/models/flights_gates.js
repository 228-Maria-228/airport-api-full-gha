const mongoose = require('mongoose');

const flights_gatesSchema = new mongoose.Schema({
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        blank: 'flight_id',
        require: true,
    },
    gate_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'gate_id',
      require: true,
    },
});

module.exports = mongoose.model('flights_gates', flights_gatesSchema);
