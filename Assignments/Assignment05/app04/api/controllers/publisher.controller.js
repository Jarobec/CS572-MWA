const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAME_MODEL);

const getOne = function (req, res) {
  let count = parseInt(
    process.env.DEFAULT_FIND_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  let offset = parseInt(
    process.env.DEFAULT_FIND_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );
  const maxCount = parseInt(
    process.env.DEFAULT_MAX_FIND_LIMIT,
    process.env.INTEGER_CONVERSION_BASE
  );

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }
  if (isNaN(count) || isNaN(offset)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count should be numbers" });
    return;
  }
  if (count > maxCount) {
    res.status(400).json({ message: "Cannot exceed count of " + maxCount });
    return;
  }

  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: {},
      };
      if (err) {
        console.log("Error finding publisher for Game", game);
        response.status = 500;
        response.message = err;
      } else if (!game || !game.publisher) {
        console.log("Publisher not found for Game", game);
        response.status = 404;
        response.message = { message: "Publisher not found" };
      } else {
        response.message = game.publisher;
      }

      res.status(response.status).json(response.message);
    });
};

const addOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = { status: 200, message: game };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game ID not found", gameId);
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (game) {
        _addPublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;

  game.save(function (err, updatedGame) {
    const response = { status: 200, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
  });
};

const deleteOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = { status: 200, message: game };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game ID not found", gameId);
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (game) {
        _deletePublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _deletePublisher = function (req, res, game) {
  game.publisher = { name: "NoName" };
  game.save(function (err, updatedGame) {
    const response = { status: 204, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getOne,
  addOne,
  deleteOne,
};
