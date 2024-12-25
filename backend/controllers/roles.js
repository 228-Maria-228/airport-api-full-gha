const Roles = require('../models/roles');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllRoles = (req, res, next) => {
  Roles.find({ })
    .then((role) => {
      res.status(SUCCESS_CODE).send({ data: role });
    })
    .catch(next);
};

module.exports.getRoles = (req, res, next) => {
  const { roleId } = req.body;

  Roles.findOne({ roleId })
    .then((role) => {
      res.status(SUCCESS_CODE).send({ data: role });
    })
    .catch(next);
};

module.exports.createRoles = (req, res, next) => {
  const { value } = req.body;

  Roles.create({ value })
    .then((role) => {
      res.status(CREATE_CODE).send({ data: role });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteRoles = (req, res, next) => {
  const { roleId } = req.body;

  Roles.findOne({ roleId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((role) => {
      Roles.deleteOne(role)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateRoles = (req, res, next) => {
  const { roleId } = req.body;

  Roles.findByIdAndUpdate(roleId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datarole) => {
      res.status(SUCCESS_CODE).send({ data: datarole });
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


