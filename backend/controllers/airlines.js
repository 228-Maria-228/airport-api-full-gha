const Airlines = require('../models/airlines');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllAirlines = (req, res, next) => {
  Airlines.find({ })
    .then((airline) => {
      res.status(SUCCESS_CODE).send({ data: airline });
    })
    .catch(next);
};

module.exports.getAirlines = (req, res, next) => {
  const { AirlineId } = req.body;

  Airlines.findOne({ AirlineId })
    .then((airline) => {
      res.status(SUCCESS_CODE).send({ data: airline });
    })
    .catch(next);
};

module.exports.createAirlines = (req, res, next) => {
  const { value } = req.body;

  Airlines.create({ value })
    .then((airline) => {
      res.status(CREATE_CODE).send({ data: airline });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteAirlines = (req, res, next) => {
  const { airlineId } = req.body;

  Airlines.findOne({ AirlineId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((airline) => {
      Airlines.deleteOne(airline)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateAirlines = (req, res, next) => {
  const { airlineId } = req.body;

  Airlines.findByIdAndUpdate(airlineId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataAirline) => {
      res.status(SUCCESS_CODE).send({ data: dataAirline });
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


