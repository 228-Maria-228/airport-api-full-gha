const Baggage = require('../models/baggage');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllBaggage = (req, res, next) => {
  Baggage.find({ })
    .then((baggage) => {
      res.status(SUCCESS_CODE).send({ data: baggage });
    })
    .catch(next);
};

module.exports.getBaggage = (req, res, next) => {
  const { baggageId } = req.body;

  Baggage.findOne({ baggage_Id })
    .then((baggage) => {
      res.status(SUCCESS_CODE).send({ data: baggage });
    })
    .catch(next);
};

module.exports.createBaggage = (req, res, next) => {
  const { value } = req.body;

  Baggage.create({ value })
    .then((baggage) => {
      res.status(CREATE_CODE).send({ data: baggage });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteBaggage = (req, res, next) => {
  const { baggageId } = req.body;

  Baggage.findOne({ baggageId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((baggage) => {
      Baggage.deleteOne(baggage)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateBaggage = (req, res, next) => {
  const { baggageId } = req.body;

  Baggage.findByIdAndUpdate(baggageId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((databaggage) => {
      res.status(SUCCESS_CODE).send({ data: databaggage });
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


