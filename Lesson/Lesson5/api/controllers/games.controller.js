const dbConnection = require("../data/db.connection");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.DB_GAME_MODEL);

const getAll = function (req, res) {
  let count = parseInt(
    process.env.DEFAULT_GAMES_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  let offset = parseInt(
    process.env.DEFAULT_GAMES_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );

  if (req.query && req.query.count) {
    let queryCount = parseInt(req.query.count);
    if (queryCount > 10)
      count = parseInt(
        process.env.DEFAULT_GAMES_COUNT_MAX,
        process.env.INTEGER_CONVERSION_BASE
      );
    else count = queryCount;
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }

  // const db = dbConnection.get();
  // const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
  // gamesCollection
  //   .find()
  //   .skip(offset)
  //   .limit(count)
  //   .toArray(function (err, games) {
  //     console.log(games.length, "games found");
  //     res.status(200).json(games);
  //   });
  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Games found");
      res.status(200).json(games);
    });
};

const getOne = function (req, res, next) {
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    if (err) {
      next({ statusCode: 400, message: err });
    } else if (game == null) {
      next({ statusCode: 404, message: `Game with id: ${gameId} not found` });
    } else {
      console.log("Found game");
      res.status(200).json(game);
    }
  });
};

const addOne = function (req, res) {
  const db = dbConnection.get();
  const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
  let newGame = {};

  if (
    req.body &&
    req.body.title &&
    req.body.price &&
    req.body.minPlayers &&
    !isNaN(parseInt(req.body.minAge))
  ) {
    const minPlayers = parseInt(req.body.minPlayers);
    const minAge = parseInt(req.body.minAge);

    let error = {};
    if (minPlayers < 1 || minPlayers > 11) {
      console.log(
        "The minimum number of players is between 1 and 11",
        minPlayers
      );
      error = {
        minPlayers: "The minimum number of players is between 1 and 11",
      };
    }

    if (minAge < 6 || minAge > 99) {
      console.log("The minimum age is between 6 and 99", minAge);
      error = { ...error, minAge: "The minimum age is between 6 and 99" };
    }

    if (Object.keys(error).length !== 0) {
      res.status(400).json({ error: error });
    } else {
      newGame.title = req.body.title;
      newGame.price = parseFloat(req.body.price);
      newGame.minPlayers = minPlayers;
      newGame.minAge = minAge;

      gamesCollection.insertOne(newGame, function (err, response) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          console.log(response);
          res.status(201).json(response);
        }
      });
    }
  } else {
    console.log("Data missing from POST body");
    res.status(400).json({ error: "Required data missing from POST" });
  }
};

const deleteOne = function (req, res) {
  const gameId = req.params.gameId;

  const db = dbConnection.get();
  const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);

  gamesCollection.deleteOne(
    { _id: ObjectId(gameId) },
    function (err, response) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log(response);
        res.status(404).json(response);
      }
    }
  );
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
};
