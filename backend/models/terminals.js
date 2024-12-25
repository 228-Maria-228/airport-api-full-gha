const mongoose = require('mongoose');

const terminalsSchema = new mongoose.Schema({
    airport_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'airport_id',
      require: true,
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 255,
        require: true,
    },
});

module.exports = mongoose.model('terminals', terminalsSchema);
