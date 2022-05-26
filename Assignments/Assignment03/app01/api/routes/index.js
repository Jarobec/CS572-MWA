const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAll);
router.route("/games/:gameIndex").get(gamesController.getOne);

module.exports = router;
