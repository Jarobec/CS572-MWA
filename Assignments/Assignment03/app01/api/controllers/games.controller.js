const gamesData = require("../data/games.json");

const getAll = function (req, res) {
  let count = process.env.DEFAULT_GAMES_COUNT;
  let offset = process.env.DEFAULT_GAMES_OFFSET;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }

  const pageGames = gamesData.slice(offset, offset + count);
  res.status(200).json(pageGames);
};

const getOne = function (req, res) {
  const index = req.params.gameIndex;
  res.status(200).json(gamesData[index]);
};

module.exports = {
  getAll,
  getOne,
};
