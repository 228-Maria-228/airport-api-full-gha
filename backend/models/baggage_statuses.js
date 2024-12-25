const mongoose = require('mongoose');

const baggage_statusesSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 255,
        require: true,
    },
});

module.exports = mongoose.model('baggage_statuses', baggage_statusesSchema);
