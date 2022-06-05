const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAME_MODEL);

// "title": "Kawai",
// "year": 2021,
// "rate": 4,
// "price": 24.33,
// "minPlayers": 3,
// "maxPlayers": 3,
// "minAge": 21,
// "designers": "Mary, Josh, Toka"

let count = parseInt(
  process.env.DEFAULT_FIND_COUNT,
  process.env.INTEGER_CONVERSION_BASE
);
let offset = parseInt(
  process.env.DEFAULT_FIND_OFFSET,
  process.env.INTEGER_CONVERSION_BASE
);
const maxCount = parseInt(
  process.env.DEFAULT_FIND_COUNT_MAX,
  process.env.INTEGER_CONVERSION_BASE
);

const response = {
  status: 200,
  message: [],
};

const _clearResponse = function () {
  response.status = 200;
  response.message = [];
};

const _clearCountAndOffset = function () {
  count = parseInt(
    process.env.DEFAULT_FIND_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  offset = parseInt(
    process.env.DEFAULT_FIND_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );
};

const _checkCountAndOffset = function (req) {
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }
  if (isNaN(count) || isNaN(offset)) {
    _validationError({
      message: "QueryString: offset and count should be numbers",
    });
    return false;
  } else {
    if (count > maxCount) {
      _validationError({
        message: "Cannot exceed count of " + maxCount,
      });
      return false;
    }
  }

  return true;
};

const _checkObjectIDIsValid = function (id) {
  if (!mongoose.isValidObjectId(id)) {
    _validationError({ message: "Invalid Game ID" });
    return false;
  }

  return true;
};

const _sendResponse = function (res) {
  res.status(response.status).json(response.message);
  _clearResponse();
  _clearCountAndOffset();
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

const _successTotalPageSize = function (status, countDocuments) {
  const games = response.message;
  const totalPage = Math.ceil(countDocuments / count);

  response.status = status;
  response.message = { games: games, totalPage: totalPage };
};

const getAll = function (req, res) {
  if (!_checkCountAndOffset(req)) {
    _sendResponse(res);
  } else {
    let query = {};

    if (req.query && req.query.search) {
      query = {
        title: { $regex: ".*" + req.query.search + ".*", $options: "i" },
      };
    }

    Game.find(query)
      .skip(offset)
      .limit(count)
      .exec()
      .then((games) => _successGetAddUpdateDelete(200, games))
      .then(() => _getTotalPageSize(query))
      .then((countDocuments) => _successTotalPageSize(200, countDocuments))
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const _getTotalPageSize = function (query) {
  return Game.countDocuments(query);
};

const getOne = function (req, res) {
  const gameId = req.params.gameId;
  if (!_checkObjectIDIsValid(gameId)) {
    _sendResponse(res);
  } else {
    Game.findById(gameId)
      .exec()
      .then((game) => {
        if (!game) {
          _notFoundError({ message: "Game ID not found" });
        } else {
          _successGetAddUpdateDelete(200, game);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const addOne = function (req, res) {
  const newGame = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    price: req.body.price,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    publisher: { name: "NoName" },
    reviews: [],
    minAge: req.body.minAge,
    designers: [req.body.designers],
  };

  Game.create(newGame)
    .then((game) => _successGetAddUpdateDelete(201, game))
    .catch((err) => _serverError(err))
    .finally(() => _sendResponse(res));
};

const _updateOne = function (req, res, updateGameCallback) {
  const gameId = req.params.gameId;

  if (!_checkObjectIDIsValid(gameId)) {
    _sendResponse(res);
  } else {
    Game.findById(gameId)
      .exec()
      .then((game) => {
        if (!game) {
          _notFoundError({ message: "Game ID not found" });
          return;
        } else {
          return updateGameCallback(req, game);
        }
      })
      .then((updatedGame) => {
        if (updatedGame) {
          _successGetAddUpdateDelete(204, updatedGame);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const _fullGameUpdateOne = function (req, game) {
  game.title = req.body.title;
  game.year = req.body.year;
  game.rate = req.body.rate;
  game.price = req.body.price;
  game.minPlayers = req.body.minPlayers;
  game.maxPlayers = req.body.maxPlayers;
  game.minAge = req.body.minAge;
  game.designers = req.body.designers;
  if (req.body.name) {
    game.publisher = { name: req.body.name };
  } else {
    game.publisher = { name: "NoName" };
  }
  game.reviews = [];

  return game.save();
};

const _partialGameUpdateOne = function (req, game) {
  if (req.body.title) {
    game.title = req.body.title;
  }
  if (req.body.year) {
    game.year = req.body.year;
  }
  if (req.body.rate) {
    game.rate = req.body.rate;
  }
  if (req.body.price) {
    game.price = req.body.price;
  }
  if (req.body.minPlayers) {
    game.minPlayers = req.body.minPlayers;
  }
  if (req.body.maxPlayers) {
    game.maxPlayers = req.body.maxPlayers;
  }
  if (req.body.minAge) {
    game.minAge = req.body.minAge;
  }
  if (req.body.designers) {
    game.designers = req.body.designers;
  }
  if (req.body.publisher) {
    game.publisher = req.body.publisher;
  }
  if (req.body.reviews) {
    game.reviews = req.body.reviews;
  }
  return game.save();
};

const fullUpdateOne = function (req, res) {
  _updateOne(req, res, _fullGameUpdateOne);
};

const partialUpdateOne = function (req, res) {
  _updateOne(req, res, _partialGameUpdateOne);
};

const deleteOne = function (req, res) {
  const gameId = req.params.gameId;

  if (!_checkObjectIDIsValid(gameId)) {
    _sendResponse(res);
  } else {
    Game.findByIdAndDelete(gameId)
      .exec()
      .then((game) => {
        if (!game) {
          _notFoundError({ message: "Game ID not found" });
        } else {
          _successGetAddUpdateDelete(204, game);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
