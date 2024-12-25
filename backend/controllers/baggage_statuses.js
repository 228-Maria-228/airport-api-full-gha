const Baggage_statuses = require('../models/baggage_statuses');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllBaggage_statuses = (req, res, next) => {
  Baggage_statuses.find({ })
    .then((baggage_status) => {
      res.status(SUCCESS_CODE).send({ data: baggage_status });
    })
    .catch(next);
};

module.exports.getBaggage_statuses = (req, res, next) => {
  const { baggage_statusId } = req.body;

  Baggage_statuses.findOne({ baggage_statusId })
    .then((baggage_status) => {
      res.status(SUCCESS_CODE).send({ data: baggage_status });
    })
    .catch(next);
};

module.exports.createBaggage_statuses = (req, res, next) => {
  const { value } = req.body;

  Baggage_statuses.create({ value })
    .then((baggage_status) => {
      res.status(CREATE_CODE).send({ data: baggage_status });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteBaggage_statuses = (req, res, next) => {
  const { baggage_statusId } = req.body;

  Baggage_statuses.findOne({ baggage_statusId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((baggage_status) => {
      Baggage_statuses.deleteOne(baggage_status)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateBaggage_statuses = (req, res, next) => {
  const { baggage_statusId } = req.body;

  Baggage_statuses.findByIdAndUpdate(baggage_statusId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((databaggage_status) => {
      res.status(SUCCESS_CODE).send({ data: databaggage_status });
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


