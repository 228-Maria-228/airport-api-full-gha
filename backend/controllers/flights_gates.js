const Flights_gates = require('../models/flights_gates');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllFlights_gates = (req, res, next) => {
  Flights_gates.find({ })
    .then((flights_gate) => {
      res.status(SUCCESS_CODE).send({ data: flights_gate });
    })
    .catch(next);
};

module.exports.getFlights_gates = (req, res, next) => {
  const { flights_gateId } = req.body;

  Flights_gates.findOne({ flights_gateId })
    .then((flights_gate) => {
      res.status(SUCCESS_CODE).send({ data: flights_gate });
    })
    .catch(next);
};

module.exports.createFlights_gates = (req, res, next) => {
  const { value } = req.body;

  Flights_gates.create({ value })
    .then((flights_gate) => {
      res.status(CREATE_CODE).send({ data: flights_gate });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteFlights_gates = (req, res, next) => {
  const { flights_gateId } = req.body;

  Flights_gates.findOne({ flights_gateId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((flights_gate) => {
      Flights_gates.deleteOne(flights_gate)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateFlights_gates = (req, res, next) => {
  const { flights_gateId } = req.body;

  Flights_gates.findByIdAndUpdate(flights_gateId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataflights_gate) => {
      res.status(SUCCESS_CODE).send({ data: dataflights_gate });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('Данный email уже зарегистрирован'));
      }
      next(err);
    });
};


