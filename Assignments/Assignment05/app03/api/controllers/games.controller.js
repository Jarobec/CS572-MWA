const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAME_MODEL);

const getAll = function (req, res) {
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

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      const response = { status: 200, message: games };
      if (err) {
        console.log("Error finding all games");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = { status: 200, message: game };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not found");
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
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
  Game.create(newGame, function (err, game) {
    const response = { status: 201, message: game };
    if (err) {
      console.log("Error creating game");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

const _updateOne = function (req, res, updateGameCallback) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = { status: 204, message: game };
    if (err) {
      console.log("Error updating game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game ID not found", gameId);
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      updateGameCallback(req, res, game, response);
    }
  });
};

const fullUpdateOne = function (req, res) {
  gameUpdate = function (req, res, game, response) {
    game.title = req.body.title;
    game.year = req.body.year;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.minPlayers = req.body.minPlayers;
    game.maxPlayers = req.body.maxPlayers;
    game.minAge = req.body.minAge;
    game.designers = req.body.designers;
    if (req.body.name) {
      console.log("Name passed");
      game.publisher = { name: req.body.name };
    } else {
      console.log("No Name passed");
      game.publisher = { name: "NoName" };
    }
    game.reviews = [];
    game.save(function (err, updatedGame) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, gameUpdate);
};

const partialUpdateOne = function (req, res) {
  gameUpdate = function (req, res, game, response) {
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
    game.save(function (err, updatedGame) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, gameUpdate);
};

const deleteOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = { status: 204, message: deletedGame };
    if (err) {
      console.log("Error deleting game");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      console.log("Game ID not found", gameId);
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
