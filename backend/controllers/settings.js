const Settings = require('../models/settings');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllSettings = (req, res, next) => {
  Settings.find({ })
    .then((setting) => {
      res.status(SUCCESS_CODE).send({ data: setting });
    })
    .catch(next);
};

module.exports.getSettings = (req, res, next) => {
  const { settingId } = req.body;

  Settings.findOne({ settingId })
    .then((setting) => {
      res.status(SUCCESS_CODE).send({ data: setting });
    })
    .catch(next);
};

module.exports.createSettings = (req, res, next) => {
  const { value } = req.body;

  Settings.create({ value })
    .then((setting) => {
      res.status(CREATE_CODE).send({ data: setting });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteSettings = (req, res, next) => {
  const { settingId } = req.body;

  Settings.findOne({ settingId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((setting) => {
      Settings.deleteOne(setting)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateSettings = (req, res, next) => {
  const { settingId } = req.body;

  Settings.findByIdAndUpdate(settingId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datasetting) => {
      res.status(SUCCESS_CODE).send({ data: datasetting });
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


