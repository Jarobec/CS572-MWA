const gamesData = require("../data/games.json");
const dbConnection = require("../data/db.connection");

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
  //const pageGames = gamesData.slice(offset, offset + count);
  const db = dbConnection.get();
  console.log("db is", db);
  const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
  gamesCollection.find().toArray(function (err, games) {
    console.log("Games found");
    res.status(200).json(games);
  });
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
