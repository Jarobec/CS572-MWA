const gamesData = require("../data/games.json");

const getAll = function (req, res) {
  console.log("Get all games");
  let count = 5;
  let offset = 0;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  const pageGames = gamesData.slice(offset, offset + count);
  res.status(200).json(pageGames);
};

const getOne = function (req, res) {
  console.log("Get one game");
  const index = req.params.gameIndex;
  res.status(200).json(gamesData[index]);
};

module.exports = {
  getAll,
  getOne,
};
