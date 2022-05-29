const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAll);
router.route("/games/:gameId").get(gamesController.getOne);

module.exports = router;
