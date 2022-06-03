const express = require("express");
const path = require("path");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAll).post(gamesController.addOne);
router
  .route("/games/:gameId")
  .get(gamesController.getOne)
  .delete(gamesController.deleteOne);

router.route("/file").get(function (req, res) {
  console.log("File received");
  res.status(200).sendFile(path.join(__dirname, "index.js"));
});

module.exports = router;
