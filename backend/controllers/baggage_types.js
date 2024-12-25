const Baggage_types = require('../models/baggage_types');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllBaggage_types = (req, res, next) => {
  Baggage_types.find({ })
    .then((baggage_type) => {
      res.status(SUCCESS_CODE).send({ data: baggage_type });
    })
    .catch(next);
};

module.exports.getBaggage_types = (req, res, next) => {
  const { baggage_typeId } = req.body;

  Baggage_types.findOne({ baggage_typeId })
    .then((baggage_type) => {
      res.status(SUCCESS_CODE).send({ data: baggage_type });
    })
    .catch(next);
};

module.exports.createBaggage_types = (req, res, next) => {
  const { value } = req.body;

  Baggage_types.create({ value })
    .then((baggage_type) => {
      res.status(CREATE_CODE).send({ data: baggage_type });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteBaggage_types = (req, res, next) => {
  const { baggage_typeId } = req.body;

  Baggage_types.findOne({ baggage_typeId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((baggage_type) => {
      Baggage_types.deleteOne(baggage_type)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateBaggage_types = (req, res, next) => {
  const { baggage_typeId } = req.body;

  Baggage_types.findByIdAndUpdate(baggage_typeId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((databaggage_type) => {
      res.status(SUCCESS_CODE).send({ data: databaggage_type });
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


