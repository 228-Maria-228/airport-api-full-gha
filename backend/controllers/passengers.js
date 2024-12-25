const Passengers = require('../models/passengers');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllPassengers = (req, res, next) => {
  Passengers.find({ })
    .then((passenger) => {
      res.status(SUCCESS_CODE).send({ data: passenger });
    })
    .catch(next);
};

module.exports.getPassengers = (req, res, next) => {
  const { passengerId } = req.body;

  Passengers.findOne({ passengerId })
    .then((passenger) => {
      res.status(SUCCESS_CODE).send({ data: passenger });
    })
    .catch(next);
};

module.exports.createPassengers = (req, res, next) => {
  const { value } = req.body;

  Passengers.create({ value })
    .then((passenger) => {
      res.status(CREATE_CODE).send({ data: passenger });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deletePassengers = (req, res, next) => {
  const { passengerId } = req.body;

  Passengers.findOne({ passengerId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((passenger) => {
      Passengers.deleteOne(passenger)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updatePassengers = (req, res, next) => {
  const { passengerId } = req.body;

  Passengers.findByIdAndUpdate(passengerId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datapassenger) => {
      res.status(SUCCESS_CODE).send({ data: datapassenger });
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


