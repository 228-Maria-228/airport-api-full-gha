const mongoose = require('mongoose');
const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 255,
        require: true,
    },
});

module.exports = mongoose.model('roles', rolesSchema);



