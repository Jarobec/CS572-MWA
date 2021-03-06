const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAll).post(gamesController.getOne);
router
  .route("/games/:gameId")
  .get(gamesController.getOne)
  .put(gamesController.fullUpdateOne)
  .patch(gamesController.partialUpdateOne)
  .delete(gamesController.deleteOne);

module.exports = router;
