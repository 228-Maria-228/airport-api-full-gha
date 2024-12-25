const Flights_aircrafts = require('../models/flights_aircrafts');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllFlights_aircrafts = (req, res, next) => {
  Flights_aircrafts.find({ })
    .then((flights_aircraft) => {
      res.status(SUCCESS_CODE).send({ data: flights_aircraft });
    })
    .catch(next);
};

module.exports.getFlights_aircrafts = (req, res, next) => {
  const { flights_aircraftId } = req.body;

  Flights_aircrafts.findOne({ flights_aircraftId })
    .then((flights_aircraft) => {
      res.status(SUCCESS_CODE).send({ data: flights_aircraft });
    })
    .catch(next);
};

module.exports.createFlights_aircrafts = (req, res, next) => {
  const { value } = req.body;

  Flights_aircrafts.create({ value })
    .then((flights_aircraft) => {
      res.status(CREATE_CODE).send({ data: flights_aircraft });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteFlights_aircrafts = (req, res, next) => {
  const { flights_aircraftId } = req.body;

  Flights_aircrafts.findOne({ flights_aircraftId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((flights_aircraft) => {
      Flights_aircrafts.deleteOne(flights_aircraft)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateFlights_aircrafts = (req, res, next) => {
  const { flights_aircraftId } = req.body;

  Flights_aircrafts.findByIdAndUpdate(flights_aircraftId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataflights_aircraft) => {
      res.status(SUCCESS_CODE).send({ data: dataflights_aircraft });
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


