const mongoose = require('mongoose');

const gatesSchema = new mongoose.Schema({
    terminal_id: {
      type: mongoose.Schema.Types.ObjectId,
      blank: 'terminal_id',
      require: true,
    },
    gate_number: {
        type: String,
        minLength: 1,
        maxLength: 10,
        require: true,
    },
});

module.exports = mongoose.model('gates', gatesSchema);
