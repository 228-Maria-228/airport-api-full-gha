const Notifications = require('../models/notifications');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllNotifications = (req, res, next) => {
  Notifications.find({ })
    .then((notification) => {
      res.status(SUCCESS_CODE).send({ data: notification });
    })
    .catch(next);
};

module.exports.getNotifications = (req, res, next) => {
  const { notificationId } = req.body;

  Notifications.findOne({ notificationId })
    .then((notification) => {
      res.status(SUCCESS_CODE).send({ data: notification });
    })
    .catch(next);
};

module.exports.createNotifications = (req, res, next) => {
  const { value } = req.body;

  Notifications.create({ value })
    .then((notification) => {
      res.status(CREATE_CODE).send({ data: notification });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteNotifications = (req, res, next) => {
  const { notificationId } = req.body;

  Notifications.findOne({ notificationId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((notification) => {
      Notifications.deleteOne(notification)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateNotifications = (req, res, next) => {
  const { notificationId } = req.body;

  Notifications.findByIdAndUpdate(notificationId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((datanotification) => {
      res.status(SUCCESS_CODE).send({ data: datanotification });
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


