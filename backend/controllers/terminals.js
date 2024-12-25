const Terminals = require('../models/terminals');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllTerminals = (req, res, next) => {
  Terminals.find({ })
    .then((terminal) => {
      res.status(SUCCESS_CODE).send({ data: terminal });
    })
    .catch(next);
};

module.exports.getTerminals = (req, res, next) => {
  const { terminalId } = req.body;

  Terminals.findOne({ terminalId })
    .then((terminal) => {
      res.status(SUCCESS_CODE).send({ data: terminal });
    })
    .catch(next);
};

module.exports.createTerminals = (req, res, next) => {
  const { value } = req.body;

  Terminals.create({ value })
    .then((terminal) => {
      res.status(CREATE_CODE).send({ data: terminal });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteTerminals = (req, res, next) => {
  const { terminalId } = req.body;

  Terminals.findOne({ terminalId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((terminal) => {
      Terminals.deleteOne(terminal)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateTerminals = (req, res, next) => {
  const { terminalId } = req.body;

  Terminals.findByIdAndUpdate(terminalId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataterminal) => {
      res.status(SUCCESS_CODE).send({ data: dataterminal });
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


