const mongoose = require("mongoose");

const baggage_baggage_typesSchema = new mongoose.Schema({
  baggage_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "baggage_id",
    require: true,
  },
  baggage_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    blank: "baggage_type_id",
    require: true,
  },
});

module.exports = mongoose.model("baggage_baggage_types", baggage_baggage_typesSchema);
