const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.DB_USER_MODEL);

const response = {
  status: 200,
  message: [],
};

const _clearResponse = function () {
  response.status = 200;
  response.message = [];
};

const _checkObjectIDIsValid = function (id) {
  if (!mongoose.isValidObjectId(id)) {
    _validationError({ message: "Invalid User ID" });
    return false;
  }

  return true;
};

const _sendResponse = function (res) {
  res.status(response.status).json(response.message);
  _clearResponse();
};

const _serverError = function (err) {
  response.status = 500;
  response.message = err;
};

const _validationError = function (err) {
  response.status = 400;
  response.message = err;
};

const _notFoundError = function (err) {
  response.status = 404;
  response.message = err;
};

const _successGetAddUpdateDelete = function (status, game) {
  response.status = status;
  response.message = game;
};

const login = function (req, res) {
  if (req.body && req.body.username && req.body.password) {
    User.findOne({ username: req.body.username })
      .exec()
      .then((user) => {
        if (!user) {
          _notFoundError({ message: "Unauthorized" });
        } else {
          // compare => token =>
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
              { name: user.name },
              process.env.JWT_PASSWORD,
              { expiresIn: 3600 }
            );
            _successGetAddUpdateDelete(200, { success: true, token: token });
          } else {
            _notFoundError({ message: "Unauthorized" }); // 401
          }
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));

    // bcrypt.genSalt(numberOfRounds, function (err, saltValue) {
    //   if (err) {
    //     _serverError(err);
    //     _sendResponse(res);
    //   } else {
    //     bcrypt.hash(req.body.password, saltValue, function (err, hashPassword) {
    //       if (err) {
    //         _serverError(err);
    //         _sendResponse(res);
    //       } else {
    //         const newUser = {
    //           name: req.body.name,
    //           username: req.body.username,
    //           password: hashPassword,
    //         };

    //         User.create(newUser)
    //           .then((user) => _successGetAddUpdateDelete(200, user))
    //           .catch((err) => _serverError(err))
    //           .finally(() => _sendResponse(res));
    //       }
    //     });
    //   }
    // });
  } else {
    _validationError({ message: "Must provide username and password" });
    _sendResponse(res);
  }
};

const addOne = function (req, res) {
  if (req.body && req.body.username && req.body.password) {
    const numberOfRounds = 10;
    bcrypt.genSalt(numberOfRounds, function (err, saltValue) {
      if (err) {
        _serverError(err);
        _sendResponse(res);
      } else {
        bcrypt.hash(req.body.password, saltValue, function (err, hashPassword) {
          if (err) {
            _serverError(err);
            _sendResponse(res);
          } else {
            const newUser = {
              name: req.body.name,
              username: req.body.username,
              password: hashPassword,
            };

            User.create(newUser)
              .then((user) => _successGetAddUpdateDelete(201, user))
              .catch((err) => _serverError(err))
              .finally(() => _sendResponse(res));
          }
        });
      }
    });
  } else {
    _validationError({ message: "Must provide username and password" });
    _sendResponse(res);
  }
};

module.exports = {
  login,
  addOne,
};
