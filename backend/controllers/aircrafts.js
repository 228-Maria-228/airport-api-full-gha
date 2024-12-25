const Aircrafts = require('../models/aircrafts');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllAircrafts = (req, res, next) => {
  Aircrafts.find({ })
    .then((aircraft) => {
      res.status(SUCCESS_CODE).send({ data: aircraft });
    })
    .catch(next);
};

module.exports.getAircrafts = (req, res, next) => {
  const { AircraftId } = req.body;

  Aircrafts.findOne({ AircraftId })
    .then((aircraft) => {
      res.status(SUCCESS_CODE).send({ data: aircraft });
    })
    .catch(next);
};

module.exports.createAircrafts = (req, res, next) => {
  const { airline_id, model, capacity } = req.body;

  Aircrafts.create({ airline_id, model, capacity }) 
    .then((aircraft) => {
      res.status(CREATE_CODE).send({ data: aircraft });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteAircrafts = (req, res, next) => {
  const { AircraftId } = req.body;

  Aircrafts.findOne({ AircraftId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((aircraft) => {
      Aircrafts.deleteOne(aircraft)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateAircrafts = (req, res, next) => {
  const { AircraftId, airline_id, model, capacity } = req.body;

  Aircrafts.findByIdAndUpdate(AircraftId, { airline_id, model, capacity }, {
    new: true,
    runValidators: true,
  })
    .then((dataAircraft) => {
      res.status(SUCCESS_CODE).send({ data: dataAircraft });
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


