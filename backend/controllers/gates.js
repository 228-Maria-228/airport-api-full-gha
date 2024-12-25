const Gates = require('../models/gates');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllGates = (req, res, next) => {
  Gates.find({ })
    .then((gate) => {
      res.status(SUCCESS_CODE).send({ data: gate });
    })
    .catch(next);
};

module.exports.getGates = (req, res, next) => {
  const { gateId } = req.body;

  Gates.findOne({ gateId })
    .then((gate) => {
      res.status(SUCCESS_CODE).send({ data: gate });
    })
    .catch(next);
};

module.exports.createGates = (req, res, next) => {
  const { value } = req.body;

  Gates.create({ value })
    .then((gate) => {
      res.status(CREATE_CODE).send({ data: gate });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteGates = (req, res, next) => {
  const { gateId } = req.body;

  Gates.findOne({ gateId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((gate) => {
      Gates.deleteOne(gate)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateGates = (req, res, next) => {
  const { gateId } = req.body;

  Gates.findByIdAndUpdate(gateId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datagate) => {
      res.status(SUCCESS_CODE).send({ data: datagate });
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


