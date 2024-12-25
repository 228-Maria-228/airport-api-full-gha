const Employees = require('../models/employees');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllEmployees = (req, res, next) => {
  Employees.find({ })
    .then((employee) => {
      res.status(SUCCESS_CODE).send({ data: employee });
    })
    .catch(next);
};

module.exports.getEmployees = (req, res, next) => {
  const { employeeId } = req.body;

  Employees.findOne({ employeeId })
    .then((employee) => {
      res.status(SUCCESS_CODE).send({ data: employee });
    })
    .catch(next);
};

module.exports.createEmployees = (req, res, next) => {
  const { value } = req.body;

  Employees.create({ value })
    .then((employee) => {
      res.status(CREATE_CODE).send({ data: employee });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteEmployees = (req, res, next) => {
  const { employeeId } = req.body;

  Employees.findOne({ employeeId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((employee) => {
      Employees.deleteOne(employee)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateEmployees = (req, res, next) => {
  const { employeeId } = req.body;

  Employees.findByIdAndUpdate(employeeId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataemployee) => {
      res.status(SUCCESS_CODE).send({ data: dataemployee });
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


