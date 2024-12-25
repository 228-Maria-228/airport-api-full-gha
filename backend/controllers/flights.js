const Flights = require('../models/flights');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllFlights = (req, res, next) => {
  Flights.find({ })
    .then((flight) => {
      res.status(SUCCESS_CODE).send({ data: flight });
    })
    .catch(next);
};

module.exports.getFlights = (req, res, next) => {
  const { flightId } = req.body;

  Flights.findOne({ flightId })
    .then((flight) => {
      res.status(SUCCESS_CODE).send({ data: flight });
    })
    .catch(next);
};

module.exports.createFlights = (req, res, next) => {
  const { value } = req.body;

  Flights.create({ value })
    .then((flight) => {
      res.status(CREATE_CODE).send({ data: flight });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteFlights = (req, res, next) => {
  const { FlightId } = req.body;

  Flights.findOne({ flightId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((flight) => {
      Flights.deleteOne(flight)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateFlights = (req, res, next) => {
  const { flightId } = req.body;

  Flights.findByIdAndUpdate(flightId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataflight) => {
      res.status(SUCCESS_CODE).send({ data: dataflight });
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


