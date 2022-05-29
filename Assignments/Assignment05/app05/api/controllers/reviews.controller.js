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

  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: {},
      };
      if (err) {
        console.log("Error finding all reviews for Game", game);
        response.status = 500;
        response.message = err;
      } else if (!game || game.reviews.length === 0) {
        console.log("Reviews not found for Game", game);
        response.status = 404;
        response.message = { message: "Reviews not found" };
      } else {
        response.message = game.reviews;
      }

      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: {},
      };
      if (err) {
        console.log("Error finding review for Game", game);
        response.status = 500;
        response.message = err;
      } else if (!game || !game.reviews.id(reviewId)) {
        console.log("Review not found for Game", game);
        response.status = 404;
        response.message = { message: "Review not found" };
      } else {
        response.message = game.reviews.id(reviewId);
      }

      res.status(response.status).json(response.message);
    });
};

module.exports = {
  getAll,
  getOne,
};
