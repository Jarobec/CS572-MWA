const express = require("express");
const gamesController = require("../controllers/games.controller");
const authenticationController = require("../controllers/authentication.controller");

const router = express.Router();

router
  .route("")
  .get(gamesController.getAll)
  .post(authenticationController.authenticate, gamesController.addOne);
router
  .route("/:gameId")
  .get(gamesController.getOne)
  .put(gamesController.fullUpdateOne)
  .patch(gamesController.partialUpdateOne)
  .delete(gamesController.deleteOne);

module.exports = router;
