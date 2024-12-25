const mongoose = require('mongoose');

const flight_statusesSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 255,
        require: true,
    },
});

module.exports = mongoose.model('flight_statuses', flight_statusesSchema);
