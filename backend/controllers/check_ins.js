const Check_ins = require('../models/check_ins');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllCheck_ins = (req, res, next) => {
  Check_ins.find({ })
    .then((check_in) => {
      res.status(SUCCESS_CODE).send({ data: check_in });
    })
    .catch(next);
};

module.exports.getCheck_ins = (req, res, next) => {
  const { check_inId } = req.body;

  Check_ins.findOne({ check_inId })
    .then((check_in) => {
      res.status(SUCCESS_CODE).send({ data: check_in });
    })
    .catch(next);
};

module.exports.createCheck_ins = (req, res, next) => {
  const { value } = req.body;

  Check_ins.create({ value })
    .then((check_in) => {
      res.status(CREATE_CODE).send({ data: check_in });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteCheck_ins = (req, res, next) => {
  const { check_inId } = req.body;

  Check_ins.findOne({ check_inId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((check_in) => {
      Check_ins.deleteOne(check_in)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateCheck_ins = (req, res, next) => {
  const { check_inId } = req.body;

  Check_ins.findByIdAndUpdate(check_inId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datacheck_in) => {
      res.status(SUCCESS_CODE).send({ data: datacheck_in });
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


