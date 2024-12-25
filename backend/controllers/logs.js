const Logs = require('../models/logs');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllLogs = (req, res, next) => {
  Logs.find({ })
    .then((log) => {
      res.status(SUCCESS_CODE).send({ data: log });
    })
    .catch(next);
};

module.exports.getLogs = (req, res, next) => {
  const { logId } = req.body;

  Logs.findOne({ logId })
    .then((log) => {
      res.status(SUCCESS_CODE).send({ data: log });
    })
    .catch(next);
};

module.exports.createLogs = (req, res, next) => {
  const { value } = req.body;

  Logs.create({ value })
    .then((log) => {
      res.status(CREATE_CODE).send({ data: log });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteLogs = (req, res, next) => {
  const { logId } = req.body;

  Logs.findOne({ logId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((log) => {
      Logs.deleteOne(log)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateLogs = (req, res, next) => {
  const { logId } = req.body;

  Logs.findByIdAndUpdate(logId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datalog) => {
      res.status(SUCCESS_CODE).send({ data: datalog });
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


