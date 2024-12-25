const Cities = require('../models/cities');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllCities = (req, res, next) => {
  Cities.find({ })
    .then((city) => {
      res.status(SUCCESS_CODE).send({ data: city });
    })
    .catch(next);
};

module.exports.getcities = (req, res, next) => {
  const { cityId } = req.body;

  Cities.findOne({ cityId })
    .then((city) => {
      res.status(SUCCESS_CODE).send({ data: city });
    })
    .catch(next);
};

module.exports.createcities = (req, res, next) => {
  const { value } = req.body;

  Cities.create({ value })
    .then((city) => {
      res.status(CREATE_CODE).send({ data: city });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteCities = (req, res, next) => {
  const { citiesId } = req.body;

  Cities.findOne({ cityId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((city) => {
      Cities.deleteOne(city)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateCities = (req, res, next) => {
  const { cityId } = req.body;

  Cities.findByIdAndUpdate(cityId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datacity) => {
      res.status(SUCCESS_CODE).send({ data: datacity });
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


