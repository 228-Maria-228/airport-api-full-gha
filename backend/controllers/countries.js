const Countries = require('../models/countries');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllCountries = (req, res, next) => {
  Countries.find({ })
    .then((country) => {
      res.status(SUCCESS_CODE).send({ data: country });
    })
    .catch(next);
};

module.exports.getCountries = (req, res, next) => {
  const { countryId } = req.body;

  Countries.findOne({ countryId })
    .then((country) => {
      res.status(SUCCESS_CODE).send({ data: country });
    })
    .catch(next);
};

module.exports.createCountries = (req, res, next) => {
  const { value } = req.body;

  Countries.create({ value })
    .then((country) => {
      res.status(CREATE_CODE).send({ data: country });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteCountries = (req, res, next) => {
  const { countryId } = req.body;

  Countries.findOne({ countryId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((country) => {
      Countries.deleteOne(country)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateCountries = (req, res, next) => {
  const { countryId } = req.body;

  Countries.findByIdAndUpdate(countryId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datacountry) => {
      res.status(SUCCESS_CODE).send({ data: datacountry });
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


