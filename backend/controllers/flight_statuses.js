const Flight_statuses = require('../models/flight_statuses');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllFlight_statuses = (req, res, next) => {
  Flight_statuses.find({ })
    .then((flight_status) => {
      res.status(SUCCESS_CODE).send({ data: flight_status });
    })
    .catch(next);
};

module.exports.getFlight_statuses = (req, res, next) => {
  const { flight_statusId } = req.body;

  Flight_statuses.findOne({ flight_statusId })
    .then((flight_status) => {
      res.status(SUCCESS_CODE).send({ data: flight_status });
    })
    .catch(next);
};

module.exports.createFlight_statuses = (req, res, next) => {
  const { value } = req.body;

  Flight_statuses.create({ value })
    .then((flight_status) => {
      res.status(CREATE_CODE).send({ data: flight_status });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteFlight_statuses = (req, res, next) => {
  const { flight_statusId } = req.body;

  Flight_statuses.findOne({ flight_statusId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((flight_status) => {
      Flight_statuses.deleteOne(flight_status)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateFlight_statuses = (req, res, next) => {
  const { flight_statusId } = req.body;

  Flight_statuses.findByIdAndUpdate(flight_statusId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataflight_status) => {
      res.status(SUCCESS_CODE).send({ data: dataflight_status });
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


