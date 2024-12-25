const Baggage_baggage_types = require('../models/baggage_baggage_types');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllBaggage_baggage_typess = (req, res, next) => {
  Baggage_baggage_types.find({ })
    .then((baggage_baggage_type) => {
      res.status(SUCCESS_CODE).send({ data: baggage_baggage_type });
    })
    .catch(next);
};

module.exports.getBaggage_baggage_types = (req, res, next) => {
  const { baggage_baggage_typeId } = req.body;

  Baggage_baggage_types.findOne({ baggage_baggage_typeId })
    .then((baggage_baggage_type) => {
      res.status(SUCCESS_CODE).send({ data: baggage_baggage_type });
    })
    .catch(next);
};

module.exports.createBaggage_baggage_types = (req, res, next) => {
  const { value } = req.body;

  Baggage_baggage_types.create({ value })
    .then((baggage_baggage_type) => {
      res.status(CREATE_CODE).send({ data: baggage_baggage_type });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteBaggage_baggage_types = (req, res, next) => {
  const { baggage_baggage_typeId } = req.body;

  Baggage_baggage_types.findOne({ baggage_baggage_typeId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((baggage_baggage_type) => {
      Baggage_baggage_types.deleteOne(baggage_baggage_type)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateBaggage_baggage_types = (req, res, next) => {
  const { baggage_baggage_typeId } = req.body;

  Baggage_baggage_types.findByIdAndUpdate(baggage_baggage_typeId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataBaggage_baggage_type) => {
      res.status(SUCCESS_CODE).send({ data: databaggage_baggage_type });
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


