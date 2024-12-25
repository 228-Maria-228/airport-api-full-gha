const Airports = require('../models/airports');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');
const airports = require('../models/airports');

module.exports.getAllAirports = (req, res, next) => {
  Airports.find({ })
    .then((airport) => {
      res.status(SUCCESS_CODE).send({ data: airport });
    })
    .catch(next);
};

module.exports.getAirports = (req, res, next) => {
  const { AirportId } = req.body;

  Airports.findOne({ AirportId })
    .then((airport) => {
      res.status(SUCCESS_CODE).send({ data: airport });
    })
    .catch(next);
};

module.exports.createAirports = (req, res, next) => {
  const { value } = req.body;

  Airports.create({ value })
    .then((airport) => {
      res.status(CREATE_CODE).send({ data: airport });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteAirports = (req, res, next) => {
  const { airportId } = req.body;

  Airports.findOne({ AirportId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((airport) => {
      Airports.deleteOne(airport)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateAirports = (req, res, next) => {
  const { airportId } = req.body;

  Airports.findByIdAndUpdate(airportId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataAirport) => {
      res.status(SUCCESS_CODE).send({ data: dataAirport });
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


